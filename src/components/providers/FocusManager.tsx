import React, {
  useEffect,
  useCallback,
  useState,
  createContext,
  useContext,
  ReactNode,
  useMemo,
} from 'react';

interface FocusManagerContextType {
  trapFocus: (containerId: string) => void;
  releaseFocus: () => void;
  setInitialFocus: (elementId: string) => void;
}

const FocusManagerContext = createContext<FocusManagerContextType | undefined>(
  undefined,
);

export const useFocusManager = (): FocusManagerContextType => {
  const context = useContext(FocusManagerContext);
  if (!context) {
    throw new Error(
      'useFocusManager must be used within a FocusManagerProvider',
    );
  }
  return context;
};

interface FocusManagerProviderProps {
  children: ReactNode;
}

export const FocusManagerProvider: React.FC<FocusManagerProviderProps> = ({
  children,
}) => {
  const [activeContainerId, setActiveContainerId] = useState<string | null>(
    null,
  );
  const [previousActiveElement, setPreviousActiveElement] =
    useState<Element | null>(null);

  const trapFocus = useCallback((containerId: string) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Save current active element
    setPreviousActiveElement(document.activeElement);
    setActiveContainerId(containerId);

    // Find all focusable elements within the container
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    if (focusableElements.length > 0) {
      // Focus the first element
      (focusableElements[0] as HTMLElement).focus();
    }
  }, []);

  const releaseFocus = useCallback(() => {
    setActiveContainerId(null);

    // Return focus to previous element
    if (previousActiveElement && previousActiveElement instanceof HTMLElement) {
      previousActiveElement.focus();
    }
  }, [previousActiveElement]);

  const setInitialFocus = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
    }
  }, []);

  // Handle focus trap with keyboard navigation
  useEffect(() => {
    if (!activeContainerId) return undefined;

    const container = document.getElementById(activeContainerId);
    if (!container) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        const focusableElements = container.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        // If shift+tab and on first element, move to last
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
        // If tab and on last element, move to first
        else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }

      // Allow escape key to release focus
      if (event.key === 'Escape') {
        releaseFocus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeContainerId, releaseFocus]);

  const contextValue = useMemo(
    () => ({
      trapFocus,
      releaseFocus,
      setInitialFocus,
    }),
    [trapFocus, releaseFocus, setInitialFocus],
  );

  return (
    <FocusManagerContext.Provider value={contextValue}>
      {children}
    </FocusManagerContext.Provider>
  );
};

export default FocusManagerProvider;
