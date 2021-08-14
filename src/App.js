import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import NavBar from './containers/navbar/elements';
import DetailPage from './containers/stock-details/elements/detailsPage';

function App() {
  return (<Router>
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
        <Switch>
          <Route exact path="/"></Route>
          <Route exact path="/:symbol" render={({ match }) => <DetailPage symbol={match.params.symbol}/>}></Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
