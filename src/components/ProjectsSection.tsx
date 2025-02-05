import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Plus, Trash2, X } from 'lucide-react';

export default function ProjectsSection() {
  const { state, dispatch } = useResume();
  const { projects } = state;

  const handleAdd = () => {
    dispatch({ type: 'ADD_PROJECT' });
  };

  const handleChange = (id: string, field: string, value: string | string[]) => {
    dispatch({
      type: 'UPDATE_PROJECT',
      payload: { id, data: { [field]: value } }
    });
  };

  const handleRemove = (id: string) => {
    dispatch({ type: 'REMOVE_PROJECT', payload: id });
  };

  const handleAddTechnology = (id: string, technology: string) => {
    const project = projects.find(p => p.id === id);
    if (project && technology.trim()) {
      handleChange(id, 'technologies', [...project.technologies, technology.trim()]);
    }
  };

  const handleRemoveTechnology = (id: string, index: number) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      const newTechnologies = [...project.technologies];
      newTechnologies.splice(index, 1);
      handleChange(id, 'technologies', newTechnologies);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {projects.map((project) => (
        <div key={project.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => handleRemove(project.id)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Project Name
              </label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => handleChange(project.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Project name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={project.description}
                onChange={(e) => handleChange(project.id, 'description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your project..."
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Project URL
              </label>
              <input
                type="url"
                value={project.link || ''}
                onChange={(e) => handleChange(project.id, 'link', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Technologies Used
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tech}
                    <button
                      onClick={() => handleRemoveTechnology(project.id, index)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add technology and press Enter"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTechnology(project.id, (e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}