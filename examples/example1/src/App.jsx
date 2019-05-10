import React from 'react';
import ImageViewer from 'react-awesome-image-slider';
import image1 from '../assets/daily.jpg';
import image2 from '../assets/monthly.jpg';
import image3 from '../assets/yearly.jpg';
import image4 from '../assets/react-awesome-image-slider.svg';

const images = [{
  src: image1
},{
  src: image2
},{
  src: image3
},{
  src: image4
}];

class App extends React.Component {
  render() {
    return (
      <div style={{width: 300, height: 300, position: 'relative', overflow: 'hidden'}}>
        <ImageViewer
          transition={'slide'}
          transitionDuration={0.3}
          auto
          autoDuration={3}
          coolOff={6}
          // customPrevButton={Left}
          // customNextButton={({onClick}) => <div onClick={onClick}>custom next</div>}
          images={images}
        />
      </div>
    );
  }
}

export default App;