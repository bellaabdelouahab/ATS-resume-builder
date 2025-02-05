import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Plus, Trash2, Award } from 'lucide-react';

export default function CertificationsSection() {
  const { state, dispatch } = useResume();
  const { certifications = [] } = state;

  const handleAdd = () => {
    dispatch({ type: 'ADD_CERTIFICATION' });
  };

  const handleChange = (id: string, field: string, value: string) => {
    dispatch({
      type: 'UPDATE_CERTIFICATION',
      payload: { id, data: { [field]: value } }
    });
  };

  const handleRemove = (id: string) => {
    dispatch({ type: 'REMOVE_CERTIFICATION', payload: id });
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-2xl font-bold text-gray-800">Technical Certifications</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Certification
        </button>
      </div>

      {certifications.map((cert) => (
        <div key={cert.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <Award className="w-6 h-6 text-blue-500" />
            <button
              onClick={() => handleRemove(cert.id)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Certification Name
              </label>
              <input
                type="text"
                value={cert.name}
                onChange={(e) => handleChange(cert.id, 'name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                placeholder="AWS Solutions Architect"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Issuing Organization
              </label>
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) => handleChange(cert.id, 'issuer', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                placeholder="Amazon Web Services"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Issue Date
              </label>
              <input
                type="date"
                value={cert.issueDate}
                onChange={(e) => handleChange(cert.id, 'issueDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="date"
                value={cert.expiryDate}
                onChange={(e) => handleChange(cert.id, 'expiryDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
            </div>

            <div className="space-y-2 col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Credential URL
              </label>
              <input
                type="url"
                value={cert.credentialUrl}
                onChange={(e) => handleChange(cert.id, 'credentialUrl', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                placeholder="https://verify.certification.com/id"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}