import { useContext, useState } from "react";
import "./update.scss";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    name: "",
    username: "",
    city: "",
  });

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    setTexts((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (user) => {
      return makeRequest.put("/users", user);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["user"]);
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    let coverUrl = user.coverPicture;
    let profileUrl = user.profilePicture;

    coverUrl = cover && (await upload(cover));
    profileUrl = profile && (await upload(profile));

    mutation.mutate({
      ...texts,
      coverPicture: coverUrl,
      profilePicture: profileUrl,
    });
    setOpenUpdate(false)
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <input type="file" onChange={(e) => setCover(e.target.files[0])} />
          <input type="file" onChange={(e) => setProfile(e.target.files[0])} />
          <input type="text" name="name" onChange={handleChange} />
          <input type="text" name="username" onChange={handleChange} />
          <input type="text" name="city" onChange={handleChange} />
          <button onClick={handleSubmit}>Update</button>
        </form>
        <button onClick={() => setOpenUpdate(false)}> X</button>
      </div>
    </div>
  );
};

export default Update;
