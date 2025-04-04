# Patient Management System

A modern React application for managing patient records with a clean, responsive interface.

## Live Website
https://light-it-challenge-khaki.vercel.app/

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
