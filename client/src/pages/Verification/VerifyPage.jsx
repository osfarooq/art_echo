import "./verifyPage.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import VerifyUpload from "../../assets/VerifyUpload.png";
import Logout from "../../components/Logout/Logout";

const VerifyPage = () => {
  const [file, setFile] = useState(null);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
   


  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();




  const mutation = useMutation({
    mutationFn: (art) => {
      return makeRequest.post(`/users/uploadArt/${currentUser.id}`, art);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["users"]);
      window.alert("Your Account is now pending for Approval. Log back in Later. Thank you!")
    },
  });




  const handleClick = async (event) => {
    event.preventDefault();
    let imgUrl = "";
    console.log("share file 44" + file);
    if (file) imgUrl = await upload();
    console.log("share" + imgUrl);
    mutation.mutate({ picturePath: imgUrl });
    setFile(null);
  };

  return (
    <div className="verification">
      <div className="header">
        <h1>Artist Verification Page</h1>
        <span>Get Yourself verified and Join ArtEcho as a creator!</span>
      </div>
      <section className="subHeader">
        <h1>Upload an artwork of yours and let us know youre the real deal.</h1>
      </section>

      <div className="main-body">
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file">
          <div className="Left">
            {file ? (
                <div className="uploaded">
              <img
                className="uploadedFile"
                alt="Uploaded File"
                src={URL.createObjectURL(file)}
                onClick={handleClick}
              />
              <span>Click the image to submit.</span>
              </div>
            ) : (
              <div className="notUploaded">
                <img className="file" alt="Verify Upload" src={VerifyUpload} />
                <span>Add Image</span>
              </div>
            )}
          </div>
        </label>

        <div className="Right">
          <h1>
            Upload one of your creations to let us verify you as an artist.
          </h1>
          <h2>After Verification you will have access to:</h2>
          <ul>
            <li>Sharing Artwork with the world.</li>
            <li>Displaying your art in VR</li>
            <li>Selling your art worldwide</li>
          </ul>
          <span>...and much more!</span>
          <Logout/>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
