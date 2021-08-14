import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchRow from './searchRow';
import './style.css';

const Search = ({ onSearch, searchResults = [] }) => {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const displaySearch = () => {
    setShowSearch(true);
  };
  const showResults = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(e.target.value);
  };

  const redirectToDetailPage = (query) => {
    history.push(`/${query}`);
    setSearchQuery('');
    onSearch('');
  };

  const onSearchButtonClick = () => {
    redirectToDetailPage(searchQuery);
  };

  const checkForEnter = (e) => {
    if (e.keyCode === 13 && searchQuery.length) {
      redirectToDetailPage(searchQuery);
    }
  };

  const closeSearchWindow = (e) => {
    if (showSearch) {
      const ele = e.target;
      const searchEle = document.getElementById('searchField');
      if (ele !== searchEle) {
        setShowSearch(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('click', closeSearchWindow);
    return () => {
      window.removeEventListener('click', closeSearchWindow);
    };
  }, []);

  return (
    <div className='search-container'>
      <div className="search-group">
        <input
            className={showSearch ? 'input-open' : ''}
            type="search"
            placeholder='Search'
            onFocus={displaySearch}
            onChange={showResults}
            onKeyUp={checkForEnter}
            id="searchField"
            autoComplete="off"
            key="input-search"
            value={searchQuery}
          />
          <button onClick={onSearchButtonClick} className="search-button">Search</button>
      </div>

      {
        !!searchQuery.length && showSearch && searchResults.length > 0
          && (
          <div className="result-container">
          {
            searchResults.map((record) => {
              const { name, symbol } = record;
              return (
                <SearchRow
                  name={name}
                  symbol={symbol}
                  onClick={redirectToDetailPage}
                  key={symbol}
                  />
              );
            })
          }
          </div>
          )}
    </div>
  );
};

export default Search;
