import toast, { Renderable } from 'react-hot-toast';
import styled from 'styled-components';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import theme from '@/styles/theme';

import { getToastDuration, ToastDuration } from './common';

// Styled components
const StyledMessageWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const StyledSubWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const StyledToastMessageLabel = styled.span`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`;

const StyledIconButton = styled.button`
  height: fit-content;
  margin-right: -10px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
`;

const StyledIconWrapper = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Types
export type RenderSuccessToastProps = {
  message: string | JSX.Element;
  icon?: Renderable;
  id?: string;
  closeOnClick?: boolean;
  /** Toast duration in milliseconds. */
  duration?: number | ToastDuration;
};

// Success toast component
const renderSuccessToast = ({
  message,
  icon,
  id,
  closeOnClick = true,
  duration = ToastDuration.MEDIUM,
}: RenderSuccessToastProps) => {
  const handleCloseToast = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnClick) {
      e.stopPropagation();
      toast.dismiss(id);
    }
  };

  const messageComponent = () => (
    <StyledMessageWrapper onClick={handleCloseToast}>
      <StyledSubWrapper>
        <StyledToastMessageLabel>{message}</StyledToastMessageLabel>
      </StyledSubWrapper>
      <StyledIconButton onClick={() => toast.dismiss(id)}>
        <FaTimes color="white" />
      </StyledIconButton>
    </StyledMessageWrapper>
  );

  const toastDuration = duration || getToastDuration(message);

  return toast.success(messageComponent, {
    id,
    style: {
      backgroundColor: theme.colors.success,
      color: 'white',
      width: 'fit-content',
      minWidth: '300px',
      maxWidth: '100%',
      position: 'relative',
      bottom: '70px',
      boxShadow: theme.shadows.md,
      borderRadius: theme.borderRadius.md,
    },
    icon:
      icon !== undefined ? (
        <StyledIconWrapper>{icon}</StyledIconWrapper>
      ) : (
        <StyledIconWrapper>
          <FaCheckCircle />
        </StyledIconWrapper>
      ),
    position: 'bottom-center',
    duration: toastDuration,
  });
};

export default renderSuccessToast;
