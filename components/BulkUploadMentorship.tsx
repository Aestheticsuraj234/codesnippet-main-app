"use client"

import React, { useState } from 'react'
import { Upload, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { uploadMeetingFile } from '@/action/mentorship/bulkuploadMethod'


export default function MentorshipBulkUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0])
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!file) {
      setUploadStatus("Please select a file.")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    try {
      setUploadStatus("Uploading...")
      const response = await uploadMeetingFile(formData)

      if (response.message !== "File uploaded and processed successfully") {
        throw new Error("File upload failed")
      }

      setUploadStatus("Upload successful!")
    } catch (error) {
        // @ts-ignore
      setUploadStatus(`Error: ${error.message}`)
    }
  }

  const closeDialog = () => {
    setIsOpen(false)
    setFile(null)
    setUploadStatus(null)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mentorship Programs</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Bulk Upload
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Bulk Upload Mentorship Programs</DialogTitle>
              <DialogDescription>
                Upload a JSON file containing mentorship program details.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="file"
                accept=".json"
                onChange={handleFileChange}
              />
              {file && (
                <div className="flex items-center justify-between bg-muted p-2 rounded-md">
                  <span className="text-sm truncate">{file.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <DialogFooter>
                <Button type="submit" disabled={!file || uploadStatus === "Uploading..."}>
                  Upload File
                </Button>
              </DialogFooter>
            </form>
            {uploadStatus && (
              <div className={`mt-4 p-2 rounded-md ${
                uploadStatus.startsWith("Error") ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
              }`}>
                {uploadStatus}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      {/* Your main content for displaying mentorship programs goes here */}
      <div className="bg-muted p-4 rounded-lg">
        <p className="text-center text-muted-foreground">Your mentorship programs will be displayed here.</p>
      </div>
    </div>
  )
}