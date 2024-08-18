import React, { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';
import mpegts from 'mpegts.js';
export const MJPEGVideo = ({ src }) => {
    const canvasRef = useRef(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      const updateImage = () => {
        img.src = src;
        setTimeout(updateImage, 100); 
      };
      updateImage();
    }, [src]);
  
    return <canvas ref={canvasRef} className='video' />;
  };
  