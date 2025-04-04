/* eslint-disable max-classes-per-file */
/**
 * Custom API error with optional status code
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Network error for connection issues
 */
export class NetworkError extends Error {
  constructor(
    message = 'Network error occurred. Please check your connection.',
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

/**
 * Not found error for resources that don't exist
 */
export class NotFoundError extends Error {
  constructor(resource: string, id: string) {
    super(`${resource} with ID ${id} not found`);
    this.name = 'NotFoundError';
  }
}

/**
 * Validation error for invalid input data
 */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Authorization error for permissions issues
 */
export class AuthorizationError extends Error {
  constructor(message = 'You do not have permission to perform this action') {
    super(message);
    this.name = 'AuthorizationError';
  }
}
