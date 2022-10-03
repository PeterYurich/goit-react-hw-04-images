import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({toggleModal, largeImageURL}) => {
  
  useEffect(() => {
    const closeModalByEsc = evt => {
      if (evt.code === 'Escape') {
        toggleModal();
      }
    };
    
    window.addEventListener('keydown', closeModalByEsc);
    return () => (window.removeEventListener('keydown', closeModalByEsc))
  }, [toggleModal]);
  


  const closeModalByClickAround = evt => {
    if (evt.target === evt.currentTarget) {
      toggleModal();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={closeModalByClickAround}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>,
    modalRoot
  );
  
};

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

// export class OldModal extends Component {
  // static propTypes = {
  //   toggleModal: PropTypes.func.isRequired,
  //   largeImageURL: PropTypes.string.isRequired
  // }

  // componentDidMount() {
  //   window.addEventListener('keydown', this.closeModalByEsc);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.closeModalByEsc);
  // }

  // closeModalByEsc = evt => {
  //   if (evt.code === 'Escape') {
  //     this.props.toggleModal();
  //   }
  // };

  // closeModalByClickAround = evt => {
  //   if (evt.target === evt.currentTarget) {
  //     this.props.toggleModal();
  //   }
  // };

  // render() {
    // return createPortal(
    //   <div className={css.Overlay} onClick={this.closeModalByClickAround}>
    //     <div className={css.Modal}>
    //       <img src={this.props.largeImageURL} alt="" />
    //     </div>
    //   </div>,
    //   moadlRoot
    // );
  // }
// }
