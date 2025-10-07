# Prashikshan - NEP Internship Platform

A complete frontend-only internship management platform built with React, TypeScript, and Tailwind CSS.

## Features

- **Role-based Authentication**: Student, Faculty, Industry, Admin roles
- **AI-powered Matching**: Smart internship recommendations
- **Offline Support**: Queue operations when offline
- **Blockchain Certificates**: Hash-chain verification
- **NEP Compliance**: Credit calculation and reporting
- **Real-time Notifications**: In-app and browser notifications
- **Data Persistence**: localStorage with versioning
- **Export/Import**: PDF reports and data backup

## Demo Accounts

- **Student**: `student@prashikshan.in` / `demo123`
- **Faculty**: `faculty@prashikshan.in` / `demo123`
- **Industry**: `industry@prashikshan.in` / `demo123`
- **Admin**: `admin@prashikshan.in` / `demo123`

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5173 in your browser

4. Use any of the demo accounts to login

## Project Structure

```
src/
├── app/           # Main app components and routing
├── core/          # Business logic and utilities
├── features/      # Feature-specific components
├── stores/        # Zustand state management
└── index.css      # Global styles
```

## Key Technologies

- **React 18** with TypeScript
- **Vite** for build tooling
- **React Router** for navigation
- **Zustand** for state management
- **Tailwind CSS** for styling
- **Zod** for validation
- **jsPDF** for PDF export
- **Recharts** for analytics

## Architecture

- **Frontend-only**: No backend required
- **localStorage**: Persistent data storage
- **Mock APIs**: Simulated REST endpoints
- **Offline-first**: Queue operations when offline
- **Role-based**: Different interfaces per user type

## Development

The app is fully functional with:
- ✅ Authentication and role switching
- ✅ Student dashboard with AI matching
- ✅ Internship browsing and applications
- ✅ Application tracking with timeline
- ✅ Offline queue system
- ✅ Theme switching (light/dark)
- ✅ Responsive design

Additional features like logbook, reports, certificates, and admin panels have placeholder components ready for implementation.

## Data Storage

All data is stored in localStorage with versioned keys:
- `prashi:v1:users`
- `prashi:v1:internships`
- `prashi:v1:applications`
- etc.

The app automatically seeds demo data on first load.