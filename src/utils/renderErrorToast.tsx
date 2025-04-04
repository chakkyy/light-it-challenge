import toast, { Renderable } from 'react-hot-toast';
import styled from 'styled-components';
import { FaExclamationCircle, FaTimes } from 'react-icons/fa';
import { ToastDuration, getToastDuration } from './common';

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

export type RenderErrorToastProps = {
  message: string | JSX.Element;
  icon?: Renderable;
  id?: string;
  closeOnClick?: boolean;
  duration?: number | ToastDuration;
};

const renderErrorToast = ({
  message,
  icon,
  id,
  closeOnClick = true,
  duration = ToastDuration.MEDIUM,
}: RenderErrorToastProps) => {
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

  return toast.error(messageComponent, {
    id,
    style: {
      backgroundColor: 'var(--color-error, #E53935)',
      color: 'white',
      width: 'fit-content',
      minWidth: '300px',
      maxWidth: '100%',
      position: 'relative',
      bottom: '70px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
    },
    icon:
      icon !== undefined ? (
        <StyledIconWrapper>{icon}</StyledIconWrapper>
      ) : (
        <StyledIconWrapper>
          <FaExclamationCircle />
        </StyledIconWrapper>
      ),
    position: 'bottom-center',
    duration: toastDuration,
  });
};

export default renderErrorToast;
