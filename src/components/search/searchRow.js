const SearchRow = ({ symbol, name, onClick }) => (<div className="result-row" onClick={() => onClick(symbol)}>
      {name}
    </div>
);

export default SearchRow;
