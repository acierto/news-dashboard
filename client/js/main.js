import React from 'react';
import ReactDOM from 'react-dom';

import Dashboard from './components/Dashboard';

ReactDOM.render(
    <Dashboard source="/news"/>, document.getElementById('app-container')
);