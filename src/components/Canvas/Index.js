import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import star from "../../assets/star-small.png";
import { updateImageData } from "../../utils/helpers";

// Custom hook to get the canvas when it is loaded
const useCanvas = callback => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    callback([canvas, context]);
  });

  return canvasRef;
};

const Canvas = ({ velocity }) => {
  const canvasRef = useCanvas(([canvas, context]) => {
    let image = new Image();
    image.src = star; // PNG source
    image.onload = function() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      if (velocity !== 0) {
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        context.putImageData(updateImageData(imageData, velocity), 0, 0);
      }
    };
  });

  return (
    <canvas data-testid="canvas" ref={canvasRef} width={420} height={420} />
  );
};

Canvas.propTypes = {
  velocity: PropTypes.number
};

export default Canvas;
