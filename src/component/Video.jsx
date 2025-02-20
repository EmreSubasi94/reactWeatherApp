import { useContext, useEffect } from "react";
import { newContext } from "../context/Context";
import "../App.css";

function Video() {
  const { videoRef, video, videoSource } = useContext(newContext);

  return (
    <div>
      <video autoPlay loop muted playsInline ref={videoRef}>
        <source src={videoSource(video)} type="video/mp4" />
      </video>
    </div>
  );
}

export default Video;
