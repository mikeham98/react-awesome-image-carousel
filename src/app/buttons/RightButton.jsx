import React from 'react';
import styles from '../../themes/index.styles.scss';
import classNames from 'classnames';
import chevron from './chevron.svg';

export default class RightButton extends React.Component {
  render() {
    return (
      <div className={classNames([styles.imageViewerButtonWrapper,styles.imageViewerRightButtonWrapper])}>
        <img
          onClick={this.props.onClick}
          src={chevron}
          className={styles.imageViewerRightButton}
        />
      </div>
    );
  }
}