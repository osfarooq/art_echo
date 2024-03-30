import "./sellItem.scss";
import Image from "../../assets/img.png";

import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const SellItem = (event) => {
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState("");

  const [err, setErr] = useState(null);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
      setErr(err.response.data);
    }
  };

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newItem) => {
      return makeRequest.post("/markets/uploadItem", newItem);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["markets"]);
      window.alert("Your artwork was successfully uploaded.")
    },
  });

  const handleClick = async (event) => {
    event.preventDefault();
    let imgUrl = "";
    console.log("share file 44" + file);
    if (file) imgUrl = await upload();
    console.log("share" + imgUrl);
    mutation.mutate({
      title,
      description,
      price,
      availability,
      picture: imgUrl,
    });
    setTitle("");
    setDescription("");
    setPrice("");
    setAvailability("");
    setFile(null);
  };

  return (
    <div className="sell">
      <div className="Header">
        <h1>Sell an Item on the Market</h1>
      </div>
      <div className="container">
        <div className="top">
          <div className="left">Add Your Item Details Here</div>
        </div>
        <hr />
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
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>

        <div className="inputs">
          <input
            type="text"
            placeholder={`Title`}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <input
            type="text"
            placeholder={`Description`}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <input
            type="text"
            placeholder={`Price`}
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
          <input
            type="text"
            placeholder={`Availability`}
            onChange={(e) => setAvailability(e.target.value)}
            value={availability}
          />
        </div>
      </div>

      <div className="submit">
        {err && err}

        <button onClick={handleClick}>Upload</button>
      </div>
      <div className="space2"></div>
    </div>
  );
};

export default SellItem;
