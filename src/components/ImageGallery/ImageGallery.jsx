import React, { Component } from 'react';
import PropTypes from 'prop-types';


import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {

  static propTypes = {
    pictures: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired
    })),
    openModal: PropTypes.func.isRequired
  }
  
  state = {
    pictures: null,
    isLoadMoreBtn: false,
    status: 'idle',
    page: 1,
  };

  render() {
    const { pictures, openModal } = this.props;

    return (
          <ul className={css.ImageGallery}>
            {pictures &&
              pictures.map(picture => (
                <ImageGalleryItem key={picture.id} picture={picture} onClick={openModal} />
              ))}
          </ul>
    );
  }
}

ImageGallery.propTypes = {
  request: PropTypes.string,
  openModal: PropTypes.func,
};