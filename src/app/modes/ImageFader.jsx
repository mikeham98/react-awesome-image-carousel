import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from '../../themes/index.styles.scss';

export default class ImageFader extends React.PureComponent {
  componentDidMount() {
    this.setTransitionFadeDuration();
  }

  setTransitionFadeDuration() {
    let images = document.getElementsByClassName('imageCarouselFadeImage');
    let size = images.length;

    for (let i = 0; i < size; i++) {
      let image = images[i];
      image.style.transitionDuration = `${this.props.transitionDuration}s`;
    }
  }

  render() {
    const { isCurrent, src } = this.props;
    return (
      <img
        src={src}
        className={classNames([styles.imageCarouselWrapper, styles.imageCarouselImage,styles.imageCarouselFadeImage])}
        style={{
          opacity: isCurrent ? 1 : 0
        }}
      />
    );
  }
}

ImageFader.propTypes = {
  isCurrent: PropTypes.bool,
  src: PropTypes.string,
};