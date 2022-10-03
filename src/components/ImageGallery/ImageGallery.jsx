import PropTypes from 'prop-types';

import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({pictures, openModal}) => {

    return (
          <ul className={css.ImageGallery}>
            {pictures &&
              pictures.map(picture => (
                <ImageGalleryItem key={picture.id} picture={picture} onClick={openModal} />
              ))}
          </ul>
    );
}


ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number.isRequired
  })),
  openModal: PropTypes.func.isRequired
}