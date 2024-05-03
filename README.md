# Term Deposit Calculator

The Term Deposit Calculator is a web application that allows users to calculate the final balance of a term deposit based on the initial deposit amount, interest rate, investment term, and interest payment frequency. This README provides an in-depth overview of the technical decisions made, the application's architecture, testing approach, and other relevant details.

- [Term Deposit Calculator](#term-deposit-calculator)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running Tests](#running-tests)
  - [Technical Decisions](#technical-decisions)
  - [Application Architecture](#application-architecture)
  - [Testing Approach](#testing-approach)
  - [CI - Github actions](#ci---github-actions)
  - [Code Quality and Best Practices](#code-quality-and-best-practices)
  - [Performance Considerations](#performance-considerations)
  - [Error Handling](#error-handling)
  - [Styling and UI](#styling-and-ui)
  - [Accessibility](#accessibility)
  - [Future Enhancements](#future-enhancements)

## Getting Started

### Prerequisites

- Node.js version 21 installed on your system.
- A package manager such as npm or yarn.

### Installation

Install dependencies:

```
  npm install
```

Running the Application

```
  npm run dev
```

This will run the app in development mode. Open http://localhost:5173 to view it in the browser.

### Running Tests

To run the tests, execute:

```
  npm run test
```

## Technical Decisions

The Term Deposit Calculator is built using the following technologies and libraries:

- React: A simple React single-page application is used for the frontend. All the logic is done client-side since there is no need for data persistence in the current implementation.
- TypeScript: TypeScript is used as the primary programming language to add static typing and enhance code quality.
- Vite: Vite is used as the build tool and development server for fast development server startup and optimized builds for production.
- CSS: Plain CSS is used for styling the application, following a simple and lightweight approach.
- Vitest: Vitest is used as the testing framework for unit testing the application for fast setup and Jest-compatible syntax.

One notable technical decision is the absence of a backend. Since there is no requirement for data persistence in the current scope, the application is implemented as a standalone frontend. However, in future implementations, it would be beneficial to introduce a backend to separate concerns and handle data storage and retrieval.

## Application Architecture

The application follows a modular and component-based architecture. The main components are:

- App: The main component that serves as the entry point of the application. It renders the term deposit calculator form and handles the calculation and display of the final balance.
- termDepositCalculator: A module that contains utility functions for calculating the final balance, validating inputs, and formatting the result.

The termDepositCalculator module encapsulates the core logic of the term deposit calculation. It includes functions for calculating the final balance based on the provided inputs, validating the inputs, and formatting the result.

## Testing Approach

The application follows a unit testing approach using the Vitest testing framework. The tests are located in the calculateTermDeposit.test.ts file.
The testing strategy focuses on testing the core functionality of the term deposit calculation. The tests cover different scenarios, such as:

- Calculating the final balance with different interest payment frequencies (monthly, quarterly, annually, at maturity).
- Calculating the final balance with different interest rates (positive, zero, negative).
  Handling error cases, such as invalid end dates or missing inputs.

The tests use Vitest's mocking capabilities to set a fixed system time, ensuring consistent results regardless of the actual current date.

## CI - Github actions

A simple GitHub action was added to run tests on every commit to the master branch, ensuring that we would know if we broke existing functionality.

## Code Quality and Best Practices

The codebase follows clean code principles and adheres to the Airbnb JavaScript Style Guide. Some of the key practices followed include:

- Consistent naming conventions: Meaningful and descriptive names are used for variables, functions, and components.
- Modular and reusable code: The application is divided into smaller, reusable components and utility functions.
- Separation of concerns: The business logic is separated from the UI components, promoting testability and maintainability.
- Proper error handling: Errors are caught and handled gracefully, providing informative error messages to the user.
- Code formatting: Consistent code formatting is enforced using Prettier, ensuring a uniform code style across the project.

## Performance Considerations

To ensure optimal performance, the following measures have been taken:

- Memoization: The calculateFinalBalance function is memoized using the useMemo hook to avoid unnecessary recalculations when the inputs haven't changed.
- Efficient state management: The application uses the useState hook to manage state efficiently, avoiding unnecessary re-renders.
- Lightweight dependencies: The application minimizes the use of external libraries to keep the bundle size small and reduce the overhead.

## Error Handling

The application includes robust error handling to provide a smooth user experience:

- Input validation: The validateInputs function in the helpers module validates the user inputs and throws appropriate errors if the inputs are invalid.
- Error messaging: When an error occurs during the calculation, an error message is displayed to the user, indicating the nature of the error.
- Error boundaries: The application uses error boundaries to catch and handle errors gracefully, preventing the entire application from crashing.

## Styling and UI

The application uses plain CSS for styling, following a clean, minimalistic and responsive design approach. The styles are defined in the App.css file.

## Accessibility

Accessibility has been taken into consideration throughout the development process, such as proper labeling, keyboard navigation, color contrast, and semantic HTML.

## Future Enhancements

Some things I would do given more time:

-Improve error handling testing
-Use client-side input validation with formkit
-Split the app into individual components for better readability and modularization
-Split utils code into separate files for better separation of concerns (e.g., enum to its own separate file)
-Move all of the term deposit logic to a backend
-Add integration tests with React Testing Library
-Form accessibility and tooltips
-Add a continuous deployment GitHub action
-Add a utility function to format the final balance to "$xxx,xxx,xxx"
