import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const StyledFiltersContainer = styled.div`
  background-color: ${(props) => props.theme.colors.surface}99;
  backdrop-filter: blur(12px);
  padding: ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.md};
  transition: all 0.2s ease;
  position: relative;
  z-index: 100;

  &:hover {
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.06);
  }
`;

export const StyledSearchContainer = styled.div`
  flex: 1;
  min-width: 200px;
  position: relative;
  display: flex;
  align-items: center;
`;

export const StyledSearchIconWrapper = styled.span`
  position: absolute;
  left: ${(props) => props.theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.colors.text.light};
  display: flex;
  align-items: center;
  pointer-events: none;
`;

export const StyledClearButton = styled.button`
  position: absolute;
  right: ${(props) => props.theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: ${(props) => props.theme.colors.text.light};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 24px;
  height: 24px;
  border-radius: ${(props) => props.theme.borderRadius.full};
  transition: all 0.15s ease;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.primary}10;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary}40;
  }
`;

export const StyledSearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  background-color: ${(props) => props.theme.colors.background}80;
  border: 1px solid ${(props) => props.theme.colors.border}60;
  border-radius: ${(props) => props.theme.borderRadius.full};
  padding: ${(props) => props.theme.spacing.md};
  padding-left: calc(${(props) => props.theme.spacing.md} * 2 + 16px);
  padding-right: ${(props) => props.theme.spacing.xl};
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text.primary};
  outline: none;
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);
  height: 46px;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary}70;
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary}20;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.text.light};
    opacity: 0.7;
  }
`;

export const buttonStyles = css`
  height: 46px;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
  background-color: ${(props) => props.theme.colors.background}80;
  border: 1px solid ${(props) => props.theme.colors.border}60;
  border-radius: ${(props) => props.theme.borderRadius.full};
  padding: 0 ${(props) => props.theme.spacing.md};
  font-weight: 500;
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text.secondary};
  transition: all 0.15s ease;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary}15;
    border-color: ${(props) => props.theme.colors.primary}40;
    color: ${(props) => props.theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary}40;
  }
`;

export const StyledSortButton = styled(motion.button)`
  ${buttonStyles}
  position: relative;
  justify-content: space-between;
  min-width: 140px;
  padding-right: ${(props) => props.theme.spacing.sm};
`;

export const StyledActiveIndicator = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary};
`;

export const StyledResetButton = styled(motion.button)`
  ${buttonStyles}
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.error}30;
  color: ${(props) => props.theme.colors.error};

  &:hover {
    background-color: ${(props) => props.theme.colors.error}10;
    border-color: ${(props) => props.theme.colors.error}50;
    color: ${(props) => props.theme.colors.error};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.error}30;
  }
`;

export const StyledSortControls = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.xs};
`;
