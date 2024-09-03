import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '../Loader/Loader';
import { fetchPhotos } from '../../sevices/gallery-api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Modal from 'react-modal';
import ImageModal from '../ImageModal/ImageModal';
import css from './App.module.css';

Modal.setAppElement('#root');

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(999);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);
  const [modalOpen, setIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    if (topic === "") return;

    async function getPhotos() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetchPhotos(topic, page);
        setPhotos((prevState) => [...prevState, ...res.photos]);
        setTotalPages(res.totalPages);
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false);
      }
    }

    getPhotos();
  }, [topic, page]);
  useEffect(() => {
    if (page === 1) return;

    async function loadMorePhotos() {
      try {
        setLoadingMore(true);
        const res = await fetchPhotos(topic, page);
        setPhotos((prevState) => [...prevState, ...res.photos]);
        setTotalPages(res.totalPages);
      } catch (error) {
        setError(true);
      
      } finally {
        setLoadingMore(false);
      }
    }

    loadMorePhotos();
  }, [page]);


  const handleSearch = (newTopic) => {
    setTopic(newTopic);
    setPage(1);
    setPhotos([]);
  };

  const handleLoadMore = () => {
    if (page < totalPages && !loadingMore) {
      setPage((prevPage) => prevPage + 1);
    }
  
  };

  const openModal = (image) => {
    setSelectedPhoto(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />
      {loading && <Loader />}
      
      {error ? (
        <ErrorMessage message="Failed to load photos. Please try again later." />
      ) : (
        <>
          {photos.length > 0 && (
            <ImageGallery images={photos} onImageClick={openModal} />
          )}
          {!loadingMore && page < totalPages && photos.length > 0 && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
          {loadingMore && <Loader />}
      
        </>
      )}
      
     
      
      <ImageModal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        selectedImage={selectedPhoto}
      />
    </div>
  );
}