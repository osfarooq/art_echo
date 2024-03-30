import "./shareToGallery.scss";

import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const ShareToGallery = (event) => {
  const [file, setFile] = useState(null);
  //const [desc, setDesc] = useState(null);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file); // Ensure you're appending the correct field name
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  
  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newArtwork) => {
      return makeRequest.post("/artworks/uploadArt", newArtwork);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["artworks"]);
      window.alert("Your artwork is pending for approval for upload!");
    },
  });

  const handleClick = async (event) => {
    event.preventDefault();
    let imgUrl = "";
    // console.log(file)
    if (file) imgUrl = await upload();
    mutation.mutate({ picturePath: imgUrl });
    //setDesc("");
    setFile(null);
  };

  return (
    <div className="shareArt">
    <div className="container">
      <div className="top">
        <div className="left">
        </div>
        <div className="right">
          {file && <img className="file" alt="" src={URL.createObjectURL(file)}/>}
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file">
            <div className="item">
              <img src={currentUser.profilePicture} alt="" />
              <span>Add an Image to the Gallery!</span>
            </div>
          </label>
    
        </div>
        <div className="right">
          <button onClick={handleClick}>Upload</button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ShareToGallery;
