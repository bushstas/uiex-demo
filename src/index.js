import React from 'react';
import {render} from 'react-dom';
import App from './App';

import {setDefaultStyleFor} from 'uiex';
setDefaultStyleFor('Icon', {color: 'red', fontSize: 33});

render(<App/>, document.getElementById('root'));