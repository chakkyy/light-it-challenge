import React, { useState, useRef, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import {
  SortDirection,
  SortMethod,
  usePatientFiltersContext,
} from '@/contexts/PatientFiltersContext';
import {
  StyledFiltersContainer,
  StyledSortControls,
  StyledResetButton,
} from './styles/FilterStyles';
import SearchField, { SEARCH_TEXTS } from '../atoms/SearchField';
import SortSelector from './SortSelector';
import SortDirectionControl from './SortDirectionControl';

const TEXTS = {
  ...SEARCH_TEXTS,
  RESET: 'Reset',
  RESET_LABEL: 'Reset filters',
};

const Filters: React.FC = () => {
  const {
    formValues,
    sortOptions,
    toggleSortDirection,
    resetFilters,
    register,
    setIsFiltering,
    setValue,
  } = usePatientFiltersContext();

  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsSortDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsSortDropdownOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentSortOption = sortOptions.find(
    (option) => option.id === formValues.sortBy,
  );

  const handleSortOptionSelect = (id: string) => {
    setValue('sortBy', id);
    setIsSortDropdownOpen(false);
  };

  const handleClearSearch = () => {
    setValue('searchQuery', '');
    setIsFiltering(false);

    const searchInput = document.querySelector(
      `input[aria-label="${TEXTS.SEARCH_LABEL}"]`,
    ) as HTMLInputElement;
    if (searchInput) searchInput.focus();
  };

  const areFiltersActive =
    formValues.searchQuery !== '' ||
    formValues.sortBy !== SortMethod.NAME ||
    formValues.sortDirection !== SortDirection.ASC;

  return (
    <StyledFiltersContainer>
      <SearchField
        value={formValues.searchQuery}
        register={register}
        onClear={handleClearSearch}
      />

      <StyledSortControls>
        <SortSelector
          currentOption={currentSortOption}
          options={sortOptions}
          isOpen={isSortDropdownOpen}
          setIsOpen={setIsSortDropdownOpen}
          onSelect={handleSortOptionSelect}
          currentSortBy={formValues.sortBy}
          buttonRef={buttonRef}
          dropdownRef={dropdownRef}
        />

        <SortDirectionControl
          sortDirection={formValues.sortDirection}
          toggleSortDirection={toggleSortDirection}
        />
      </StyledSortControls>

      {areFiltersActive && (
        <StyledResetButton
          onClick={resetFilters}
          whileTap={{ scale: 0.97 }}
          aria-label={TEXTS.RESET_LABEL}
        >
          <FaTimes size={14} />
          <span>{TEXTS.RESET}</span>
        </StyledResetButton>
      )}
    </StyledFiltersContainer>
  );
};

export default Filters;
