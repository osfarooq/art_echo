import { useContext, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsRoundedIcon from "@mui/icons-material/TextsmsRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Comments from "../comments/Comments";
import moment from "moment";
import "./post.scss";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () =>
      makeRequest.get("/likes?postId=" + post.id).then((res) => {
        return res.data;
      }),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["likes"]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (postId) => {
      return makeRequest.delete("/posts" + postId);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePicture} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizRoundedIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.userId === currentUser.id && (
            <button onClick={handleDelete}>Delete</button>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"./upload/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "loading..."
            ) : data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "rebeccapurple" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderRoundedIcon onClick={handleLike} />
            )}
            {data && data.length} likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsRoundedIcon />See Comments
          </div>
          <div className="item">
            <SendRoundedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
