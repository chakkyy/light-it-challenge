import React from 'react';
import { FaSort } from 'react-icons/fa';
import { SortOption } from '@/contexts/PatientFiltersContext';
import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { buttonStyles } from './styles/FilterStyles';

const StyledSortButton = styled(motion.button)`
  ${buttonStyles}
  position: relative;
  justify-content: space-between;
  min-width: 140px;
  padding-right: ${(props) => props.theme.spacing.sm};
`;

const StyledSortOption = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${(props) => props.theme.spacing.md};
  text-align: left;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.border}30;
  color: ${(props) =>
    props.$isActive
      ? props.theme.colors.primary
      : props.theme.colors.text.primary};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.15s ease;

  &:last-child {
    border-bottom: none;
  }

  ${(props) =>
    props.$isActive &&
    css`
      background-color: ${props.theme.colors.primary}10;
      font-weight: 500;
    `}

  &:hover {
    background-color: ${(props) => props.theme.colors.primary}10;
  }

  &:focus {
    outline: none;
    background-color: ${(props) => props.theme.colors.primary}15;
  }
`;

const StyledActiveIndicator = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary};
`;

const StyledSortDropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border}60;
  border-radius: ${(props) => props.theme.borderRadius.md};
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 190px;
  max-height: ${(props) => (props.$isOpen ? '300px' : '0')};
  overflow: hidden;
  opacity: ${(props) => (props.$isOpen ? '1' : '0')};
  transform: ${(props) =>
    props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.2s ease;
  z-index: 101;
  visibility: ${(props) => (props.$isOpen ? 'visible' : 'hidden')};
`;

export const SORT_TEXTS = {
  SORT_DEFAULT: 'Sort',
};

export interface SortSelectorProps {
  currentOption: SortOption | undefined;
  options: SortOption[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSelect: (id: string) => void;
  currentSortBy: string;
  buttonRef: React.RefObject<HTMLButtonElement>;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

const SortSelector: React.FC<SortSelectorProps> = ({
  currentOption,
  options,
  isOpen,
  setIsOpen,
  onSelect,
  currentSortBy,
  buttonRef,
  dropdownRef,
}) => (
  <div style={{ position: 'relative' }}>
    <StyledSortButton
      whileTap={{ scale: 0.97 }}
      onClick={() => setIsOpen(!isOpen)}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      ref={buttonRef}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FaSort aria-hidden="true" size={14} />
        <span>{currentOption?.label || SORT_TEXTS.SORT_DEFAULT}</span>
      </div>
      <span style={{ opacity: 0.4, fontSize: '0.8rem' }}>▼</span>
    </StyledSortButton>

    <StyledSortDropdown $isOpen={isOpen} ref={dropdownRef}>
      {options.map((option) => (
        <StyledSortOption
          key={option.id}
          $isActive={currentSortBy === option.id}
          onClick={() => onSelect(option.id)}
          role="option"
          aria-selected={currentSortBy === option.id}
        >
          {option.label}
          {currentSortBy === option.id && <StyledActiveIndicator />}
        </StyledSortOption>
      ))}
    </StyledSortDropdown>
  </div>
);

export default SortSelector;
