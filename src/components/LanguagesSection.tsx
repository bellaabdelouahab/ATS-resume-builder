import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const PROFICIENCY_LEVELS = [
  'Elementary',
  'Limited Working',
  'Professional Working',
  'Full Professional',
  'Native/Bilingual'
];

export default function LanguagesSection() {
  const { state, dispatch } = useResume();
  const { languages } = state;

  const handleAdd = () => {
    dispatch({ type: 'ADD_LANGUAGE' });
  };

  const handleChange = (id: string, field: string, value: string) => {
    dispatch({
      type: 'UPDATE_LANGUAGE',
      payload: { id, data: { [field]: value } }
    });
  };

  const handleRemove = (id: string) => {
    dispatch({ type: 'REMOVE_LANGUAGE', payload: id });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Languages</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Language
        </button>
      </div>

      {languages.map((language) => (
        <div key={language.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => handleRemove(language.id)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <input
                type="text"
                value={language.name}
                onChange={(e) => handleChange(language.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., English, Spanish"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Proficiency Level
              </label>
              <select
                value={language.level}
                onChange={(e) => handleChange(language.id, 'level', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select level</option>
                {PROFICIENCY_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}