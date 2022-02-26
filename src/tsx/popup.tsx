import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import { Router } from 'react-chrome-extension-router';
import Home from './popup/components/Home/Home';
import Bottombar from './popup/components/BottomBar/BottomBar';

ReactDOM.render(
    <>
        <Router>
            <Home />
        </Router>
        <div className="spacer"></div>
        <Bottombar />
    </>,
    document.getElementById('root')
)