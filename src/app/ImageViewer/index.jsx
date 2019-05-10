import React from 'react';
import PropTypes from 'prop-types';
import ImageFader from '../Image';
import ImageSlider from '../ImageSlider';

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

  imageFade() {
    const { images } = this.props;
    const { current } = this.state;
    return images.map((image, index) => {
      const isCurrent = index === current;
      return (
        <ImageFader
          key={`image-${index}`}
          isCurrent={isCurrent}
          src={image.src}
        />
      );
    });
  }

  imageSlide() {
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
          return this.imageFade();
        case slide:
          return this.imageSlide();
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
    const onClickPrev = () => this.showPrevImage(true);
    const onClickNext = () => this.showNextImage(true);

    let CustomPrevButton = customPrevButton;
    let CustomNextButton = customNextButton;
    const prevProps = {
      onClick: onClickPrev,
    };
    const nextProps = {
      onClick: onClickNext,
    };
    return (
      <div>
        {CustomPrevButton ? <CustomPrevButton {...prevProps}/> :
          <button onClick={onClickPrev} style={{ position: 'absolute', zIndex: 10 }}>prev</button>}
        {CustomNextButton ? <CustomNextButton {...nextProps}/> :
          <button onClick={onClickNext} style={{ position: 'absolute', zIndex: 10, top: 30 }}>next</button>}
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.returnButtons()}
        {this.returnImage()}
      </React.Fragment>
    );
  }
}

ImageViewer.propTypes = {
  auto: PropTypes.bool,
  autoDuration: PropTypes.number,
  coolOff: PropTypes.number,
  customPrevButton: PropTypes.func,
  customNextButton: PropTypes.func,
  transition: PropTypes.string,
  transitionDuration: PropTypes.number,
};

ImageViewer.defaultProps = {
  auto: false,
  autoDuration: 3,
  coolOff: 6,
  transition: slide,
  transitionDuration: 0.3,
};