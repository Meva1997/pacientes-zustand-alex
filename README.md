# Pacientes Zustand Alex

Welcome to **Pacientes Zustand Alex**, a project for managing patients using modern React state management with Zustand. This application is designed to demonstrate efficient and scalable state handling in a React environment, focusing on patient data management.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [License](#license)

## Overview

Pacientes Zustand Alex is a sample project built with React and Zustand for state management. It provides a simple interface to add, view, and manage patient records. The project is intended to showcase best practices using Zustand, a minimalistic state management library for React.

## Features

- Add new patients with their information
- View a list of all patients
- Edit and remove patient records
- Persist state using Zustand's middleware
- Modern React functional components
- Clean and maintainable codebase

## Tech Stack

- **React** – Frontend library for building UI
- **Zustand** – State management
- **TypeScript** (or TypeScript, if applicable)
- **Vite** or **Create React App** (depending on setup)
- Styling with **CSS** or **styled-components** (edit as appropriate)

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Meva1997/pacientes-zustand-alex.git
   cd pacientes-zustand-alex
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) in your browser.

## Project Structure

```
src/
  components/      # React components (PatientForm, PatientList, etc.)
  store/           # Zustand store configuration
  App.jsx          # Main app component
  main.jsx         # Entry point
  ...
public/
  index.html
```

## Usage

- **Add Patient:** Fill out the form and submit to add a new patient.
- **Edit Patient:** Click "Edit" on a patient's card to update their info.
- **Delete Patient:** Click "Delete" to remove a patient from the list.
- All data is managed via Zustand's global store, providing a fast and intuitive experience.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

Feel free to customize this README further for your project's needs!
