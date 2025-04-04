import styled, { css, DefaultTheme } from 'styled-components';
import { motion } from 'framer-motion';

export const StyledModalContent = styled.div`
  padding: ${(props) => props.theme.spacing.xl};
  background: ${(props) => props.theme.colors.surface}E0;
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid ${(props) => props.theme.colors.border}40;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(
      90deg,
      ${(props) => props.theme.colors.primary}80,
      ${(props) => props.theme.colors.secondary}80
    );
  }
`;

export const StyledModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  padding-top: ${(props) => props.theme.spacing.sm};
`;

export const StyledAvatarContainer = styled.div`
  position: relative;
`;

export const StyledAvatar = styled.div`
  width: 90px;
  height: 90px;
  border-radius: ${(props) => props.theme.borderRadius.full};
  background-color: ${(props) => props.theme.colors.background};
  flex-shrink: 0;
  transition: all 0.2s ease;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const StyledPatientInfo = styled.div`
  flex: 1;
`;

export const StyledName = styled.h2`
  margin: 0;
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 600;
  font-size: 1.6rem;
  letter-spacing: -0.01em;
`;

export const StyledMetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
  margin-top: ${(props) => props.theme.spacing.sm};
`;

export const StyledMetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text.secondary};

  a {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${(props) => props.theme.colors.primary};
      text-decoration: underline;
    }
  }

  svg {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const StyledMetaIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: ${(props) => props.theme.colors.surface}CC;
  border-radius: ${(props) => props.theme.borderRadius.full};
  border: 1px solid ${(props) => props.theme.colors.primary}30;
  color: ${(props) => props.theme.colors.primary};
  backdrop-filter: blur(4px);
`;

export const StyledDescription = styled.div`
  margin-top: ${(props) => props.theme.spacing.lg};
  color: ${(props) => props.theme.colors.text.secondary};
  background: ${(props) => props.theme.colors.background}50;
  padding: ${(props) => props.theme.spacing.lg};
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.colors.border}30;
  font-size: 1rem;
`;

export const StyledTitle = styled.h2`
  margin: 0;
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: 600;
  font-size: 1.6rem;
  letter-spacing: -0.01em;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

export const StyledButtonContainer = styled.div`
  position: absolute;
  top: ${(props) => props.theme.spacing.md};
  right: ${(props) => props.theme.spacing.md};
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  z-index: 10;
`;

export const StyledActionButton = styled(motion.button)`
  background-color: ${(props) => props.theme.colors.background}90;
  backdrop-filter: blur(5px);
  border: 1px solid ${(props) => props.theme.colors.border}60;
  border-radius: ${(props) => props.theme.borderRadius.full};
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${(props) => props.theme.colors.text.secondary};

  &:hover {
    background-color: ${(props) => props.theme.colors.primary}20;
    color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary}40;
  }
`;

export const StyledCloseButton = styled(StyledActionButton)``;
export const StyledEditButton = styled(StyledActionButton)``;

export const StyledFormGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: ${(props) => props.theme.spacing.xs};
  font-weight: 500;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.95rem;
`;

export const inputStyles = (props: { theme: DefaultTheme }) => css`
  width: 100%;
  background-color: ${props.theme.colors.background}80;
  border: 1px solid ${props.theme.colors.border}60;
  border-radius: ${props.theme.borderRadius.md};
  padding: ${props.theme.spacing.md};
  font-size: 0.95rem;
  color: ${props.theme.colors.text.primary};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props.theme.colors.primary}70;
    box-shadow: 0 0 0 2px ${props.theme.colors.primary}20;
  }
`;

export const StyledInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  background-color: ${(props) => props.theme.colors.background}80;
  border: 1px solid
    ${(props) =>
      props.$hasError ? props.theme.colors.error : props.theme.colors.border}60;
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: ${(props) => props.theme.spacing.md};
  font-size: 0.95rem;
  color: ${(props) => props.theme.colors.text.primary};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.$hasError
        ? props.theme.colors.error
        : props.theme.colors.primary}70;
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.$hasError
          ? `${props.theme.colors.error}20`
          : `${props.theme.colors.primary}20`};
  }
`;

export const StyledTextArea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  min-height: 100px;
  resize: none;
  background-color: ${(props) => props.theme.colors.background}80;
  border: 1px solid
    ${(props) =>
      props.$hasError ? props.theme.colors.error : props.theme.colors.border}60;
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: ${(props) => props.theme.spacing.md};
  font-size: 0.95rem;
  color: ${(props) => props.theme.colors.text.primary};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.$hasError
        ? props.theme.colors.error
        : props.theme.colors.primary}70;
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.$hasError
          ? `${props.theme.colors.error}20`
          : `${props.theme.colors.primary}20`};
  }
`;

export const StyledErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.error};
  font-size: 0.8rem;
  margin-top: 0.25rem;
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const StyledActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${(props) => props.theme.spacing.md};
  margin-top: ${(props) => props.theme.spacing.lg};
`;

export const StyledButton = styled(motion.button)`
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const StyledCancelButton = styled(StyledButton)`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.primary};
  border: 1px solid ${(props) => props.theme.colors.border};

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.colors.background}CC;
    transform: translateY(-1px);
  }
`;

export const StyledSaveButton = styled(StyledButton)`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.colors.secondary};
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const StyledButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.xs};
`;

export const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(10px)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: 'none',
    borderRadius: '20px',
    maxWidth: '90%',
    width: '560px',
    maxHeight: '90vh',
    overflow: 'auto',
    background: 'transparent',
  },
};
