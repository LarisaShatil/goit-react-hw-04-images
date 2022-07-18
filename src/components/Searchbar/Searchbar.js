import { useState } from 'react';


const SearchBar = ({ onSubmit }) => {
  const [inputQuery, setInputQuery] = useState('');

  const onInput = (e) => {
    setInputQuery(e.target.value);
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();

    const text = inputQuery.trim();
    onSubmit(text);

    setInputQuery('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onHandleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">🔎</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputQuery}
          onChange={onInput}
        />
      </form>
    </header>
  )

};

export default SearchBar;
