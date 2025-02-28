"use client";
import React, { useState } from 'react';
import { Header } from '@/components/Global/header';
import { uploadCourseFile } from '@/action/live-course/bulkUploadMethod';


const BulkUploadCourses = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setUploadStatus("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadStatus("Uploading...");
      const response = await uploadCourseFile(formData);

      if (response.message !== "File uploaded and processed successfully") {
        throw new Error("File upload failed");
      }

      setUploadStatus("Upload successful!");
    } catch (error) {
      setUploadStatus(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <main className="px-4 py-4 flex flex-col">
      <Header
        title="Courses"
        description="Bulk Upload Courses"
      />

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-8">
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="border border-gray-300 rounded p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Upload File
        </button>
        {uploadStatus && (
          <p className="mt-4">{uploadStatus}</p>
        )}
      </form>
    </main>
  );
};

export default BulkUploadCourses;
