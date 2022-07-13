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
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">🔎</span>
          </button>

          <input
            className="SearchForm-input"
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
