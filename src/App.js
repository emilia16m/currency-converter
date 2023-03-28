import React, { useState } from 'react';
import Descr from './components/descr/descr'
import './App.css';
import Wrapper from './components/wrapper';
import Forms from './components/form/form';

function App() {
  const [errorMessage, setErrorMessege] = useState(false);
  return (
    <div className="App">
      <div className="app_wrapper">
        <Descr />
        <div className="exchange">
          <div className="container">
            <Wrapper errorMessage={errorMessage} setErrorMessege={setErrorMessege}/>
          </div>
        </div>
        <Forms />
        <div className={errorMessage ? 'error_message' : 'none'}>
          <div className="container">
            <div className="error_descr">This pair is disabled now</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
