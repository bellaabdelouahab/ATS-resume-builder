import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Plus, Trash2, Star } from 'lucide-react';

export default function SkillsSection() {
  const { state, dispatch } = useResume();
  const { skills } = state;

  const handleAdd = () => {
    dispatch({ type: 'ADD_SKILL' });
  };

  const handleChange = (id: string, field: string, value: string | number) => {
    dispatch({
      type: 'UPDATE_SKILL',
      payload: { id, data: { [field]: value } }
    });
  };

  const handleRemove = (id: string) => {
    dispatch({ type: 'REMOVE_SKILL', payload: id });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      {skills.map((skill) => (
        <div key={skill.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => handleRemove(skill.id)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Skill Name
              </label>
              <input
                type="text"
                value={skill.name}
                onChange={(e) => handleChange(skill.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., JavaScript, Project Management"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Proficiency Level
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => handleChange(skill.id, 'level', level)}
                    className={`p-1 rounded-full ${
                      skill.level >= level ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    <Star className="w-6 h-6" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}