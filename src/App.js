import React, { useState } from 'react';

function App() {
  const [img, setImg] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleClick = () => {
    const formdata = new FormData();
    formdata.append("image", img);

    fetch("http://localhost:8080/single", {
      method: "POST",
      body: formdata
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.imageUrl) {
          setImageUrl(data.imageUrl); // Set the image URL to display
          console.log(data.msg);
        } else {
          console.error(data.error);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <input onChange={(e) => setImg(e.target.files[0])} type="file" />
      <br />
      <button onClick={handleClick}>Submit</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ marginTop: '20px', maxWidth: '300px' }} />}
    </div>
  );
}

export default App;
