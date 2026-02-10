import { createPortal } from "react-dom";

const VideoPortal = ({ children }: { children: React.ReactNode }) => {
  return createPortal(children, document.body);
};

export default VideoPortal;
