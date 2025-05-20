"use client";

import { useState, FormEvent } from 'react';

interface FormProps {
  nameLabel: string;
  emailLabel: string;
  onSubmit: (data: { name: string; email: string }) => void;
  onClose: () => void;
}

export default function Form({ nameLabel, emailLabel, onSubmit, onClose }: FormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    onSubmit({ name, email });
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl z-30 w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="form-name" className="block text-sm font-medium text-gray-700 mb-1">
            {nameLabel}
          </label>
          <input
            type="text"
            id="form-name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label htmlFor="form-email" className="block text-sm font-medium text-gray-700 mb-1">
            {emailLabel}
          </label>
          <input
            type="email"
            id="form-email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-black bg-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}