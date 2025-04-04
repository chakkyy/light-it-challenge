import React, { createContext, useContext, ReactNode } from 'react';
import { Patient, PatientFormData } from '../types/patient';
import { usePatients as usePatientsHook } from '../hooks/usePatients';

/**
 * Interface defining the patient context shape and available operations
 */
interface PatientContextType {
  patients: Patient[];
  isLoading: boolean;
  updatePatient: (id: string, data: PatientFormData) => Promise<Patient>;
  addPatient: (data: PatientFormData) => Promise<Patient>;
  getPatient: (id: string) => Patient | undefined;
  deletePatient: (id: string) => Promise<void>;
  fetchPatients: () => Promise<void>;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

/**
 * Provider component that makes patient data and operations available to child components
 *
 * Uses the usePatients hook for data management and exposes its functionality to the app
 *
 * @param children - Child components that will have access to the patient context
 */
export const PatientProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const patientData = usePatientsHook();
  return (
    <PatientContext.Provider value={patientData as PatientContextType}>
      {children}
    </PatientContext.Provider>
  );
};

/**
 * Hook for accessing the patient context
 *
 * @returns The patient context with data and operations
 * @throws Error if used outside of PatientProvider
 */
export const usePatients = (): PatientContextType => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatients must be used within a PatientProvider');
  }
  return context;
};
