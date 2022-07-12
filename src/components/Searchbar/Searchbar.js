import { Component } from 'react';

class SearchBar extends Component{

  state = {
    searchQuery: ''
  };

  onInput = (event) => {
    this.setState({
      searchQuery: event.target.value
    })
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ searchQuery: '' });
    this.props.onSubmit(this.state.searchQuery.trim())
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.onSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.onInput}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
