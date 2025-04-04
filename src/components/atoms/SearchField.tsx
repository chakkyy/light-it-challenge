import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { UseFormRegister } from 'react-hook-form';
import { FilterFormValues } from '@/contexts/PatientFiltersContext';
import {
  StyledSearchContainer,
  StyledSearchIconWrapper,
  StyledSearchInput,
  StyledClearButton,
} from '../molecules/styles/FilterStyles';

export const SEARCH_TEXTS = {
  SEARCH_PLACEHOLDER: 'Search patients...',
  SEARCH_LABEL: 'Search patients',
  CLEAR_LABEL: 'Clear search',
};

export interface SearchFieldProps {
  value: string;
  register: UseFormRegister<FilterFormValues>;
  onClear: () => void;
  placeholder?: string;
  ariaLabel?: string;
}

const SearchField: React.FC<SearchFieldProps> = ({
  value,
  register,
  onClear,
  placeholder = SEARCH_TEXTS.SEARCH_PLACEHOLDER,
  ariaLabel = SEARCH_TEXTS.SEARCH_LABEL,
}) => (
  <StyledSearchContainer>
    <StyledSearchIconWrapper>
      <FaSearch aria-hidden="true" size={16} />
    </StyledSearchIconWrapper>
    <StyledSearchInput
      placeholder={placeholder}
      {...register('searchQuery')}
      aria-label={ariaLabel}
    />
    {value && (
      <StyledClearButton
        onClick={onClear}
        aria-label={SEARCH_TEXTS.CLEAR_LABEL}
      >
        <FaTimes size={14} />
      </StyledClearButton>
    )}
  </StyledSearchContainer>
);

export default SearchField;
