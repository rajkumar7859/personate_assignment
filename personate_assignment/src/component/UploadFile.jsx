import React, { useEffect,useState } from "react";
import { useDropzone } from "react-dropzone";
import AWS from "aws-sdk";
import ProgressBar from "@ramonak/react-progress-bar";

const S3_BUCKET ='personateaiassign';
const REGION ='ap-south-1';


AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  signatureVersion: "v4",
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const UploadFile=()=>{
  // const [uploadProgress, setUploadProgress] = useState(0);
  const [progress , setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
    const {
      getRootProps,
      getInputProps,
      isFocused,
      isDragAccept,
      isDragReject,
      acceptedFiles,
    } = useDropzone({ accept: { "video/mp4": [] }, multiple: false });
  
    useEffect(() => {
      if (!acceptedFiles.length) return;
      setSelectedFile(acceptedFiles[0]);
    }, [acceptedFiles]);
    
    const handleUpload = async () => {
      if (!selectedFile) {
        return;
      }
      const params = {
        Body: selectedFile,
        Bucket: S3_BUCKET,
        Key: selectedFile.name
      };
myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100))
        })
        .send((err) => {
            if (err) console.log("errpr",err)
        })

      }

  return (
    <section className="">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <h1>You can upload video here</h1>
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {selectedFile && progress === 0 && (
        <div className="">
          <p>File {selectedFile.name} selected for upload</p>
        </div>
      )}
      <div style={{ marginTop: "10px" }}>
        {progress !== 0 && (
          <div className="" role="">
            <p>File {selectedFile.name} is uploading...</p>
            <div className="mt-2">
            <ProgressBar
                completed={progress}
                label={`${progress}% completed`}
                bgColor="#19a7ce"
              />
              ;
            </div>
          </div>
        )}
        <div className="">
          <div className="">
            <button className="" onClick={handleUpload}>
              Upload video
            </button>
          </div>
        </div>
      </div> 
    </section>
  );
      }

export default UploadFile