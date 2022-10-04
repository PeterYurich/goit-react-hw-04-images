import React, { useState, useEffect } from 'react';
import css from './App.module.css';
import { Audio } from 'react-loader-spinner';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from 'components/Button/Button';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [API_KEY] = useState('29220368-6467898673c76bc95c006b920');
  const [PER_PAGE] = useState(12);
  const [page, setPage] = useState(1);
  const [totalPictures, setTotalPictures] = useState(0);
  const [request, setRequest] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isLoadMoreBtn, setIsLoadMoreBtn] = useState(false);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (request === '') {
      return;
    }

    setStatus('pending');

    console.log(request);

    fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=${request}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${page}`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(res => {
        if (res.hits.length === 0) {
          setStatus('nothingFound');
          return;
        }
        setPictures([...pictures, ...res.hits]);
        setTotalPictures(res.total);
        setStatus('resolved');
        setIsLoadMoreBtn(true);
      })
      .catch(error => {
        console.log('error is:', error);
        setStatus('rejected');
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request, page, API_KEY, PER_PAGE]);

  const saveRequest = newRequest => {
    if (newRequest !== request) {
      setRequest(newRequest);
      setPage(1);
      setPictures([]);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const pictureToModal = largeImageURL => {
    setLargeImageURL(largeImageURL);
    toggleModal();
  };

  const showLoadMoreBtn = () => {
    setIsLoadMoreBtn(true);
  };

  const toNextPage = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar saveRequest={saveRequest}></Searchbar>

      {pictures.length > 0 && (
        <ImageGallery
          openModal={pictureToModal}
          showLoadMoreBtn={showLoadMoreBtn}
          pictures={pictures}
        ></ImageGallery>
      )}

      {status === 'pending' && (
        <div className={css.Loader}>
          <Audio
            height="200"
            width="200"
            radius="15"
            color="blue"
            ariaLabel="five-dots-loading"
            wrapperStyle
            wrapperClassName="css.Loader_container"
          />
        </div>
      )}

      {status === 'nothingFound' && (
        <p> There are no pictures found by your request "{request}"</p>
      )}

      {status === 'rejected' && (
        <p>
          The servise couldn't find any pictures. Reload the page and try to
          again.
        </p>
      )}

      {isLoadMoreBtn &&
        pictures.length < totalPictures &&
        status !== 'pending' && (
          <LoadMoreBtn onClick={toNextPage}></LoadMoreBtn>
        )}

      {showModal && (
        <Modal largeImageURL={largeImageURL} toggleModal={toggleModal} />
      )}
    </div>
  );
};

// export class OldApp extends Component {
// state = {
//   API_KEY: '29220368-6467898673c76bc95c006b920',
//   PER_PAGE: 12,
//   page: 1,
//   totalPictures: 0,
//   request: '',
//   showModal: false,
//   pictures: [],
//   largeImageURL: '',
//   isLoadMoreBtn: false,
//   status: 'idle',
// };

// async componentDidUpdate(prevProps, prevState) {
//   const { API_KEY, PER_PAGE, page, request, pictures } = this.state;

//   if (request !== prevState.request || page !== prevState.page) {
//     this.setState({ status: 'pending' });

//     // setTimeout( () => {

//     fetch(
//       `https://pixabay.com/api/?key=${API_KEY}&q=${request}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${page}`
//     )
//       .then(res => {
//         if (res.ok) {
//           return res.json();
//         }
//       })
//       .then(res => {
//         if (res.hits.length === 0) {
//           this.setState({ status: 'nothingFound' });
//           return;
//         }
//         this.setState({
//           pictures: [...pictures, ...res.hits],
//           totalPictures: res.total,
//           status: 'resolved',
//           isLoadMoreBtn: true,
//         });
//       })
//       .catch(error => {
//         console.log('error is:', error);
//         this.setState({ status: 'rejected' });
//       });

//     // }, 1000)
//   }
// }

// saveRequest = newRequest => {
//   const { request } = this.state;
//   if (newRequest !== request) {
//     this.setState({ request: newRequest, page: 1, pictures: [] });
//   }
// };

// toggleModal = () => {
//   this.setState(({ showModal }) => ({
//     showModal: !showModal,
//   }));
// };

// pictureToModal = largeImageURL => {
//   this.setState({ largeImageURL: largeImageURL });
//   this.toggleModal();
// };

// showLoadMoreBtn = () => {
//   this.setState({ isLoadMoreBtn: true });
// };

// toNextPage = () => {
//   this.setState(prevState => ({
//     page: prevState.page + 1,
//   }));
// };

// render() {
//   const {
//     request,
//     showModal,
//     largeImageURL,
//     isLoadMoreBtn,
//     status,
//     pictures,
//     totalPictures,
//   } = this.state;

// return (
//   <div className={css.App}>
//     <Searchbar saveRequest={this.saveRequest}></Searchbar>

//     {pictures.length > 0 && (
//       <ImageGallery
//         openModal={this.pictureToModal}
//         showLoadMoreBtn={this.showLoadMoreBtn}
//         pictures={pictures}
//       ></ImageGallery>
//     )}

//     {status === 'pending' && (
//       <div className={css.Loader}>
//         <Audio
//           height="200"
//           width="200"
//           radius="15"
//           color="blue"
//           ariaLabel="five-dots-loading"
//           wrapperStyle
//           wrapperClassName="css.Loader_container"
//         />
//       </div>
//     )}

//     {status === 'nothingFound' && (
//       <p> There are no pictures found by your request "{request}"</p>
//     )}

//     {status === 'rejected' && (
//       <p>
//         The servise couldn't find any pictures. Reload the page and try to
//         again.
//       </p>
//     )}

//     {isLoadMoreBtn &&
//       pictures.length < totalPictures &&
//       status !== 'pending' && (
//         <LoadMoreBtn onClick={this.toNextPage}></LoadMoreBtn>
//       )}

//     {showModal && (
//       <Modal largeImageURL={largeImageURL} toggleModal={this.toggleModal} />
//     )}
//   </div>
// );
// }
// }
