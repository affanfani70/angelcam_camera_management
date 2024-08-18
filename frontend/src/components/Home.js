  import React, { useState, useEffect, useRef } from 'react';
  import Hls from 'hls.js';
  import mpegts from 'mpegts.js';
  import '../style/Home.css';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import axios from 'axios';
  import videojs from 'video.js';
  import 'video.js/dist/video-js.css';
  import { useNavigate } from "react-router-dom";
  import { MPEGTSVideo } from './MPEGTSVideo';
  import { MJPEGVideo } from './MJPEGVideo';
  import { HlsVideo } from './HlsVideo';
  const Home = () => {
    const [videos, setVideos] = useState([]);
    const [fullScreen, setFullscreen] = useState(false);
    const [videoSelected, setVideoselected] = useState('');
    const videoRef1 = useRef(null);
    const videoRef2 = useRef(null);
    const navigate=useNavigate()
    useEffect(() => {
      const fetchVideos = async () => {
        const token=localStorage.getItem("token")

        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/api/angelcam/shared-cameras/",
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          console.log("vvvvvvvvx" , response.data.results);
          setVideos(response.data.results)
          // setVideos(response.data.videos); // Adjust according to the actual response structure
        } catch (error) {
          console.error('Error fetching videos:', error);
        }
      };

      fetchVideos();
    }, []);

    const openFullscreen = (videoSrc) => {
      setVideoselected(videoSrc);
      setFullscreen(true);
    };

    // c
    
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
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-center">
          <a className="navbar-brand text-center" href="#">Welcome to My Camera Logs</a>
        </nav>
        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <p className="lead">Your one-stop solution for monitoring and managing camera footage.</p>
          </div>
        </div>

        <div className="row">
        {videos.length > 0 ? (
          videos.map((video, videoIndex) => (
            <div key={video.id} className="col-md-6 video-container">
            <h3>Camera {videoIndex+1}: {video.name}</h3>
            <div className="video-wrapper">
              {renderVideo(video.streams[0])}
              
            </div>
            {video.streams?.length > 1 && (
              <button className="show-more-button" onClick={() => navigate('/List', { state: { streams: video.streams } })}>
                Show More
              </button>
            )}
          </div>
          
          ))
        ) : (
          <p>No videos available</p>
        )}
      </div>




        <footer className="text-center mt-4 mb-4">
          <p>&copy; 2024 Camera Logs. All rights reserved.</p>
        </footer>
      </div>
    );
  };


  export default Home