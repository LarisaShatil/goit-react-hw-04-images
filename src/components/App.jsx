import { Component } from "react";

import "../styles.css/styles.css";

import axios from "axios";

import SearchBar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
// import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";

const API_KEY = "23129630-9573c017c45744d32c0b55f39";

axios.defaults.baseURL = "http://pixabay.com/api/";

const fetchImage = (searchQuery, currentPage) => {
  return axios.get(
    `/?key=${API_KEY}&q=${searchQuery}&page=${currentPage + 1}&image_type=photo&orientation=landscape&per_page=12`
  )
    .then(({ data }) => data.hits);
};

const api = {
  fetchImage,
}


export class App extends Component {
  state = {
    arrayImages: [],
    searchQuery: "",
    currentPage: 0,
    isLoading: false,
    isOpen: false,
    currentImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImage();
    }
  }

  onSubmit = (text) => {
    this.setState({
      searchQuery: text,
      currentPage: 0,
      arrayImages: [],
      isLoading: true,
    })
  };

  fetchImage = () => {
    const { searchQuery, currentPage } = this.state;

    return api.fetchImage(searchQuery, currentPage).then((array) => {
      this.setState((prevState) => ({
        arrayImages: [...prevState.arrayImages, ...array],
        currentPage: currentPage + 1,
        isLoading: false
      }));

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    })
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      modalOpen: !prevState.modalOpen,
    }));
  };

  onModal = (object) => {
    this.setState({ currentImage: object });
    this.toggleModal();
  };

  render() {
    const {arrayImages, currentImage, isLoading, modalOpen} = this.state;
return (
    <div className="App"
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
    >
    <SearchBar onSubmit={this.onSubmit} />
    {arrayImages.length > 0 && (
      <>
              <ImageGallery
        arrayImages={arrayImages}
        onClick={this.onModal}
        imageClick={this.onModal}
      />
      <Button 
      text = {"Load more"}
        func={this.fetchImage}
      />
      </>

    )}
    {/* {isLoading && (
      <Loader
        className="Loader"
        type="TailSpin"
        height={100}
        width={100}
      />
    )} */}
    {modalOpen && (
      <Modal object={currentImage} onClose={this.toggleModal}>
        <img src={currentImage.largeImageURL} alt={currentImage.tags}/>
      </Modal>
    )}
    </div>
  );
  }
  
};
