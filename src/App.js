import React from 'react';
import './App.css';
import { Provider } from 'react-redux';

import store from './store';

import Main from './container/main';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <h1>Food Trucks</h1>
        <Main />
      </div>
    </Provider>
  );
}

export default App;
