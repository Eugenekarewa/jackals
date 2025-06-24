import React from 'react';
import './App.css';

import jackal1 from './jackal1.jpg';
import jackal2 from './jackal2.jpg';
import jackal3 from './jackal3.jpg';
import jackal4 from './jackal4.jpg';
import jackal5 from './jackal5.jpg';
import jackal6 from './jackal6.jpg';
import jackal7 from './jackal7.jpg';
import jackal8 from './jackal8.jpg';
import jackal9 from './jackal9.jpg';
import jackal10 from './jackal10.jpg';
import jackal11 from './jackal11.jpg';
import jackal12 from './jackal12.jpg';
import jackal13 from './jackal13.jpg';

const jackalImages = [
  jackal1,
  jackal2,
  jackal3,
  jackal4,
  jackal5,
  jackal6,
  jackal7,
  jackal8,
  jackal9,
  jackal10,
  jackal11,
  jackal12,
  jackal13,
];

function Gallery() {
  
  const images = [...jackalImages];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Jackal Gallery</h1>
        <div className="gallery">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Jackal ${index}`}
              className="gallery-image"
              loading="lazy"
            />
          ))}
        </div>
      </header>
    </div>
  );
}

export default Gallery;
