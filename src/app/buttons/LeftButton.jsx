import React from 'react';
import classNames from 'classnames';
import styles from '../../themes/index.styles.scss';
import chevron from './chevron.svg';

export default class LeftButton extends React.Component {
  render() {
    return (
      <div className={classNames([styles.imageCarouselButtonWrapper,styles.imageCarouselLeftButtonWrapper])}>
      <img
          onClick={this.props.onClick}
          src={chevron}
          className={styles.imageCarouselLeftButton}
        />
      </div>
    );
  }
}