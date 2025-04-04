/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePatients } from '../hooks/usePatients';
import { patientApi } from '../api/patients';
import { Patient, PatientFormData } from '../types/patient';

vi.mock('../api/patients', () => ({
  patientApi: {
    getAll: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'John Doe',
    createdAt: '2023-01-01T00:00:00.000Z',
    description: 'Test description',
    avatar: undefined,
    website: undefined,
    lastUpdated: '2023-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    createdAt: '2023-01-02T00:00:00.000Z',
    description: 'Test description',
    avatar: undefined,
    website: undefined,
    lastUpdated: '2023-01-02T00:00:00.000Z',
  },
];

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('usePatients hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (patientApi.getAll as any).mockResolvedValue(mockPatients);
  });

  test('fetches and returns patients correctly', async () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => usePatients(), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(patientApi.getAll).toHaveBeenCalledTimes(1);
    expect(result.current.patients).toEqual(mockPatients);
  });

  test('creates a patient correctly', async () => {
    const newPatient: PatientFormData = {
      name: 'New Patient',
      description: 'Test description',
    };

    const createdPatient: Patient = {
      ...newPatient,
      id: '3',
      createdAt: '2023-01-03T00:00:00.000Z',
      avatar: undefined,
      website: undefined,
      lastUpdated: '2023-01-03T00:00:00.000Z',
    };

    (patientApi.create as any).mockResolvedValue(createdPatient);

    const wrapper = createWrapper();
    const { result } = renderHook(() => usePatients(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      result.current.addPatient(newPatient);
    });

    expect(patientApi.create).toHaveBeenCalledWith(newPatient);
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.patients).toContainEqual(createdPatient);
  });

  test('updates a patient correctly', async () => {
    const patientId = '1';
    const updateData: PatientFormData = {
      name: 'John Doe Updated',
      description: 'Updated description',
    };

    const updatedPatient: Patient = {
      id: patientId,
      name: 'John Doe Updated',
      description: 'Updated description',
      createdAt: '2023-01-01T00:00:00.000Z',
      lastUpdated: '2023-01-04T00:00:00.000Z',
      avatar: undefined,
      website: undefined,
    };

    (patientApi.update as any).mockResolvedValue(updatedPatient);

    const wrapper = createWrapper();
    const { result } = renderHook(() => usePatients(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      result.current.updatePatient(patientId, updateData);
    });

    expect(patientApi.update).toHaveBeenCalledWith(patientId, updateData);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });
});
