import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: transparent;
  color: ${(props) => props.theme.colors.error};
  border: 1px solid ${(props) => props.theme.colors.error}40;
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: 8px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;

  &:hover {
    background-color: ${(props) => props.theme.colors.error}10;
    border-color: ${(props) => props.theme.colors.error};
  }

  ${(props) =>
    props.theme.isDark &&
    css`
      background-color: transparent;
      border-color: ${props.theme.colors.error}30;

      &:hover {
        background-color: ${props.theme.colors.error}20;
      }
    `}
`;

export const ConfirmModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1500;
`;

export const ConfirmModalContent = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: ${(props) => props.theme.spacing.lg};
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  position: relative;
`;

export const ConfirmModalTitle = styled.h3`
  margin-top: 0;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1.25rem;
  font-weight: 600;
`;

export const ConfirmModalText = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.95rem;
  line-height: 1.5;
  margin-top: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

export const ConfirmModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: ${(props) => props.theme.spacing.lg};
`;

export const CancelButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: 8px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text.secondary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.background};
    border-color: ${(props) => props.theme.colors.border};
    transform: translateY(-1px);
  }
`;

export const ConfirmButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: ${(props) => props.theme.colors.error};
  color: white;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: 8px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.error}cc;
    transform: translateY(-1px);
  }
`;
