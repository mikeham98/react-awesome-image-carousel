import React from 'react';
import PropTypes from 'prop-types';
import ImageFader from './modes/ImageFader';
import ImageSlider from './modes/ImageSlider';
import LeftButton from './buttons/LeftButton';
import RightButton from './buttons/RightButton';

const fade = 'fade';
const slide = 'slide';

export default class ImageViewer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      pause: false,
      autoPlayIntervalId: undefined,
      pauseTimeoutId: undefined,
    };
    this.showPrevImage = this.showPrevImage.bind(this);
    this.showNextImage = this.showNextImage.bind(this);
    this.startAutoPlay = this.startAutoPlay.bind(this);
  }

  componentDidMount() {
    if (this.props.auto) {
      this.startAutoPlay();
    }
  }

  startAutoPlay() {
    const autoPlayIntervalId = setInterval(this.showNextImage, this.props.autoDuration * 1000);
    this.setState({
      autoPlayIntervalId,
    });
  }

  stopAutoPlay() {
    clearTimeout(this.state.autoPlayIntervalId);
  }

  handlePause() {
    clearTimeout(this.state.pauseTimeoutId);
    this.stopAutoPlay();
    const pauseTimeoutId = setTimeout(() => {
      this.showNextImage();
      this.startAutoPlay();
    }, this.props.coolOff * 1000);
    this.setState({ pauseTimeoutId });
  }

  returnImageFader() {
    const { images, transitionDuration } = this.props;
    const { current } = this.state;
    return images.map((image, index) => {
      const isCurrent = index === current;
      return (
        <ImageFader
          key={`image-${index}`}
          isCurrent={isCurrent}
          src={image.src}
          transitionDuration={transitionDuration}
        />
      );
    });
  }

  returnImageSlide() {
    const { images, transitionDuration } = this.props;
    const { current } = this.state;
    return (
      <ImageSlider
        images={images}
        current={current}
        transitionDuration={transitionDuration}
      />
    );
  }

  returnImage() {
    const { images, transition } = this.props;
    if (Array.isArray(images) && images.length) {
      switch (transition) {
        case fade:
          return this.returnImageFader();
        case slide:
          return this.returnImageSlide();
      }
    }
  }

  getPrevIndex() {
    const numberOfImages = this.props.images.length;
    const { current } = this.state;
    if (numberOfImages) {
      let prev = current - 1;
      if (prev < 0) {
        prev = numberOfImages - 1;
      }
      return prev;
    }
  }

  getNextIndex() {
    const numberOfImages = this.props.images.length;
    const { current } = this.state;
    if (numberOfImages) {
      let next = current + 1;
      if (next === numberOfImages) {
        next = 0;
      }
      return next;
    }
  }

  showPrevImage(clicked) {
    const prevImage = this.getPrevIndex();
    if (clicked && this.props.auto && this.props.coolOff) {
      this.handlePause();
    }
    this.setState({
      current: prevImage,
    });
  }

  showNextImage(clicked) {
    const nextImage = this.getNextIndex();
    if (clicked && this.props.auto && this.props.coolOff) {
      this.handlePause();
    }
    this.setState({
      current: nextImage,
    });
  }

  returnButtons() {
    const { customPrevButton, customNextButton } = this.props;
    let CustomPrevButton = customPrevButton;
    let CustomNextButton = customNextButton;
    const prevProps = {
      onClick: () => this.showPrevImage(true),
    };
    const nextProps = {
      onClick: () => this.showNextImage(true),
    };
    return (
      <div>
        {CustomPrevButton ? <CustomPrevButton {...prevProps}/> :
          <LeftButton {...prevProps}/>}
        {CustomNextButton ? <CustomNextButton {...nextProps}/> :
          <RightButton {...nextProps}/>}
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        {!this.props.disableButtons && this.returnButtons()}
        {this.returnImage()}
      </React.Fragment>
    );
  }
}

ImageViewer.propTypes = {
  auto: PropTypes.bool,
  autoDuration: PropTypes.number,
  coolOff: PropTypes.number,
  disableButtons: PropTypes.bool,
  customPrevButton: PropTypes.func,
  customNextButton: PropTypes.func,
  transition: PropTypes.string,
  transitionDuration: PropTypes.number,
};

ImageViewer.defaultProps = {
  auto: false,
  autoDuration: 3,
  disableButtons: false,
  coolOff: 6,
  transition: slide,
  transitionDuration: 0.3,
};