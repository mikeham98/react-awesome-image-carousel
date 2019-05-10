import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './index.styles.scss';

export default class ImageFader extends React.PureComponent {
  componentDidMount() {
    this.setTransitionFadeDuration();
  }

  setTransitionFadeDuration() {
    let images = document.getElementsByClassName('fadeImage');
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
        className={classnames([styles.imageSlider, styles.fadeImage])}
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