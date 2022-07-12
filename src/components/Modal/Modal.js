import { Component } from 'react';

class Modal extends Component { 
  state = {};

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown)
  }

  handleKeyDown(event) {
    if (event.code === "Escape"){
      this.props.onClose();
    }
  };

  onBackdropClose = (event) => { 
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className="Overlay" onClick={this.onBackdropClose}>
        <div className="Modal">{ this.props.children}</div>
      </div>
    )
   }
}

export default Modal;