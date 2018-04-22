import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

/**
 * Assets - Styles
 */
import './public';

import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
