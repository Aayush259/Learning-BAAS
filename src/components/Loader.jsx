import React from 'react';

export default function Loader() {
  return (
    <div className="absolute top-0 left-0 flex justify-center items-center h-screen w-screen bg-black bg-opacity-25">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white" />
    </div>
  );
};
