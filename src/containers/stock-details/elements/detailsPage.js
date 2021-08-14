import { useEffect, useState, useRef } from 'react';
import ListItem from '../../../components/listItem';
import Loader from '../../../components/loader';
import Select from '../../../components/select';
import { REFRESH_INTERVAL } from '../../../constants';
import service from '../../../service';
import '../styles/index.css';

const REQUIRED_KEYS = ['Name', 'Symbol', 'Description', 'Industry', 'PERatio', 'MarketCapitalization'];

const DetailPage = ({ symbol }) => {
  const [detailsData, setDetailsData] = useState({});
  const [refreshInterval, setRefreshInterval] = useState(REFRESH_INTERVAL[0].key);
  const [isLoading, setIsLoading] = useState(true);
  const [showNoDetailsFound, setShowNoDetailsFound] = useState(false);
  const ref = useRef(null);

  const fetchInitialData = () => {
    setIsLoading(true);
    setDetailsData({});
    service.fetchDetails(symbol).then((metaData) => {
      if (metaData && metaData.Symbol) {
        const filteredMetaData = REQUIRED_KEYS.reduce((acc, item) => {
          // eslint-disable-next-line no-param-reassign
          acc[item] = metaData[item];
          return acc;
        }, {});
        setDetailsData((prevState) => ({ ...prevState, ...filteredMetaData }));
      }
      setIsLoading(false);
    });
    service.fetchPriceAndChange(symbol).then((priceData) => {
      const globalQuote = priceData['Global Quote'];
      if (globalQuote && globalQuote['05. price']) {
        const formattedPriceData = { price: globalQuote['05. price'], change: globalQuote['09. change'] };
        setDetailsData((prevState) => ({ ...prevState, ...formattedPriceData }));
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchInitialData();
  }, [symbol]);

  useEffect(() => {
    if (Object.keys(detailsData).length === 0 && !isLoading) {
      setShowNoDetailsFound(true);
    } else {
      setShowNoDetailsFound(false);
    }
  }, [isLoading && detailsData]);

  useEffect(() => {
    if (ref.current) {
      clearInterval(ref.current);
    }
    ref.current = setInterval(() => {
      fetchInitialData();
    }, refreshInterval * 10000);
    return () => {
      clearInterval(ref.current);
    };
  }, [refreshInterval]);

  const setRefreshIntervalValue = (e) => {
    setRefreshInterval(e.target.value);
  };

  if (isLoading) {
    return <Loader />;
  }
  if (showNoDetailsFound) {
    return <div className="error-message"> Sorry! No Details Found</div>;
  }

  return (
  <div className="detail-container">
    <ul className="detail-list">
      {Object.keys(detailsData).map((key) => (
        <ListItem name={key} value={detailsData[key]} />
      ))}
    </ul>
    <div className="refresh-data-dropdown">
      <span className="refersh-text">Refresh Data in:</span>
      <Select record={REFRESH_INTERVAL} onChange={setRefreshIntervalValue} />
    </div>
  </div>);
};

export default DetailPage;
