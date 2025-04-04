# Patient Management System

A modern React application for managing patient records with a clean, responsive interface.

## Features

- View patient records in a visually appealing card-based interface
- Expand/collapse patient cards to view additional details
- Add new patients through a modal form interface
- Edit existing patient information with full validation
- Filter patients by name and other properties
- Sort patients by different criteria with customizable direction
- Theme switching between light and dark modes
- Responsive design for all screen sizes
- Smooth animations and transitions
- User-friendly notifications for operations
- Error handling and recovery options
- Image caching for improved performance

## Tech Stack

- React + TypeScript - Core UI framework with type safety
- Vite - For fast development and building
- Tanstack React Query - For data fetching, caching, and state management
- Styled Components - For component-based styling with theme support
- React Hook Form + Yup - For form validation
- Framer Motion - For smooth animations and transitions
- React Modal - For accessible modal dialogs
- React Hot Toast - For user-friendly notifications
- React Router - For application routing
- React Icons - For consistent UI iconography
- Axios - For API communication

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests with Vitest
- `npm run test:coverage` - Run tests with coverage reporting

## Project Structure

```
├── src/                    # Source code
│   ├── api/                # API service functions
│   │   └── patients.ts     # Patient CRUD operations
│   ├── assets/             # Static assets
│   ├── components/         # React components
│   │   ├── atoms/          # Basic UI elements (buttons, inputs, etc.)
│   │   ├── molecules/      # Composite components (cards, forms, etc.)
│   │   ├── organisms/      # Complex components (lists, modals, etc.)
│   │   ├── layouts/        # Layout components
│   │   ├── providers/      # Provider components
│   │   └── styles/         # Component-specific styles
│   ├── contexts/           # React context providers
│   │   ├── ImageCacheContext.tsx   # For image caching
│   │   ├── PatientContext.tsx      # Patient state management
│   │   └── PatientFiltersContext.tsx # Filtering and sorting
│   ├── hooks/              # Custom React hooks
│   │   ├── useDebounce.ts          # For debounced search
│   │   ├── useMediaQuery.ts        # For responsive design
│   │   ├── usePatientAvatar.ts     # For avatar handling
│   │   └── usePatients.ts          # For patient data operations
│   ├── schemas/            # Validation schemas
│   ├── styles/             # Global styles
│   ├── test/               # Test utilities and mocks
│   ├── types/              # TypeScript type definitions
│   │   └── patient.ts      # Patient-related types
│   └── utils/              # Utility functions
```

## Architecture

The application follows a component-based architecture with clear separation of concerns:

### Data Flow Architecture

1. **API Layer** (`api/patients.ts`):

   - Handles communication with the backend
   - Implements CRUD operations for patient data
   - Provides fallback mechanisms for offline operation

2. **State Management**:

   - **React Query** (`usePatients.ts` hook):
     - Manages server state (data fetching, caching, synchronization)
     - Handles optimistic updates for immediate UI feedback
     - Provides loading and error states
   - **React Context** (`contexts/`):
     - `PatientContext`: Manages patient data and operations
     - `PatientFiltersContext`: Handles filtering, sorting, and pagination
     - `ImageCacheContext`: Manages avatar image caching

3. **Component Architecture**:
   - **Atomic Design Methodology**:
     - `atoms/`: Basic UI elements (buttons, inputs, typography)
     - `molecules/`: Composite components (cards, form groups)
     - `organisms/`: Complete features (patient lists, detail views)
     - `layouts/`: Page structure components
     - `providers/`: Components providing context to the app

### Key Implementation Patterns

1. **Optimistic Updates**:

   - Updates UI immediately while operations complete in background
   - Rolls back changes if operations fail
   - Provides visual feedback for operations

2. **Form Validation**:

   - Schema-based validation with Yup
   - Real-time validation with React Hook Form
   - Custom validation logic for specific fields

3. **Error Handling**:

   - Error boundaries to prevent UI crashes
   - Graceful degradation with fallback UI
   - Retry mechanisms for failed operations

4. **Responsive Design**:

   - Custom hooks for media queries
   - Mobile-first approach
   - Adaptive layouts for different screen sizes

5. **Performance Optimizations**:
   - Image caching
   - Pagination for large datasets
   - Memoization for expensive computations
   - Debounced search to reduce API calls

## Development Guidelines

### Component Development

1. **Component Organization**:

   - Follow the atomic design methodology
   - Keep components focused on a single responsibility
   - Use composition over inheritance

2. **Styling Approach**:

   - Use styled-components with theme support
   - Avoid inline styles
   - Use consistent naming conventions for styled components
   - Implement responsive design with media queries

3. **State Management**:
   - Use React Query for server state
   - Use React Context for global UI state
   - Keep component state local when possible
   - Avoid prop drilling by using context or custom hooks

### Code Quality

1. **TypeScript**:

   - Define clear interfaces for all props and state
   - Use proper typing for API responses and forms
   - Avoid using `any` type
   - Document complex types with TSDoc comments

2. **Error Handling**:

   - Use error boundaries for component errors
   - Provide user-friendly error messages
   - Implement retry mechanisms
   - Log errors for debugging

3. **Testing**:

   - Write unit tests for utility functions
   - Test components with React Testing Library
   - Mock API calls in tests
   - Test error scenarios and edge cases

4. **Performance**:
   - Use React.memo for expensive components
   - Implement virtualization for long lists
   - Optimize re-renders with useMemo and useCallback
   - Lazy load components when appropriate

### Accessibility

1. **WCAG Compliance**:

   - Use semantic HTML elements
   - Provide proper ARIA attributes
   - Ensure keyboard navigation
   - Maintain sufficient color contrast
   - Support screen readers

2. **UX Considerations**:
   - Provide visual feedback for actions
   - Use consistent UI patterns
   - Implement proper focus management
   - Support different input methods

## License

MIT
