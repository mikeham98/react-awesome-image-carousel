import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../themes/index.styles.scss';

export default class ImageSlider extends React.Component {
  componentDidUpdate() {
    const { current } = this.props;
    document.getElementById('imageSlider').style.transform = `translateX(-${100 * current}%)`;
  }

  returnImages() {
    const { images } = this.props;
    return images.map((image, index) => (
      <img
        key={index}
        src={image.src}
        style={{ left: `${index * 100}%` }}
        className={styles.imageCarouselImage}
      />
    ));
  }

  render() {
    const { transitionDuration } = this.props;
    return (
      <div
        className={styles.imageCarouselSliderWrapper}
        style={{ transitionDuration: `${transitionDuration}s` }}
        id={'imageSlider'}
      >
        {this.returnImages()}
      </div>
    );
  }
}

ImageSlider.propTypes = {
  images: PropTypes.array,
  current: PropTypes.number,
  transitionDuration: PropTypes.number,
};