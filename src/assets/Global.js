/* @flow */
/* eslint-disable prefer-const */
/* jshint esversion: 6 */

import Functions from "./Functions";
import Colors from './Colors';
const Global:Object = {
	DEBUG	: (process.env.NODE_ENV==='production'&&'serviceWorker' in navigator)?false:true,

	//ALGOLIA_APP_ID		: 'OG7U741TTE',
	//ALGOLIA_APP_KEY		: '2614df083d210d87e7c6b113028ac73a',
	//ALGOLIA_APP_ID		: 'ID360RUO8Y',
	//ALGOLIA_APP_KEY		: '80cfd2b956df0310fe929f5b21834925',
	ALGOLIA_APP_ID		: 'GIL2VR83ON',
	ALGOLIA_APP_KEY		: '5a92fa56d1fe9029579f4753d89da660',

	ALGOLIA_APP_INDEX	: 'restaurants',

	PAGE_COLORS 	: Colors.PAGE_COLORS,

	console   : Functions.console,
  exception : Functions.exception,
  voidFunc  : Functions.voidFunc,
	ucfirst		: Functions.ucfirst,
	truncate	: Functions.truncate,
	distance	: Functions.distance
};

export default Global;
