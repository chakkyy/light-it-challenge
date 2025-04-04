import { useState, useCallback, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { Patient, PatientFormData } from '../types/patient';
import { patientApi } from '../api/patients';
import { ApiError, NetworkError, NotFoundError } from '../utils/errors';

/**
 * Hook for patient data management
 *
 * Handles fetching patients from API and local CRUD operations
 * Includes comprehensive error handling
 */
export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<Error | null>(null);
  const initialFetchDone = useRef(false);

  /**
   * Handles API errors with appropriate user feedback
   */
  const handleApiError = useCallback(
    (err: unknown, fallbackMessage: string) => {
      setApiError(err instanceof Error ? err : new Error(fallbackMessage));

      if (err instanceof NotFoundError) {
        toast.error(err.message);
      } else if (err instanceof NetworkError) {
        toast.error(err.message);
      } else if (err instanceof ApiError) {
        toast.error(
          `${err.message}${err.statusCode ? ` (${err.statusCode})` : ''}`,
        );
      } else if (err instanceof Error) {
        toast.error(err.message || fallbackMessage);
      } else {
        toast.error(fallbackMessage);
      }
      return null;
    },
    [],
  );

  /**
   * Fetch all patients from the API
   */
  const fetchPatients = useCallback(async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      setApiError(null);
      const data = await patientApi.getAll();
      setPatients(data);
      initialFetchDone.current = true;
    } catch (err) {
      handleApiError(err, 'Failed to fetch patients');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, handleApiError]);

  useEffect(() => {
    if (!initialFetchDone.current) {
      fetchPatients();
    }
  }, [fetchPatients]);

  /**
   * Updates an existing patient's information
   */
  const updatePatient = useCallback(
    async (id: string, data: PatientFormData) => {
      try {
        setApiError(null);
        const index = patients.findIndex((p) => p.id === id);

        if (index !== -1) {
          const updatedPatients = [...patients];
          updatedPatients[index] = {
            ...updatedPatients[index],
            ...data,
            lastUpdated: new Date().toISOString(),
          };
          setPatients(updatedPatients);
        }

        // Perform actual update
        const updatedPatient = await patientApi.update(id, data);

        // Update with server response
        setPatients((prev) =>
          prev.map((patient) => (patient.id === id ? updatedPatient : patient)),
        );

        return updatedPatient;
      } catch (err) {
        // Rollback on error
        if (err instanceof NotFoundError) {
          setPatients(patients);
        }
        return handleApiError(err, `Failed to update patient ${id}`);
      }
    },
    [patients, handleApiError],
  );

  /**
   * Adds a new patient to the system
   */
  const addPatient = useCallback(
    async (data: PatientFormData) => {
      try {
        setApiError(null);
        const newPatient = await patientApi.create(data);
        setPatients((prev) => [...prev, newPatient]);
        return newPatient;
      } catch (err) {
        return handleApiError(err, 'Failed to add patient');
      }
    },
    [handleApiError],
  );

  /**
   * Retrieves a specific patient by ID
   */
  const getPatient = useCallback(
    (id: string) => {
      return patients.find((patient) => patient.id === id);
    },
    [patients],
  );

  /**
   * Removes a patient from the system
   */
  const deletePatient = useCallback(
    async (id: string) => {
      try {
        setApiError(null);
        // Store original patients for rollback on error
        const previousPatients = [...patients];
        setPatients((prev) => prev.filter((patient) => patient.id !== id));

        try {
          // Perform actual deletion
          await patientApi.delete(id);
        } catch (err) {
          // Rollback on error
          setPatients(previousPatients);
          handleApiError(err, `Failed to delete patient ${id}`);
        }
      } catch (err) {
        handleApiError(err, `Error preparing to delete patient ${id}`);
      }
    },
    [patients, handleApiError],
  );

  return {
    patients,
    isLoading,
    error: apiError,
    updatePatient,
    addPatient,
    getPatient,
    deletePatient,
    fetchPatients,
  };
};
