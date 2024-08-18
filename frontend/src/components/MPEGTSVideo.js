import React, { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';
import mpegts from 'mpegts.js';
export const MPEGTSVideo= ({ src }) => {
    const videoRef = useRef(null);
    useEffect(() => {
      const video = videoRef.current;
      
      if (!src) {
        console.error('No URL provided');
        return;
      }
  
      if (video) {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(src);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch((error) => {
              console.error('Error attempting to play video:', error);
            });
          });
          return () => {
            hls.destroy();
          };
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = src;
          video.addEventListener('loadedmetadata', () => {
            video.play().catch((error) => {
              console.error('Error attempting to play video:', error);
            });
          });
        } else {
          console.error('Browser does not support HLS or MPEG-TS playback.');
        }
      }
    }, [src]);
  
    return (
      <video
        ref={videoRef}
        controls
        className='video'
      >
        Your browser does not support the video tag.
      </video>
    );
  };