import { Component } from "react";

import "../styles.css/styles.css";
import fetchImage from "../services/services";

import SearchBar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";
import Loader from "./Loader/Loader";
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
    {isLoading && (
      <Loader
      />
    )}
    {modalOpen && (
      <Modal object={currentImage} onClose={this.toggleModal}>
        <img src={currentImage.largeImageURL} alt={currentImage.tags}/>
      </Modal>
    )}
    </div>
  );
  }
  
};
