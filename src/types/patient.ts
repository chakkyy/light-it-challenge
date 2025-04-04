/**
 * Represents a patient in the system
 */
export interface Patient {
  id: string;
  name: string;
  avatar?: string;
  description?: string;
  website?: string;
  createdAt: string;
  lastUpdated?: string;
}

/**
 * Data structure for creating or updating a patient
 * Omits system-managed fields like id and timestamps
 */
export type PatientFormData = {
  name: string;
  avatar?: string;
  description?: string;
  website?: string;
};
