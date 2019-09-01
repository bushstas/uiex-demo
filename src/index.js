import React from 'react';
import {render} from 'react-dom';
import App from './App';
import Test from './Test';
import AppDemo from './AppDemo';
import {Loader} from 'uiex/Loader';

import {addThemes, setDefaultStyles, setDefaultProps} from 'uiex';
// addThemes(Loader, 'colored', {mask: 'background-color: red'});
// setDefaultProps(Loader, {theme: 'colored'});
// setDefaultStyles(Loader, {mask: 'border: 10px solid #000'});
const loc = window.location.toString();
if (/\/appdemo\.html$/.test(loc.split('#')[0])) {
    render(<AppDemo />, document.getElementById('root'));
} else {
    // render(<App />, document.getElementById('root'));
    render(<Test />, document.getElementById('root'));
}