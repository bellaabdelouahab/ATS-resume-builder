import React from 'react';
import { ResumeProvider } from './context/ResumeContext';
import PersonalInfoSection from './components/PersonalInfoSection';
import WorkExperienceSection from './components/WorkExperienceSection';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';
import LanguagesSection from './components/LanguagesSection';
import ProjectsSection from './components/ProjectsSection';
import ReferencesSection from './components/ReferencesSection';
import CertificationsSection from './components/CertificationsSection';
import ResumePreview from './components/ResumePreview';

function App() {
  return (
    <ResumeProvider>
      <div className="min-h-screen bg-gray-100" >
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            IT Resume Builder
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Editor Section */}
            <div className="space-y-6 h-screen overflow-y-auto">
              <PersonalInfoSection />
              <WorkExperienceSection />
              <EducationSection />
              <CertificationsSection />
              <SkillsSection />
              <ProjectsSection />
              <LanguagesSection />
              <ReferencesSection />
            </div>

            {/* Preview Section */}
            <div>
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>
    </ResumeProvider>
  );
}

export default App;