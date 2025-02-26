import { z } from 'zod';

export const PersonalInfoSchema = z.object({
  fullName: z.string(),
  title: z.string(),
  email: z.string(),
  phone: z.string(),
  location: z.string(),
  profilePicture: z.string().optional(),
  summary: z.string(),
  githubUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  portfolioUrl: z.string().optional()
});

export const WorkExperienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  startDate: z.string(),
  endDate: z.string(),
  current: z.boolean(),
  description: z.string()
});

export const EducationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Institution name is required"),
  degree: z.string(),
  field: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  current: z.boolean(),
  gpa: z.number().min(0).max(4).optional()
});

export const SkillSchema = z.object({
  id: z.string(),
  name: z.string(),
  level: z.number().min(1).max(5),
  category: z.enum(['technical', 'soft']).default('technical')
});

export const LanguageSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Language name is required"),
  level: z.string()
});

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Project name is required"),
  description: z.string(),
  technologies: z.array(z.string()),
  link: z.string().url().optional(),
  githubUrl: z.string().url().optional()
});

export const ReferenceSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Reference name is required"),
  position: z.string(),
  company: z.string(),
  email: z.string().email("Invalid email address"),
  phone: z.string()
});

export const CertificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Certification name is required"),
  issuer: z.string(),
  issueDate: z.string(),
  expiryDate: z.string().optional(),
  credentialUrl: z.string().url().optional()
});

export const ResumeSchema = z.object({
  personalInfo: PersonalInfoSchema,
  workExperience: z.array(WorkExperienceSchema),
  education: z.array(EducationSchema),
  skills: z.array(SkillSchema),
  languages: z.array(LanguageSchema),
  projects: z.array(ProjectSchema),
  references: z.array(ReferenceSchema),
  certifications: z.array(CertificationSchema),
  visibleSections: z.array(z.string()),
  selectedTemplate: z.string()
});

export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;
export type WorkExperience = z.infer<typeof WorkExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type Language = z.infer<typeof LanguageSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Reference = z.infer<typeof ReferenceSchema>;
export type Certification = z.infer<typeof CertificationSchema>;
export type Resume = z.infer<typeof ResumeSchema>;