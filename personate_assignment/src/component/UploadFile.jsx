import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import AWS from "aws-sdk";
import ProgressBar from "@ramonak/react-progress-bar";
import {RiUploadCloudLine } from "react-icons/ri"
// Get the S3 bucket name and AWS credentials from environment variables
const S3_BUCKET = process.env.REACT_APP_AWS_BUCKET_NAME;
const ACCESS_KEY = process.env.REACT_APP_AWS_ACCESS_KEY;
const SECRET_KEY = process.env.REACT_APP_AWS_SECRET_KEY;
const REGION = "ap-south-1";

// Configure AWS SDK with the credentials
AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  signatureVersion: "v4",
});

// Create a new instance of the S3 service
const s3 = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const UploadFile = () => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  // Use the useDropzone hook to handle file drop and selection
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: { "video/mp4": [] },
    multiple: false,
    onDrop: (acceptedFiles, rejectedFiles, event) => {
      event.preventDefault();
      if (rejectedFiles.length) {
        return;
      }
      setSelectedFile(acceptedFiles[0]);
    },
  });

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        alert("Please drag and drop video")
        return 
      }

      // Set the parameters for the file upload to S3
      const params = {
        Body: selectedFile,
        Bucket: S3_BUCKET,
        Key: selectedFile.name,
      };

      // Upload the file to S3 and track progress with a callback function
      s3.putObject(params)
        .on("httpUploadProgress", (evt) => {
          setProgress(Math.round((evt.loaded / evt.total) * 100));
        })
        .send((err) => {
          if (err) {
            console.log("Error uploading file", err);
            alert("Network error");
          }
        });
    } catch (error) {
      console.log("Upload error", error);
    }
  };


  return (
    <section className="flex flex-col items-center justify-center mt-10 rounded-lg bg-white shadow-customShadow p-[1rem]">
      <header className="text-2xl font-bold mb-4 w-[35%] bg-blue-500 text-white rounded-lg shadow-customShadow p-2">
       Upload MP4 Video to S3
      </header>
      <div
        {...getRootProps({
          className: `cursor-pointer text-2xl flex flex-col items-center justify-center w-[100%] h-60 border-4 border-dashed rounded-lg transition-all  ${
            isDragAccept ? "border-green-500" : "border-gray-400"
          }`,
        })}
      >
        <input {...getInputProps()} />
        {isDragAccept && (
          <p className="text-green-500 font-bold text-lg">
            Drop it like it's hot 🔥
          </p>
        )}
        {isDragReject && (
          <p className="text-red-500 font-bold text-lg">
            Nope, not that file type 👎
          </p>
        )}
        {
          !isFocused?(<p className="text-gray-500 font-medium text-lg">
          Drag 'n' drop a video file here, or click to select a file
        </p>): (<p className="text-gray-500 font-medium text-lg">
           Click to Drop it like it's hot 🔥
          </p>)
        }
      </div>
      {selectedFile && progress === 0 && (
        <div className="mt-5">
          <p className="text-gray-500 font-medium text-lg">
            File {selectedFile.name} selected for upload
          </p>
        </div>
      )}

      <div className="mt-5 w-[50%]">
        {progress !== 0 && (
          <div className="w-[100%]">
            <p className="text-gray-500 font-medium text-lg overflow-hidden">
               {progress!==100? `File ${selectedFile.name} is uploading...`:" Congratulation uploaded successfully🎉"} 
            </p>
            <div className="mt-2">
            <ProgressBar
                completed={progress}
                label={`${progress}% completed`}
                bgColor="#19a7ce"
              />
            </div>
          </div>
        )}
         <div className="flex justify-center mt-4">
          
      <button
        className="bg-gradient-to-r from-blue-500 to-sky-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline flex items-center justify-center space-x-2"
        onClick={handleUpload}
      >
        <RiUploadCloudLine fontSize="1.5rem" /><span>Upload video</span>
      </button>
    </div>
      </div>
    </section>
  );
};

export default UploadFile
