import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import {
  FaExclamationCircle,
  FaExclamationTriangle,
  FaSync,
  FaHome,
  FaRedo,
} from 'react-icons/fa';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const StyledErrorContainer = styled.div<{ $minHeight?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.xl};
  background-color: ${(props) => props.theme.colors.background};
  min-height: ${(props) => props.$minHeight || '50vh'};
  text-align: center;
  animation: ${fadeIn} 0.4s ease-out;
`;

export const StyledErrorIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.error}20;
  color: ${(props) => props.theme.colors.error};
  font-size: 2rem;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

export const StyledErrorTitle = styled.h2`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1.8rem;
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

export const StyledErrorMessage = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 1rem;
  max-width: 600px;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

export const StyledButtonGroup = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  margin-top: ${(props) => props.theme.spacing.lg};
`;

export const StyledButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  font-size: 0.95rem;
`;

export const StyledPrimaryButton = styled(StyledButton)`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

export const StyledSecondaryButton = styled(StyledButton)`
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.text.primary};

  &:hover {
    background-color: ${(props) => props.theme.colors.background}CC;
    border-color: ${(props) => props.theme.colors.primary}40;
  }
`;

export const StyledErrorDetails = styled.div`
  max-width: 800px;
  margin-top: ${(props) => props.theme.spacing.lg};
  text-align: left;
  padding: ${(props) => props.theme.spacing.md};
  background-color: ${(props) => props.theme.colors.background}80;
  border: 1px solid ${(props) => props.theme.colors.border}60;
  border-radius: ${(props) => props.theme.borderRadius.md};
  overflow: auto;
  max-height: 200px;
  font-family: monospace;
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.text.secondary};
`;

export { FaExclamationCircle, FaExclamationTriangle, FaSync, FaHome, FaRedo };
