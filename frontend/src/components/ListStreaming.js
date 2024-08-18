

import React, { useState, useEffect, useRef } from 'react';
import '../style/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Hls from 'hls.js';
import mpegts from 'mpegts.js';
    import { useLocation } from 'react-router-dom';
import { HlsVideo } from './HlsVideo';
import { MPEGTSVideo } from './MPEGTSVideo';
import { MJPEGVideo } from './MJPEGVideo';

    const renderVideo = (stream) => {
        return (
          <div className="video-wrapper">
          {(() => {
            switch (stream.format) {
              case 'hls':
                return <HlsVideo src={stream.url} />;
              case 'mp4':
                return (
                  <video controls autoPlay className='video'>
                    <source src={stream.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                );
              case 'mjpeg':
                return <MJPEGVideo src={stream.url} />;
              case 'mpegts':
                return <MPEGTSVideo src={stream.url} />;
              default:
                return null;
            }
          })()}
        </div>
        
        )
        
      };

export const ListStreaming= () => {
  const location = useLocation();
  const { streams } = location.state || {};

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-center">
    <a className="navbar-brand text-center" href="#">Welcome to My Camera Logs</a>
  </nav>
  <div className="row mt-4">
    <div className="col-md-12 text-center">
      <p className="lead">Your one-stop solution for monitoring and managing camera footage.</p>
    </div>
  </div>
    <div className="row">
    {streams.length > 0 ? (
      streams.map((video, videoIndex) => (
        <div key={videoIndex} className="col-md-6 video-container">
        
        <div className="video-wrapper">
          {renderVideo(video)}
          
        </div>
      </div>
      
      ))
    ) : (
      <p>No videos available</p>
    )}
      <footer className="text-center mt-4 mb-4">
        <p>&copy; 2024 Camera Logs. All rights reserved.</p>
      </footer>
  </div>
  </>
  );
};

export default ListStreaming;
