import ShareArtwork from "../../components/ShareToGallery/ShareToGallery";
import VRMarketplace from "../../components/VrMarket/VrMarket";
import { Link } from "react-router-dom";
import "./vrGallery.scss";
const VRGallery = () => {
  return (
    <div className="gallery">
      <div className="space1"></div>
      <iframe
        src="https://www.spatial.io/embed/artechos-Immersive-Room-65e6b4148bb5d78596868bba?share=2306142571205511430"
        width="1180px"
        height="620px"
        allow="camera; fullscreen; autoplay; display-capture; microphone; clipboard-write"
      ></iframe>
      <div className="upload-button">
        <ShareArtwork />
      </div>
      <div>
        <VRMarketplace />
      </div>
      <div className="space2"></div>
    </div>
  );
};

export default VRGallery;
