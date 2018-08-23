/* @flow */
/* eslint-disable prefer-const */
/* jshint esversion: 6 */

import Functions from "./Functions";
import Colors from './Colors';
const Global:Object = {
	DEBUG	: (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator)?false:true,

	ALGOLIA_APP_ID		: 'OG7U741TTE',
	ALGOLIA_APP_KEY		: '2614df083d210d87e7c6b113028ac73a',
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
