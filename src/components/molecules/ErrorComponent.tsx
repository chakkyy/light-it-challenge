import {
  StyledErrorContainer,
  StyledErrorIcon,
  StyledErrorTitle,
  StyledErrorMessage,
  StyledButtonGroup,
  StyledPrimaryButton,
  StyledSecondaryButton,
  FaExclamationCircle,
  FaRedo,
  FaSync,
  FaHome,
} from '../atoms/ErrorUI';

interface ErrorComponentProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showHomeButton?: boolean;
  showRefreshButton?: boolean;
  minHeight?: string;
}

const ErrorComponent = ({
  title = 'Something went wrong',
  message = 'We encountered an error. Please try again.',
  onRetry,
  showHomeButton = false,
  showRefreshButton = true,
  minHeight,
}: ErrorComponentProps) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleHome = () => {
    window.location.href = '/';
  };

  return (
    <StyledErrorContainer $minHeight={minHeight}>
      <StyledErrorIcon>
        <FaExclamationCircle />
      </StyledErrorIcon>
      <StyledErrorTitle>{title}</StyledErrorTitle>
      <StyledErrorMessage>{message}</StyledErrorMessage>
      <StyledButtonGroup>
        {onRetry && (
          <StyledPrimaryButton onClick={onRetry} whileTap={{ scale: 0.97 }}>
            <FaRedo size={14} />
            <span>Retry</span>
          </StyledPrimaryButton>
        )}
        {showRefreshButton && !onRetry && (
          <StyledPrimaryButton
            onClick={handleRefresh}
            whileTap={{ scale: 0.97 }}
          >
            <FaSync size={14} />
            <span>Refresh Page</span>
          </StyledPrimaryButton>
        )}
        {showHomeButton && (
          <StyledSecondaryButton
            onClick={handleHome}
            whileTap={{ scale: 0.97 }}
          >
            <FaHome size={14} />
            <span>Back to Home</span>
          </StyledSecondaryButton>
        )}
      </StyledButtonGroup>
    </StyledErrorContainer>
  );
};

export default ErrorComponent;
