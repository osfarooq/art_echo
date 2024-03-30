import "./rightBar.scss";
import Giphy from "../../assets/Giphy.png";
import RightBarGallery from "../../assets/RightBarGallery.png";

import { Link } from "react-router-dom";

const RightBar = () => {
  return (
    <div className="rightBar">
      <Link to="/VRGallery" style={{ textDecoration: 'none' }}>
        <h1>Checkout the Gallery!</h1>

        <div className="container">
          <div className="item">
            <img src={RightBarGallery} />
          </div>
        </div>
      </Link>

      <hr />

      <span>Find more Gifs like these, visit {<img src={Giphy} alt="" />}</span>
      <div className="container">
        <div className="item">
          <div
            style={{
              width: "100%",
              height: 0,
              paddingBottom: "100%",
              position: "relative",
            }}
          >
            <iframe
              src="https://giphy.com/embed/26FPq8u5gvYO9GzoA"
              width="100%"
              height="100%"
              style={{ position: "absolute" }}
              frameBorder="0"
              className="giphy-embed"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="item">
          <div
            style={{
              width: "100%",
              height: 0,
              paddingBottom: "100%",
              position: "relative",
            }}
          >
            <iframe
              src="https://giphy.com/embed/UVkAW5zSme7i4roUe6"
              width="100%"
              height="100%"
              style={{ position: "absolute" }}
              frameBorder="0"
              className="giphy-embed"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
