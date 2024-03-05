import moment from "moment";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./comments.scss";

const Comments = ({postId}) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments"],
    queryFn: () =>
      makeRequest.get("/comments?postId=" + postId).then((res) => {
        return res.data;
      }),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["comments"]);
    },
  });

  const handleClick = async (event) => {
    event.preventDefault();
    mutation.mutate({ desc, postId: postId });
    setDesc("");
  };
  //Temporart
  // const comments = [
  //   {
  //     id: 1,
  //     desc: "Looks amazing! Cant wait to see the final product.",
  //     name: "Yaseen Hayat",
  //     userID: 2,
  //     profilePic:
  //       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  //   },
  //   {
  //     id: 2,
  //     desc: "Haha, same. Im in LOVE with your work, keep it up!",
  //     name: "Emma Kashif",
  //     userID: 4,
  //     profilePic:
  //       "https://images.unsplash.com/photo-1521252659862-eec69941b071?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  //   },
  // ];

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePicture} alt="" />
        <input
          type=""
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading
        ? "loading..."
        : data.map((comment) => (
            <div className="comment">
              <img src={comment.profilePicture} alt="" />
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
};

export default Comments;
