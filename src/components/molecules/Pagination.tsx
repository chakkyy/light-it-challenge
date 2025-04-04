import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
`;

const PageButton = styled(motion.button)<{ $isActive?: boolean }>`
  border: 1px solid
    ${(props) =>
      props.$isActive
        ? props.theme.colors.primary
        : props.theme.colors.border}60;
  background-color: ${(props) =>
    props.$isActive
      ? props.theme.colors.primary
      : props.theme.colors.background}90;
  color: ${(props) =>
    props.$isActive
      ? props.theme.colors.surface
      : props.theme.colors.text.secondary};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: ${(props) => (props.$isActive ? 'bold' : 'normal')};
  transition: all 0.2s ease;

  &:not(:disabled):hover {
    border-color: ${(props) => props.theme.colors.primary}40;
    background-color: ${(props) =>
      props.$isActive
        ? props.theme.colors.primary
        : props.theme.colors.primary}10;
    transform: translateY(-1px);
    box-shadow: 0 2px 6px ${(props) => props.theme.colors.primary}15;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageDots = styled.span`
  color: ${(props) => props.theme.colors.text.secondary};
  padding: 0 4px;
`;

const NavigationButton = styled(PageButton)`
  font-weight: bold;
  background-color: transparent;
  border-color: ${(props) => props.theme.colors.border}80;

  &:not(:disabled):hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 4;

    pages.push(
      <PageButton
        key={1}
        onClick={() => onPageChange(1)}
        $isActive={currentPage === 1}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        1
      </PageButton>,
    );

    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(2, endPage - (maxVisiblePages - 1));
    }

    if (startPage > 2) {
      pages.push(<PageDots key="dots-1">...</PageDots>);
    }

    for (let i = startPage; i <= endPage; i += 1) {
      pages.push(
        <PageButton
          key={i}
          onClick={() => onPageChange(i)}
          $isActive={currentPage === i}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {i}
        </PageButton>,
      );
    }

    if (endPage < totalPages - 1) {
      pages.push(<PageDots key="dots-2">...</PageDots>);
    }

    if (totalPages > 1) {
      pages.push(
        <PageButton
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          $isActive={currentPage === totalPages}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {totalPages}
        </PageButton>,
      );
    }

    return pages;
  };

  return (
    <PaginationContainer>
      <NavigationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        &lt;
      </NavigationButton>

      {renderPageNumbers()}

      <NavigationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        &gt;
      </NavigationButton>
    </PaginationContainer>
  );
};

export default Pagination;
