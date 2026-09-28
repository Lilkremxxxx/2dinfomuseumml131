import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mapImg from '../../Image/1. Ban do viet nam.jpg';
import './OpeningScreen.css';

export default function OpeningScreen() {
  const [stage, setStage] = useState(0);
  const navigate = useNavigate();

  // Simple sequential stages with timeouts
  useEffect(() => {
    const timers = [];
    // Stage 0: dark screen, show map with bright dots appearing sequentially
    timers.push(setTimeout(() => setStage(1), 1000)); // after 1s show map
    // Stage 1: show map with dots (simulated by CSS animation)
    timers.push(setTimeout(() => setStage(2), 3000)); // after 2s show text
    // Stage 2: show final text and button
    timers.push(setTimeout(() => setStage(3), 6000)); // after 3s enable button
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const startJourney = () => {
    // Navigate to next screen (placeholder route)
    navigate('/dan-toc');
  };

  return (
    <div className="opening-screen">
      {stage === 0 && <div className="bg-black fullscreen" />}
      {stage >= 1 && (
        <div className="map-container fullscreen">
          <img src={mapImg} alt="Bản đồ Việt Nam" className="map-image" />
          <div className="dots" />
        </div>
      )}
      {stage >= 2 && (
        <div className="overlay-text fullscreen">
          <p className="intro">Để kết tinh thành 1 mảnh đất hình chữ S đó, điều quan trọng nhất phải có:</p>
          <h2 className="title">DÂN TỘC</h2>
          <p className="subtitle" style={{ backgroundColor: '#8B0000', color: '#FFD700' }}>
            Một đất nước – 54 sắc màu – một cộng đồng.
          </p>
        </div>
      )}
      {stage >= 3 && (
        <button className="start-button" onClick={startJourney}>BẮT ĐẦU HÀNH TRÌNH →</button>
      )}
    </div>
  );
}
