import { useState } from 'react';
import Search from '../../../components/search';
import { DEBOUNCE_INTERVAL } from '../../../constants';
import service from '../../../service';
import { debounce } from '../../../utils';
import '../styles/index.css';

function NavBar() {
  const [searchResults, setSearchResults] = useState([]);

  const onSearch = (searchQuery) => {
    if (!searchQuery.length) {
      setSearchResults([]);
    } else {
      service.getStockSymbols(searchQuery).then((data) => {
        if (data && data?.bestMatches.length) {
          const formattedSearchResults = data.bestMatches.map(((item) => ({ symbol: item['1. symbol'], name: item['2. name'] })));
          setSearchResults(formattedSearchResults);
        } else if (searchResults.length) {
          setSearchResults([]);
        }
      });
    }
  };

  const onSearchDebounced = debounce(onSearch, DEBOUNCE_INTERVAL);

  return (<div className="navbar-container">
        <h1>Stock Picker Widget</h1>
        <Search onSearch={onSearchDebounced} searchResults={searchResults} />
    </div>);
}

export default NavBar;
