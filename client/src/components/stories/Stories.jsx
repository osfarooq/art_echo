import { useContext  } from "react";
import { AuthContext } from "../../context/authContext";
import "./stories.scss";


const Stories = () => {

  const {currentUser} = useContext(AuthContext);
  //TEMPORARY DUMMY DATA
  const stories = [
    {
      id: 1,
      name: "Ali Ahmed",
      img: "https://images.unsplash.com/photo-1577017452719-6513f6300a76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aW5zdGFncmFtJTIwc3Rvcnl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 2,
      name: "Yaseen Hayat",
      img: "https://images.unsplash.com/photo-1541560052-3744e48ab80b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      name: "Hassan Taj",
      img: "https://images.unsplash.com/photo-1512641406448-6574e777bec6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3Vuc2V0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 4,
      name: "Emma Kashif",
      img: "https://images.unsplash.com/photo-1679679007793-25fa830507c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8OHx8Y2l0eXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
  ];

  return (
    <div className="stories">
      <div className="story">
        <img src={currentUser.profilePicture} alt="" />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {stories.map((story) => (
        <div className="story" key ={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
