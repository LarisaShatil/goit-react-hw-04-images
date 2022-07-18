import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

import "../styles.css/styles.css";
import fetchImage from "../services/services";

import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";
import Loader from "./Loader/Loader";

const App = () => {
  const [arrayImages, setArrayImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    } else {
         getImages();

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }   
  }, [searchQuery, currentPage]);

  useEffect(() => {
    if (searchQuery && arrayImages.length === 0 && isLoading === false) {
      toast.error('Try again and you will succeed!');
    }
  }, [searchQuery, arrayImages, isLoading]);

  const onSubmit = (text) => {
     if (text.length === 0) {
      toast.error('Try again and you will succeed!');
      setSearchQuery('');
    setCurrentPage(1);
    setArrayImages([]);
      return;
    }

    setSearchQuery(text);
    setCurrentPage(1);
    setArrayImages([]);
    setIsLoading(true);
  };

  const getImages = () => {
    return fetchImage(searchQuery, currentPage).then((array) => {
      setArrayImages(prev => [...prev, ...array]);
      setIsLoading(false);
    })
  };

  const toggleModal = () => {
    setIsOpen(prev => !prev)
  };

  const onModal = (obj) => {
    setCurrentImage(obj);
    toggleModal();
  };

  const loadMore = () => {
    setCurrentPage(prev => prev + 1)
  };


  return (
    <div className="App">
      <SearchBar onSubmit={onSubmit} />
       <Toaster position="right top"/>
      {arrayImages.length > 0 && (
        <>
          <ImageGallery
            arrayImages={arrayImages}
            onClick={onModal}
            imageClick={onModal}
          />
          <Button
            text={"Load more"}
            func={loadMore}
          />
        </>

      )}
      {isLoading && (
        <Loader
        />
      )}
      {isOpen && (
        <Modal object={currentImage} onClose={toggleModal}>
          <img src={currentImage.largeImageURL} alt={currentImage.tags} />
        </Modal>
      )}
    </div>
  )
};

export default App;