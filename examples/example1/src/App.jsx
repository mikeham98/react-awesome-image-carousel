import React from 'react';
import ImageSlider from 'react-awesome-image-slider';
import image1 from '../assets/daily.jpg';
import image2 from '../assets/monthly.jpg';
import image3 from '../assets/yearly.jpg';
import image4 from '../assets/react-awesome-calendar.svg';

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
      <div>
        <ImageSlider
          auto
          autoDuration={3}
          fade
          fadeDuration={0.3}
          coolOff={6}
          customPrevButton={Left}
          customNextButton={({onClick}) => <div onClick={onClick}>custom next</div>}
          images={images}
        />
      </div>
    );
  }
}

export default App;