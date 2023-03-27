import React from 'react';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { StateContextProvider } from './context';
import App from './App';
import './index.css';

const root = document.getElementById('root');

render(
  <ThirdwebProvider desiredChainId={ChainId.Goerli}> 
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>,
  root
);