import React from 'react';

import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ picture, onClick }) => {
  // console.log(picture);
  return (
    <li className={css.ImageGalleryItem}>
      <img
        onClick={() => {
          onClick(picture.largeImageURL);
        }}
        src={picture.webformatURL}
        alt={picture.largeImageURL}
      ></img>
    </li>
  );
};

ImageGalleryItem.propTypes = {
  picture: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),

  onClick: PropTypes.func.isRequired,
};
