import React from 'react';
import ImageCarousel from 'react-awesome-image-carousel';
import image1 from '../assets/img1.jpeg';
import image2 from '../assets/img2.jpeg';
import image3 from '../assets/img3.jpeg';
import './themes/app.scss'

const images = [{
  src: image1
},{
  src: image2
},{
  src: image3
}];

class App extends React.Component {
  render() {
    return (
      <div style={{width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden'}}>
        <ImageCarousel
          transition={'fade'}
          transitionDuration={0.3}
          auto
          autoDuration={3}
          coolOff={6}
          images={images}
        />
      </div>
    );
  }
}

export default App;