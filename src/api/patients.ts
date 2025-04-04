import { Patient, PatientFormData } from '../types/patient';
import { ApiError, NotFoundError } from '../utils/errors';
import samplePatientsData from '../patientsData.json';

const API_URL = import.meta.env.VITE_API_URL;

// In-memory store for patients
let inMemoryPatients: Patient[] = [];

/**
 * API service for patient data management
 * Provides methods for CRUD operations on patient records
 * Falls back to local data when API is unavailable
 */
export const patientApi = {
  /**
   * Retrieves all patients from the API or falls back to local data
   *
   * @returns Promise resolving to an array of patient objects
   * @throws NetworkError if the API request fails
   */
  getAll: async (): Promise<Patient[]> => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new ApiError(
          `Failed to fetch patients: ${response.statusText}`,
          response.status,
        );
      }
      const data = await response.json();
      inMemoryPatients = data;
      return data;
    } catch (error) {
      // Return in-memory patients if available
      if (inMemoryPatients.length > 0) {
        return inMemoryPatients;
      }
      // Or fall back to sample data
      inMemoryPatients = samplePatientsData;
      return samplePatientsData;
    }
  },

  /**
   * Retrieves a specific patient by ID
   *
   * @param id - The unique identifier of the patient to retrieve
   * @returns Promise resolving to the patient object
   * @throws NotFoundError if patient with the specified ID is not found
   */
  getById: async (id: string): Promise<Patient> => {
    const patients = await patientApi.getAll();
    const patient = patients.find((p) => p.id === id);
    if (!patient) throw new NotFoundError('Patient', id);
    return patient;
  },

  /**
   * Creates a new patient record
   *
   * @param data - The patient data to create a new record with
   * @returns Promise resolving to the newly created patient object
   */
  create: async (data: PatientFormData): Promise<Patient> => {
    try {
      const newPatient: Patient = {
        ...data,
        id: `local-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };

      inMemoryPatients = [...inMemoryPatients, newPatient];
      return newPatient;
    } catch (error) {
      throw new Error('Failed to create patient record');
    }
  },

  /**
   * Updates an existing patient record
   *
   * @param id - The unique identifier of the patient to update
   * @param data - The new patient data to apply
   * @returns Promise resolving to the updated patient object
   * @throws NotFoundError if patient with the specified ID is not found
   */
  update: async (id: string, data: PatientFormData): Promise<Patient> => {
    try {
      const index = inMemoryPatients.findIndex((p) => p.id === id);
      if (index === -1) throw new NotFoundError('Patient', id);

      const updatedPatient: Patient = {
        ...inMemoryPatients[index],
        ...data,
        lastUpdated: new Date().toISOString(),
      };

      inMemoryPatients[index] = updatedPatient;
      return updatedPatient;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new Error(
        `Failed to update patient: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  },

  /**
   * Deletes a patient record
   *
   * @param id - The unique identifier of the patient to delete
   * @throws NotFoundError if patient with the specified ID is not found
   */
  delete: async (id: string): Promise<void> => {
    try {
      const initialLength = inMemoryPatients.length;
      inMemoryPatients = inMemoryPatients.filter((p) => p.id !== id);

      if (inMemoryPatients.length === initialLength) {
        throw new NotFoundError('Patient', id);
      }
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new Error(
        `Failed to delete patient: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  },
};
