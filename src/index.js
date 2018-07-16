import React from 'react';
import {render} from 'react-dom';
import App from './App';

import {addClassStyle, addClassStyles, setDefaultStyles} from 'uiex';
addClassStyle('Section', 'colored', {color: 'red'});
addClassStyles('Section', 'colored', {caption: {color: 'blue'}});

addClassStyles('Section', 'transparent', {main:{backgroundColor: 'transparent', marginBottom: 20}});

//setDefaultStyles('Modal', {main: {boxShadow: '0 0 30px red'},header: {backgroundColor: '#000', color: '#fff'}, footer: {backgroundColor: '#000', color: '#fff'},body: {backgroundColor: '#000', color: '#fff'},controls: {backgroundColor: '#000', color: '#fff'}})

render(<App/>, document.getElementById('root'));