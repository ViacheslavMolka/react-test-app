import React from 'react';
import '../css/main.css';
import 'antd/dist/antd.css';
import HeaderMenu from './header';
import Beers from './beers';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SinglePageBeer from './single-beer-page';

const App = () => {
  return (
    <Router>
      <div className="App">
        <HeaderMenu/>
        <Route path='/' render={() => <h1 className='text'>Welcome to react app!</h1>} exact/>
        <Route path='/beers/' exact component={Beers}/>
        <Route path='/beers/:id' exact render={({match}) => {
          const { id } = match.params;
          return <SinglePageBeer itemId={id}/>;
        }}/>
      </div>
    </Router>
  );
};

export default App;