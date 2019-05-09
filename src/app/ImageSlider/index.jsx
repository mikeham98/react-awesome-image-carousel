import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Image';

export default class ImageSlider extends React.PureComponent {
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
    if (this.props.fade) {
      this.setTransitionFadeDuration();
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

  setTransitionFadeDuration() {
    let images = document.getElementsByClassName('fadeImage'),
      size = images.length;

    for (let i = 0; i < size; i++) {
      let image = images[i];
      image.style.transitionDuration = `${this.props.fadeDuration}s`;
    }
  }

  returnImage() {
    const { images } = this.props;
    const { current } = this.state;
    if (Array.isArray(images) && images.length) {
      return images.map((image, index) => {
        const isCurrent = index === current;
        return (
          <Image
            key={`image-${index}`}
            fade={this.props.fade}
            isCurrent={isCurrent}
            src={image.src}
          />
        );
      });
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
        {CustomPrevButton ? <CustomPrevButton {...prevProps}/> : <button onClick={onClickPrev}>prev</button>}
        {CustomNextButton ? <CustomNextButton {...nextProps}/> : <button onClick={onClickNext}>next</button>}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.returnButtons()}
        {this.returnImage()}
      </div>
    );
  }
}

ImageSlider.propTypes = {
  auto: PropTypes.bool,
  autoDuration: PropTypes.number,
  coolOff: PropTypes.number,
  customPrevButton: PropTypes.func,
  customNextButton: PropTypes.func,
  fade: PropTypes.bool,
  fadeDuration: PropTypes.number,
};

ImageSlider.defaultProps = {
  auto: false,
  autoDuration: 3,
  coolOff: 6,
  fade: false,
  fadeDuration: 0.3,
};