import React, { useState } from "react";

function App() {
  const [srcfile, setsrcfile] = useState("");

  function onFileUpload(event) {
    event.preventDefault();
    let file = event.target.files[0];
    setsrcfile(URL.createObjectURL(file));
  }

  function SendFile() {
    console.log({ srcfile });
  }

  return (
    <div className="main">
      <div className="container">
        <h1>동영상 제출</h1>
        <form action="Upload_Session">
          <input
            id="file"
            type="file"
            accept="video/mp4,video/mkv, video/x-m4v,video/*"
            onChange={(e) => {
              onFileUpload(e);
            }}
          />
          <div>
            <video src={srcfile} controls width="80%" />
          </div>
          <input type="submit" value="제출" />
        </form>
      </div>
    </div>
  );
}

export default App;
