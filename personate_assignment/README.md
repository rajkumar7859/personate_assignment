#### Simple React App for Uploading MP4 Files to AWS S3
- This is a simple React app that allows users to upload MP4 files to an AWS S3 bucket using a drag-and-drop file drop zone. The app also displays a progress bar during the upload process and shows the uploaded video in a video element once the upload is complete.

##### Access the App Hosted on AWS S3 ,Visit the following URL to access the app hosted on AWS S3:

### http://dragandropweb.s3-website.ap-south-1.amazonaws.com/

- This URL will take you to the React app that you have built, where you can drag and drop or browse for an mp4 file to upload to your AWS S3 bucket. The app will display a progress bar during the upload process, and once the upload is complete, the video file will be displayed in a video element above the drop zone.

#### Image 
 documentation![Screenshot (89)](https://user-images.githubusercontent.com/103853109/228762778-6f91cc31-08e0-4e8b-9579-51caa500fa35.png)

##### Prerequisites
Before starting, you will need the following:
An AWS account and an S3 bucket set up.
Setup
Clone this repository to your local machine:
bash
- git clone https://github.com/rajkumar7859/personate_assignment/tree/master/personate_assignment
Navigate to the project directory:
bash
cd personate_assignment
Install the dependencies:
- npm install
Create a .env file in the root directory and add your AWS access key ID, secret access key, and bucket name:
makefile
- REACT_APP_AWS_ACCESS_KEY_ID=<your-access-key-id>
- REACT_APP_AWS_SECRET_ACCESS_KEY=<your-secret-access-key>
- REACT_APP_AWS_BUCKET_NAME=<your-bucket-name>

- Note: It's recommended to use an IAM user with only S3 permissions and not include your AWS credentials directly in the .env file. You can also use the pre-signed URL mechanism for better security.

###### Usage
To start the app, run:
- npm start

This will start the development server and open the app in your browser at http://localhost:3000.

To upload a file, simply drag and drop an MP4 file onto the drop zone or click the drop zone to browse for a file.

Once the upload is complete, the video will be displayed in a video element above the drop zone.

- Note that the AWS S3 bucket and pre-signed URL mechanism used in this app can be created by creating a free AWS account and following the necessary steps. This app requires close to no intervention of backend.

#### Technologies Used
- React
- AWS SDK for JavaScript v3
- react-dropzone
- react-progress-bar.js

#### References
- AWS SDK for JavaScript v3 documentation
- react-dropzone documentation
- react-progress-bar.js
