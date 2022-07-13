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
    `/?key=${API_KEY}&q=${searchQuery}&page=${currentPage}&image_type=photo&orientation=landscape&per_page=12`
  )
    .then(({ data }) => data.hits);
};

export class App extends Component {
  state = {
    arrayImages: [],
    searchQuery: "",
    currentPage: 1,
    isLoading: false,
    isOpen: false,
    currentImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery || prevState.currentPage !== this.state.currentPage) {
      this.fetchImage();
    }
  }

  onSubmit = (text) => {
    this.setState({
      searchQuery: text,
      currentPage: 1,
      arrayImages: [],
      isLoading: true,
    })
  };

  fetchImage = () => {
    const { searchQuery, currentPage } = this.state;

    return fetchImage(searchQuery, currentPage).then((array) => {
      this.setState((prevState) => ({
        arrayImages: [...prevState.arrayImages, ...array],
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

  loadMore = () => { 
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1
    }));
  }

  render() {
    const {arrayImages, currentImage, isLoading, modalOpen} = this.state;
return (
    <div className="App">
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
        func={this.loadMore}
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
