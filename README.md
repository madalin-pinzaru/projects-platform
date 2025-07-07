# Assignment

React application with TypeScript, Material-UI, react-hook-form, and i18n support.

## Overview

This project provides a management interface for Projects, Organizations, Users, and Statistics. It features modern UI components, form validation, and internationalization.

## Features

- Project, Organization, User, and Statistics management
- Internationalization (i18n) with `react-i18next`
- Form validation with `react-hook-form`
- Material-UI components
- Vite for fast development
- Vitest for testing

## Technologies Used

- React
- TypeScript
- Material-UI (MUI)
- react-hook-form
- react-i18next
- Vite
- Vitest

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer)
- [npm](https://www.npmjs.com/) (v8 or newer)

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd <your-repo-directory>
   ```
2. **Install dependencies**
   ```sh
   npm install

   ```
3. **Start the development server:**
   ```sh
   npm start
   ```
   The app will be available at http://localhost:3000.
4. **Build the application:**
   ```sh
   npm run build
   ```
   The production build will be in the `dist` directory.
5. **Run tests:**
   ```sh
   npm run test
   ```
   This will run the tests using Vitest.

## Project Structure

- `src/`: Contains the source code of the application.
  - `components/`: Reusable components.
    - `common/`: Common components used throughout the application.
    - `Projects|Organizations|Users|Statistics|Exercise/`: Specific page components
  - `hooks/`: Custom hooks.
  - `i18n/`: Internationalization setup.
  - `styles/`: Global styles
  - `utils/`: Utility functions and constants.
