import React from 'react';
import { GoSortAsc, GoSortDesc } from 'react-icons/go';
import { SortDirection } from '@/contexts/PatientFiltersContext';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { buttonStyles } from './styles/FilterStyles';

export const StyledSortDirectionButton = styled(motion.button)`
  ${buttonStyles}
  justify-content: center;
  width: 46px;
  padding: 0;

  svg {
    font-size: 1.3rem;
    color: currentColor;
  }
`;

export const DIRECTION_TEXTS = {
  SORT_ASC: 'ascending',
  SORT_DESC: 'descending',
};

export interface SortDirectionControlProps {
  sortDirection: SortDirection;
  toggleSortDirection: () => void;
}

const SortDirectionControl: React.FC<SortDirectionControlProps> = ({
  sortDirection,
  toggleSortDirection,
}) => (
  <StyledSortDirectionButton
    onClick={toggleSortDirection}
    whileTap={{ scale: 0.97 }}
    aria-label={`Sort ${sortDirection === SortDirection.ASC ? DIRECTION_TEXTS.SORT_ASC : DIRECTION_TEXTS.SORT_DESC}`}
    title={`Sort ${sortDirection === SortDirection.ASC ? DIRECTION_TEXTS.SORT_ASC : DIRECTION_TEXTS.SORT_DESC}`}
  >
    {sortDirection === SortDirection.ASC ? (
      <GoSortAsc aria-hidden="true" />
    ) : (
      <GoSortDesc aria-hidden="true" />
    )}
  </StyledSortDirectionButton>
);

export default SortDirectionControl;
