import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

import { ThemeWrapper } from '../components/providers/ThemeWrapper';
import { PatientProvider } from '../contexts/PatientContext';
import { PatientFiltersProvider } from '../contexts/PatientFiltersContext';
import PatientCard from '../components/molecules/PatientCard';
import { Patient } from '../types/patient';
import '@testing-library/jest-dom';

// Mock matchMedia before tests run
beforeAll(() => {
  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

const mockPatient: Patient = {
  id: '1',
  name: 'John Doe',
  avatar: 'https://example.com/avatar.jpg',
  description: 'Patient description',
  website: 'https://example.com',
  createdAt: '2023-01-01T00:00:00.000Z',
  lastUpdated: '2023-01-01T00:00:00.000Z',
};

const mockViewDetails = vi.fn();
const mockEdit = vi.fn();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const mockUsePatientAvatar = vi.fn();
vi.mock('../hooks/usePatientAvatar', () => ({
  usePatientAvatar: () => mockUsePatientAvatar(),
}));

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeWrapper>
          <PatientProvider>
            <PatientFiltersProvider>{children}</PatientFiltersProvider>
          </PatientProvider>
        </ThemeWrapper>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe('Patient Components', () => {
  beforeEach(() => {
    mockUsePatientAvatar.mockReturnValue({
      shouldUseOriginal: true,
      imageSrc: 'https://example.com/avatar.jpg',
      initials: 'JD',
      handleImageError: vi.fn(),
      handleImageLoad: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('PatientCard renders correctly with patient data', async () => {
    render(
      <Wrapper>
        <PatientCard
          patient={mockPatient}
          onViewDetails={mockViewDetails}
          onEdit={mockEdit}
        />
      </Wrapper>,
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('View')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  test('Buttons in PatientCard trigger correct handlers', async () => {
    render(
      <Wrapper>
        <PatientCard
          patient={mockPatient}
          onViewDetails={mockViewDetails}
          onEdit={mockEdit}
        />
      </Wrapper>,
    );

    fireEvent.click(screen.getByText('View'));
    expect(mockViewDetails).toHaveBeenCalledWith(mockPatient);

    fireEvent.click(screen.getByText('Edit'));
    expect(mockEdit).toHaveBeenCalledWith(mockPatient);
  });

  test('PatientCard handles avatar correctly', async () => {
    mockUsePatientAvatar.mockReturnValue({
      shouldUseOriginal: false,
      imageSrc: 'placeholder-url',
      initials: 'JD',
      handleImageError: vi.fn(),
      handleImageLoad: vi.fn(),
    });

    const patientWithoutAvatar = { ...mockPatient, avatar: undefined };

    render(
      <Wrapper>
        <PatientCard
          patient={patientWithoutAvatar}
          onViewDetails={mockViewDetails}
          onEdit={mockEdit}
        />
      </Wrapper>,
    );

    expect(screen.getByText('JD')).toBeInTheDocument();
  });
});
