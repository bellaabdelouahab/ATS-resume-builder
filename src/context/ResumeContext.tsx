import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Resume, ResumeSchema } from '../types/resume';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

type ValidationError = {
  field: string;
  message: string;
};

type ResumeContextType = {
  state: Resume;
  dispatch: React.Dispatch<ResumeAction>;
  saveResume: () => void;
  loadResume: (file: File) => Promise<void>;
  errors: ValidationError[];
  clearErrors: () => void;
};

type ResumeAction = 
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<Resume['personalInfo']> }
  | { type: 'ADD_WORK_EXPERIENCE' }
  | { type: 'UPDATE_WORK_EXPERIENCE'; payload: { id: string; data: Partial<Resume['workExperience'][0]> } }
  | { type: 'REMOVE_WORK_EXPERIENCE'; payload: string }
  | { type: 'ADD_EDUCATION' }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<Resume['education'][0]> } }
  | { type: 'REMOVE_EDUCATION'; payload: string }
  | { type: 'ADD_SKILL' }
  | { type: 'UPDATE_SKILL'; payload: { id: string; data: Partial<Resume['skills'][0]> } }
  | { type: 'REMOVE_SKILL'; payload: string }
  | { type: 'ADD_LANGUAGE' }
  | { type: 'UPDATE_LANGUAGE'; payload: { id: string; data: Partial<Resume['languages'][0]> } }
  | { type: 'REMOVE_LANGUAGE'; payload: string }
  | { type: 'ADD_PROJECT' }
  | { type: 'UPDATE_PROJECT'; payload: { id: string; data: Partial<Resume['projects'][0]> } }
  | { type: 'REMOVE_PROJECT'; payload: string }
  | { type: 'ADD_CERTIFICATION' }
  | { type: 'UPDATE_CERTIFICATION'; payload: { id: string; data: Partial<Resume['certifications'][0]> } }
  | { type: 'REMOVE_CERTIFICATION'; payload: string }
  | { type: 'ADD_REFERENCE' }
  | { type: 'UPDATE_REFERENCE'; payload: { id: string; data: Partial<Resume['references'][0]> } }
  | { type: 'REMOVE_REFERENCE'; payload: string }
  | { type: 'TOGGLE_SECTION_VISIBILITY'; payload: string }
  | { type: 'UPDATE_TEMPLATE'; payload: string }
  | { type: 'REORDER_SECTION'; payload: { source: number; destination: number } }
  | { type: 'LOAD_RESUME'; payload: Resume }
  | { type: 'SET_ERRORS'; payload: ValidationError[] }
  | { type: 'CLEAR_ERRORS' };

const initialState: Resume = {
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    profilePicture: '',
    summary: '',
    githubUrl: '',
    linkedinUrl: '',
    portfolioUrl: ''
  },
  workExperience: [],
  education: [],
  skills: [],
  languages: [],
  projects: [],
  references: [],
  certifications: [],
  visibleSections: ['personalInfo', 'workExperience', 'education', 'skills', 'languages', 'projects', 'references', 'certifications'],
  selectedTemplate: 'modern'
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

type State = Resume & { errors: ValidationError[] };

