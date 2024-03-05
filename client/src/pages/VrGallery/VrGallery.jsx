import ShareArtwork from "../../components/ShareToGallery/ShareToGallery";
import "./vrGallery.scss";
const VRGallery = () => {
  return (
    <div className="gallery">
      <div className="space1"></div>
      <iframe
        src="https://www.spatial.io/embed/exciting_hamster776s-Digital-World-65e6b4278bb5d78596868bc5?share=9202242439325037325"
        width="1280px"
        height="720px"
        allow="camera; fullscreen; autoplay; display-capture; microphone; clipboard-write"
      ></iframe>
      <div className="upload-button">
        <ShareArtwork/>
      </div>
      <div className="space2"></div>
    </div>
  );
};

export default VRGallery;
