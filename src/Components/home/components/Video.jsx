import homeVideo from "../../../assets/images/video.mp4";

const Video = () => {
  return (
    <div className="relative max-h-screen overflow-hidden">
      <video
        src={homeVideo}
        alt="Car Demo"
        className="aspect-video w-full h-full object-cover"
        autoPlay
        loop
        muted
      />
    </div>
  );
};

export default Video;
