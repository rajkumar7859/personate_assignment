import './App.css';
import { useState } from 'react';
import UploadFile from './component/UploadFile';


function App() {

  const [videoUrl, setVideoUrl] = useState('');

  const handleVideoLoad = (event) => {
    setVideoUrl(URL.createObjectURL(event.target.srcElement));
  };

  const handleVideoEnded=()=>{
    
  }

  return (
    <div className="App">
       <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload MP4 Video to S3</h1>
      {!videoUrl && <UploadFile />}
 {videoUrl && (
        <video src={videoUrl} 
controls onEnded={handleVideoEnded} onLoadedMetadata={handleVideoLoad} />
)}
</div>
    </div>
  );
}

export default App;
