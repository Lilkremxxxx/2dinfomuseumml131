import React from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../../Image/1. Ban do viet nam.jpg';
import './DanTocInfo.css';

export default function DanTocInfo() {
  const navigate = useNavigate();
  const goNext = () => navigate('/home');
  return (
    <div className="dan-toc-info">
      <div className="content">
        <h1 className="title">DÂN TỘC LÀ GÌ?</h1>
        <h2 className="subtitle">Là Cộng đồng về lãnh thổ</h2>
        <img src={img} alt="Bản đồ Việt Nam" className="map" />
        <button className="next-button" onClick={goNext}>TIẾP THEO →</button>
      </div>
    </div>
  );
}
