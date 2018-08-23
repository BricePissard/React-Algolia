/* @flow */
/* eslint-disable prefer-const */
/* jshint esversion: 6 */

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Global from './assets/Global';
import registerServiceWorker from './registerServiceWorker';

/**
 * @see https://fontawesome.com/icons?d=gallery&m=free
 */
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fab, fas, far);

/*SHOW ME*/Global.console('- Index', Global.PAGE_COLORS.INDEX);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
