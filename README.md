# 📷 React Awesome Image Carousel 🌈
<div align="center">
  <a href="https://github.com/mikeham98/react-awesome-image-carousel">
    <img width="250" height="250" src="https://raw.githubusercontent.com/mikeham98/react-awesome-image-carousel/master/assets/react-awesome-image-carousel.svg?sanitize=true">
  </a>
</div>

*react-awesome-image-carousel* is a library that allows you to easily add an image carousel to your application. There are two transition types available these being fade, and slide.

## Installation
```bash
npm install --save react-awesome-image-carousel
```

## Examples
<div>
<div style="display: inline-block; margin-right: 20px;">
<h3>Slide</h3>
<img src="https://raw.githubusercontent.com/mikeham98/react-awesome-image-carousel/master/assets/slide.gif" height="300">
</div>

<div style="display: inline-block; margin-right: 20px;">
<h3>Fade</h3>
<img src="https://raw.githubusercontent.com/mikeham98/react-awesome-image-carousel/master/assets/fade.gif" height="300">
</div>
</div>

## Basic use
```bash
import React from 'react';
import ImageCarousel from 'react-awesome-image-carousel';
import image1 from '../assets/img1.jpeg';
import image2 from '../assets/img2.jpeg';
import image3 from '../assets/img3.jpeg';

const images = [{
  src: image1
},{
  src: image2
},{
  src: image3
}];

export default class Example extends React.Component {
  render() {
    return (
      <div style={{width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden'}}>
        <ImageCarousel
          transition={'slide'}
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
```

## ImageCarousel
### Props
#### Summary
|Name                   |Type         |Description                                                                   |
|-----------------------|-------------|------------------------------------------------------------------------------|
|auto                   |boolean      |This determines whether or not the images transition automatically            |
|autoDuration           |number (seconds)      |This sets the duration of when to automatically transition to the next image  |
|coolOff                |number (seconds)       |This is the duration for how long an image pauses before resuming the auto image transition when the next or previous buttons are clicked  |
|disableButtons         |boolean      |This will remove the previous and next buttons  |
|customPrevButton       |component    |This will remove the default left button and use a your custom component, an onClick prop will be passed in  |
|customNextButton       |component    |This will remove the default right button and use a your custom component, an onClick prop will be passed in  |
|images             |array       |This should be an array of objects with a src key value pair|
|transition             |string       |This can either be set to 'fade' or 'slide' which will set the transition type of the images |
|transitionDuration     |number (seconds)       |This is the duration of the transition  |