import React, { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';
export const HlsVideo = ({ src }) => {
    const videoRef = useRef(null);
  
    useEffect(() => {
      const video = videoRef.current;
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          //video.play();
        });
        return () => {
          hls.destroy();
        };
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
        video.addEventListener('canplay', () => {
          video.play();
        });
      }
    }, [src]);
  
    return <video className='video' ref={videoRef} controls  />;
  };