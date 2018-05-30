import React from 'react';
import {render} from 'react-dom';
import App from './App';

import {Form} from 'uiex';
Form.setDefaultStyle({backgroundColor: '#f1f1f1', padding: '15px'})

render(<App/>, document.getElementById('root'));