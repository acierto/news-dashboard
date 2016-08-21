import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';

import Dashboard from './components/Dashboard';

ReactDOM.render(
    <Dashboard source="/news"/>, document.getElementById('app-container')
);