import React from 'react';
import {render} from 'react-dom';
import App from './App';

import {addClassStyle, addClassStyles} from 'uiex';
addClassStyle('Section', 'colored', {color: 'red'});
addClassStyles('Section', 'colored', {caption: {color: 'blue'}});

render(<App/>, document.getElementById('root'));