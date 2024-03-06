import React from 'react';

const DeleteConfirmationModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 w-96 shadow-lg rounded-md">
        <p className="text-lg font-semibold mb-4">Are you sure you want to delete?</p>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded mr-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-blue"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;