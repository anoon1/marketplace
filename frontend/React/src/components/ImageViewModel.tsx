import React from 'react';

const ImageView = ({ fileUrl, onClose }) => {
  const isPDF = fileUrl.toLowerCase().endsWith('.pdf');

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
      <div className="max-w-[95%] max-h-[95%] bg-opacity-50 p-8 rounded-md ">
        <div className="relative top-10 pr-[10px] text-right">
          <button
            onClick={onClose}
            className="relative top-0 right-0 cursor-pointer text-gray-500 hover:text-black"
          >
            {/* You can use an SVG or any other element for the close icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {isPDF ? (
          <embed src={fileUrl} type="application/pdf" width="100%" height="100%" />
        ) : (
          <img src={fileUrl} alt="Selected File" style={{ width: '100%', height: 'auto' }} />
        )}
      </div>
    </div>
  );
};

export default ImageView;
