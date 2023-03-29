import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import AWS from "aws-sdk";
import ProgressBar from "@ramonak/react-progress-bar";

const S3_BUCKET =process.env.REACT_APP_AWS_BUCKET_NAME;
const REGION = "ap-south-1";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  signatureVersion: "v4",
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const UploadFile = () => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
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
        return;
      }
      const params = {
        Body: selectedFile,
        Bucket: S3_BUCKET,
        Key: selectedFile.name,
      };
      myBucket
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          setProgress(Math.round((evt.loaded / evt.total) * 100));
        })
        .send((err) => {
          if (err) console.log("error", err);
        });
    } catch (error) {
      console.log("Upload error " ,error);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center mt-10">
      <div
        {...getRootProps({
          className: `cursor-pointer flex flex-col items-center justify-center w-80 h-80 border-4 border-dashed rounded-lg transition-all ${
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

      <div className="mt-5">
        {progress !== 0 && (
          <div className="w-80">
            <p className="text-gray-500 font-medium text-lg">
               {progress!==100? `File {selectedFile.name} is uploading...`:"Uploading completed"} 
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleUpload}
          >
            Upload video
          </button>
        </div>
      </div>
    </section>
  );
};

export default UploadFile;
