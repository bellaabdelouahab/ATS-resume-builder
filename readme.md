Collecting workspace information# IT Resume Builder

A modern web application for creating professional IT and tech resumes with a clean, customizable interface.

## Overview

IT Resume Builder is a React-based web application that allows tech professionals to create, customize, and export polished resumes. The application features an intuitive form-based interface for entering professional information and generates a professional-looking resume that can be downloaded as a PDF.

## Features

- **Comprehensive Sections**: Add all essential resume components:
  - Personal Information
  - Work Experience
  - Education
  - Skills with proficiency ratings
  - Projects with technology tags
  - Certifications
  - Languages
  - References

- **Live Preview**: See changes to your resume in real-time
- **PDF Export**: Download your completed resume as a PDF
- **Save/Load**: Save your resume as a JSON file and load it later to continue editing
- **Validation**: Form validation using Zod schema

## Technologies

- [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for icons
- [Zod](https://github.com/colinhacks/zod) for schema validation
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) for PDF generation
- [Vite](https://vitejs.dev/) for fast development

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd it-resume-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Fill in your details**: Navigate through each section of the form to add your personal information, work experience, education, etc.

2. **Preview your resume**: Your changes will be reflected in real-time in the preview panel.

3. **Export options**:
   - **Save Resume**: Save your resume data as a JSON file to edit later
   - **Load Resume**: Load a previously saved resume JSON file
   - **Download PDF**: Export your resume as a professional PDF document
   - **View PDF**: Preview your resume as it will appear in PDF format

4. **Resume data persistence**: Your resume data is automatically saved to localStorage, so you won't lose your progress if you refresh the page.

## Project Structure

```
src/
├── components/            # UI components
│   ├── PersonalInfoSection.tsx
│   ├── WorkExperienceSection.tsx
│   ├── EducationSection.tsx
│   ├── SkillsSection.tsx
│   └── ...
├── context/
│   └── ResumeContext.tsx  # React context for state management
├── types/
│   └── resume.ts          # TypeScript types and Zod schemas
├── App.tsx                # Main application component
└── main.tsx              # Entry point
```

## Building for Production

To build the application for production, run:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## Preview

To preview the production build locally:

```bash
npm run preview
```

## License

This project is open source and available under the MIT License.