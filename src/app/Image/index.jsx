import React from 'react';
import classnames from 'classnames';
import styles from './index.styles.scss';

export default class Image extends React.PureComponent {
  returnClassName() {
    const classNames = [styles.imageSlider];
    if (this.props.fade) {
      classNames.push(styles.fadeImage);
    }
    return classnames(classNames);
  }

  returnStyle() {
    let opacity = 0;
    if (this.props.isCurrent) {
      opacity = 1;
    }
    return {
      opacity,
    };
  }

  render() {
    const { src } = this.props;
    return (
      <img
        src={src}
        className={this.returnClassName()}
        style={this.returnStyle()}
      />
    );
  }
}