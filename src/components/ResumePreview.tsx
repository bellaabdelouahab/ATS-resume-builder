import React, { useEffect, useState } from "react";
import { useResume } from "../context/ResumeContext";
// @ts-ignore
import html2pdf from "html2pdf.js";
import { Download, Upload, AlertCircle, Eye } from "lucide-react";

const Section = ({ title, condition, children, grid }: any) =>
  condition && (
    <section className="mb-4">
      <h2 className="text-sm font-bold border-b border-gray-300 mb-2 pb-1">
        {title}
      </h2>
      <div className={grid ? "grid grid-cols-2 gap-2" : ""}>{children}</div>
    </section>
  );

const Entry = ({ title, subtitle, dates, description }: any) => (
  <div className="mb-3">
    <div className="flex justify-between items-baseline">
      <h3 className="font-bold text-sm">{title}</h3>
      {dates && <span className="text-xs text-gray-600">{dates}</span>}
    </div>
    {subtitle && <p className="text-xs text-gray-600 mb-1">{subtitle}</p>}
    {description && <p className="text-xs text-gray-700">{description}</p>}
  </div>
);

export default function ResumePreview() {
  const { state, saveResume, loadResume, errors } = useResume();
  const {
    personalInfo,
    workExperience,
    education,
    skills,
    languages,
    projects,
    references,
    certifications,
  } = state;

  const [isTooLarge, setIsTooLarge] = useState(false);

  useEffect(() => {
    const element = document.getElementById("resume-preview");
    if (element) {
      setIsTooLarge(element.scrollHeight > element.clientHeight);
    }
  }, [state]);

  const handleDownload = () => {
    const element = document.getElementById("resume-preview-content");
    html2pdf()
      .set({
        margin: [0.2, 0.2],
        filename: `${personalInfo.fullName.replace(/\s+/g, "_")}_resume.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .from(element)  
      .save();
  };

  const handleViewPDF = () => {
    const element = document.getElementById("resume-preview-content");
    html2pdf()
      .set({
        margin: [0.2, 0.2],
        filename: `${personalInfo.fullName.replace(/\s+/g, "_")}_resume.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .from(element)
      .outputPdf('dataurlnewwindow');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files?.[0] && loadResume(e.target.files[0]);
  };

  return (
    <div className="relative">
      {errors.length > 0 && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md shadow-lg">
          <div className="flex items-center mb-2">
            <AlertCircle className="w-5 h-5 mr-2" />
            <strong className="font-bold">Validation Errors</strong>
          </div>
          <ul className="list-disc list-inside">
            {errors.map((error, i) => (
              <li key={i} className="text-sm">
                {error.field}: {error.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {isTooLarge && (
        <div className="fixed top-4 left-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded max-w-md shadow-lg">
          <div className="flex items-center mb-2">
            <AlertCircle className="w-5 h-5 mr-2" />
            <strong className="font-bold">Warning</strong>
          </div>
          <p className="text-sm">
            The resume content is too large for one page.
          </p>
        </div>
      )}

      <div className="fixed bottom-4 right-4 flex gap-2">
        <label className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors shadow-lg cursor-pointer">
          <Upload className="w-4 h-4" /> Load Resume
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
        <button
          onClick={saveResume}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors shadow-lg"
        >
          <Download className="w-4 h-4" /> Save Resume
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-lg"
        >
          <Download className="w-4 h-4" /> Download PDF
        </button>
        <button
          onClick={handleViewPDF}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors shadow-lg"
        >
          <Eye className="w-4 h-4" /> View PDF
        </button>
      </div>

      <div
        id="resume-preview"
        className="max-w-[8.5in] mx-auto bg-white shadow-lg p-4"
        style={{
          font: "15pt 'Times New Roman', serif",
          color: "#333",
          transform: "scale(0.75)",
          transformOrigin: "top left",
        }}
      >
        <div id="resume-preview-content">
          <header className="text-center mb-4">
            {personalInfo.profilePicture && (
              <img
                src={personalInfo.profilePicture}
                alt={personalInfo.fullName}
                className="w-20 h-20 rounded-full mx-auto mb-2"
                onError={(e) => (e.currentTarget.style.display = "none")}
                onLoad={(e) => {
                  const img = new Image();
                  if (personalInfo.profilePicture) {
                    img.src = personalInfo.profilePicture;
                  }
                  img.onerror = () => (e.currentTarget.style.display = "none");
                }}
              />
            )}
            <h1 className="text-2xl font-bold mb-1">{personalInfo.fullName}</h1>
            <h2 className="text-lg mb-2">{personalInfo.title}</h2>
            <div className="text-xs text-gray-600 space-y-1">
              <p>
                {[
                  personalInfo.email,
                  personalInfo.phone,
                  personalInfo.location,
                ].join(" | ")}
              </p>
              <div className="flex justify-center gap-2">
                {personalInfo.githubUrl && (
                  <span>GitHub: {personalInfo.githubUrl}</span>
                )}
                {personalInfo.linkedinUrl && (
                  <span>LinkedIn: {personalInfo.linkedinUrl}</span>
                )}
              </div>
            </div>
          </header>

          {personalInfo.summary && (
            <Section
              title="PROFESSIONAL SUMMARY"
              condition={!!personalInfo.summary}
            >
              <p className="text-xs text-gray-700">{personalInfo.summary}</p>
            </Section>
          )}

          <Section
            title="WORK EXPERIENCE"
            condition={!!(workExperience && workExperience.length)}
          >
            {workExperience.map((exp: any) => (
              <Entry
                key={exp.id}
                title={exp.position}
                subtitle={exp.company}
                dates={`${exp.startDate} - ${
                  exp.current ? "Present" : exp.endDate
                }`}
                description={exp.description}
              />
            ))}
          </Section>

          <Section
            title="EDUCATION"
            condition={!!(education && education.length)}
          >
            {education.map((edu: any) => (
              <Entry
                key={edu.id}
                title={`${edu.degree} in ${edu.field}`}
                subtitle={edu.institution}
                dates={`${edu.startDate} - ${
                  edu.current ? "Present" : edu.endDate
                }`}
              />
            ))}
          </Section>

          <Section
            title="CERTIFICATIONS"
            condition={!!(certifications && certifications.length)}
            grid
          >
            {certifications.map((c: any) => (
              <div key={c.id} className="mb-2">
                <h3 className="font-bold text-xs">
                  {c.credentialUrl ? (
                    <a href={c.credentialUrl} className="text-blue-500">
                      {c.name}
                    </a>
                  ) : (
                    c.name
                  )}
                </h3>
                <p className="text-xs text-gray-600">
                  {c.issuer} • {c.issueDate}
                </p>
              </div>
            ))}
          </Section>

          <Section
            title="TECHNICAL SKILLS"
            condition={!!(skills && skills.length)}
            grid
          >
            {skills.map((s: any) => (
              <div key={s.id} className="text-xs">
                • {s.name} – {s.level || "Proficiency"}
                {/* Replace "Proficiency" with an appropriate descriptor or years of experience */}
              </div>
            ))}
          </Section>

          <Section
            title="PROJECTS"
            condition={!!(projects && projects.length)}
            grid
          >
            {projects.map((p: any) => (
              <div key={p.id} className="mb-3 col-span-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-xs">
                    {p.link ? (
                      <a href={p.link} className="text-blue-500">
                        {p.name}
                      </a>
                    ) : (
                      p.name
                    )}
                  </h3>
                </div>
                <p className="text-xs text-gray-700 mb-1">{p.description}</p>
                <div className="flex flex-wrap gap-1">
                  {p.technologies.map((t: string, i: number) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 bg-gray-100 text-xs rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </Section>

          <Section
            title="LANGUAGES"
            condition={!!(languages && languages.length)}
            grid
          >
            <div className="grid grid-cols-3 gap-2">
              {languages.map((l: any) => (
                <div key={l.id} className="flex justify-between text-xs">
                  <span>{l.name}</span>
                  <span className="text-gray-600">{l.level}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section
            title="REFERENCES"
            condition={!!(references && references.length)}
          >
            {references.map((r: any) => (
              <div key={r.id} className="border p-2 rounded text-xs mb-2">
                <h3 className="font-bold">{r.name}</h3>
                <p>
                  {r.position} at {r.company}
                </p>
                <p>
                  {r.email} • {r.phone}
                </p>
              </div>
            ))}
          </Section>
        </div>
      </div>
    </div>
  );
}

