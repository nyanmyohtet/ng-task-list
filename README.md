# Ng Tasks List App

A simple Angular application for managing tasks with dependencies. Users can check off tasks when their dependencies are completed. This app utilizes Angular components and services for a modular design.

## Features

- **Task Management**: Read and complete tasks.
- **Dependency Management**: Tasks can have dependencies; they can only be completed if all dependencies are completed.
- **Task Counts**: Displays the count of tasks categorized by type (e.g., BUG, IMPR, IMPL, INFRA).
- **Bootstrap 5**: Responsive design using Bootstrap 5 for styling.

## Screen Shot

![image](https://github.com/user-attachments/assets/7af0506f-25e1-4df7-a280-62adcd576d8e)


## Technologies Used

- **Angular**: Frontend framework for building the application.
- **TypeScript**: Language used for building Angular components and services.
- **Bootstrap 5**: CSS framework for styling and responsive design.
- **NgModel**: Two-way data binding for form inputs.

## Prerequisites

- Node.js (version 18 or later)
- Angular CLI (version 12 or later)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/nyanmyohtet/ng-task-list
```

2. Navigate to the project directory:

```bash
cd ng-task-list
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
ng serve
```

5. Open your browser and go to `http://localhost:4200/task-list`