function resumeReducer(state: State, action: ResumeAction): State {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload }
      };
    case 'ADD_WORK_EXPERIENCE':
      return {
        ...state,
        workExperience: [...state.workExperience, {
          id: uuidv4(),
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        }]
      };
    case 'ADD_EDUCATION':
      return {
        ...state,
        education: [...state.education, {
          id: uuidv4(),
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          current: false,
          gpa: undefined
        }]
      };
    case 'ADD_SKILL':
      return {
        ...state,
        skills: [...state.skills, {
          id: uuidv4(),
          name: '',
          level: 1,
          category: 'technical'
        }]
      };
    case 'ADD_CERTIFICATION':
      return {
        ...state,
        certifications: [...state.certifications, {
          id: uuidv4(),
          name: '',
          issuer: '',
          issueDate: '',
          expiryDate: undefined,
          credentialUrl: undefined
        }]
      };
    case 'ADD_LANGUAGE':
      return {
        ...state,
        languages: [...state.languages, {
          id: uuidv4(),
          name: '',
          level: ''
        }]
      };
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, {
          id: uuidv4(),
          name: '',
          description: '',
          technologies: [],
          link: '',
          githubUrl: ''
        }]
      };
    case 'ADD_REFERENCE':
      return {
        ...state,
        references: [...state.references, {
          id: uuidv4(),
          name: '',
          position: '',
          company: '',
          email: '',
          phone: ''
        }]
      };
    case 'UPDATE_WORK_EXPERIENCE':
      return {
        ...state,
        workExperience: state.workExperience.map(exp =>
          exp.id === action.payload.id ? { ...exp, ...action.payload.data } : exp
        )
      };
    case 'REMOVE_WORK_EXPERIENCE':
      return {
        ...state,
        workExperience: state.workExperience.filter(exp => exp.id !== action.payload)
      };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map(edu =>
          edu.id === action.payload.id ? { ...edu, ...action.payload.data } : edu
        )
      };
    case 'REMOVE_EDUCATION':
      return {
        ...state,
        education: state.education.filter(edu => edu.id !== action.payload)
      };
    case 'UPDATE_SKILL':
      return {
        ...state,
        skills: state.skills.map(skill =>
          skill.id === action.payload.id ? { ...skill, ...action.payload.data } : skill
        )
      };
    case 'REMOVE_SKILL':
      return {
        ...state,
        skills: state.skills.filter(skill => skill.id !== action.payload)
      };
    case 'UPDATE_LANGUAGE':
      return {
        ...state,
        languages: state.languages.map(lang =>
          lang.id === action.payload.id ? { ...lang, ...action.payload.data } : lang
        )
      };
    case 'REMOVE_LANGUAGE':
      return {
        ...state,
        languages: state.languages.filter(lang => lang.id !== action.payload)
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(proj =>
          proj.id === action.payload.id ? { ...proj, ...action.payload.data } : proj
        )
      };
    case 'REMOVE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(proj => proj.id !== action.payload)
      };
    case 'UPDATE_REFERENCE':
      return {
        ...state,
        references: state.references.map(ref =>
          ref.id === action.payload.id ? { ...ref, ...action.payload.data } : ref
        )
      };
    case 'REMOVE_REFERENCE':
      return {
        ...state,
        references: state.references.filter(ref => ref.id !== action.payload)
      };
    case 'UPDATE_CERTIFICATION':
      return {
        ...state,
        certifications: (state.certifications || []).map(cert =>
          cert.id === action.payload.id ? { ...cert, ...action.payload.data } : cert
        )
      };
    case 'REMOVE_CERTIFICATION':
      return {
        ...state,
        certifications: (state.certifications || []).filter(cert => cert.id !== action.payload)
      };
    case 'TOGGLE_SECTION_VISIBILITY':
      return {
        ...state,
        visibleSections: state.visibleSections.includes(action.payload)
          ? state.visibleSections.filter(section => section !== action.payload)
          : [...state.visibleSections, action.payload]
      };
    case 'UPDATE_TEMPLATE':
      return {
        ...state,
        selectedTemplate: action.payload
      };
    case 'REORDER_SECTION':
      const sections = [...state.visibleSections];
      const [removed] = sections.splice(action.payload.source, 1);
      sections.splice(action.payload.destination, 0, removed);
      return {
        ...state,
        visibleSections: sections
      };
    case 'LOAD_RESUME':
      return {
        ...action.payload,
        errors: []
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: []
      };
    default:
      return state;
  }
}

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, { ...initialState, errors: [] });

  useEffect(() => {
    const savedState = localStorage.getItem('resumeState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        const validatedData = ResumeSchema.parse(parsedState);
        dispatch({ type: 'LOAD_RESUME', payload: validatedData });
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errors = error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }));
          dispatch({ type: 'SET_ERRORS', payload: errors });
        }
        console.error('Error loading saved state:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('resumeState', JSON.stringify(state));
  }, [state]);

  const saveResume = () => {
    try {
      const validatedData = ResumeSchema.parse(state);
      const jsonData = JSON.stringify(validatedData, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const date = new Date().toISOString().split('T')[0];
      const filename = `my-resume-${date}.json`;
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));
        dispatch({ type: 'SET_ERRORS', payload: errors });
      }
      console.error('Error saving resume:', error);
    }
  };

  const loadResume = async (file: File) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      const validatedData = ResumeSchema.parse(data);
      dispatch({ type: 'LOAD_RESUME', payload: validatedData });
      dispatch({ type: 'CLEAR_ERRORS' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));
        dispatch({ type: 'SET_ERRORS', payload: errors });
      } else {
        dispatch({ type: 'SET_ERRORS', payload: [{
          field: 'file',
          message: 'Invalid JSON format'
        }]});
      }
      console.error('Error loading resume:', error);
    }
  };

  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  return (
    <ResumeContext.Provider value={{ 
      state, 
      dispatch, 
      saveResume, 
      loadResume,
      errors: state.errors,
      clearErrors
    }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}