import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import { Router } from 'react-chrome-extension-router';
import Home from './popup/components/Home/Home';

ReactDOM.render(
    <Router>
        <Home />
    </Router>,
    document.getElementById('root')
)