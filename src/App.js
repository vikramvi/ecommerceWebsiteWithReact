import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from "@fortawesome/free-solid-svg-icons";


function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">column number one</div>
        <div className="col-6">
          <span>
            <i className="fas fa-home" />
            <FontAwesomeIcon icon={faHome} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
