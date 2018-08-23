/* @flow */
/* eslint-disable prefer-const */
/* jshint esversion: 6 */

import _ from "lodash";

const __DEV__:boolean = ((process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) ? false : true);
const _voidFunc:Function = ():void => {};

/**
 * replace the console.log() for debugging with a common function with colors.
 * @param {string} msg to display
 * @param {Object} colors to render, refers to the object Ex: {color:'#000', 'background:#FFF'}
 * @param {any}    data to display
 * @return {void}
 **/
const _console:Function = ( msg:string, colors:Object, data?:any ):void =>
{
  if ( __DEV__ ) {
    console.log(
      '%c ' + msg + ' ',
        'background: ' + ( ( _.has( colors, 'background' ) ) ? colors.background : '#FFFFFF' ) + '; ' +
        'color: '      + ( ( _.has( colors, 'color'      ) ) ? colors.color      : '#000000' ),
      ( ( data ) ? data : '' )
    );
    //const msg_str:string = Strings.parseMsg( msg );
    //if ( msg_str && Reactotron && _.has( Reactotron, 'log' ) ) {
    //  Reactotron.log( msg_str );
    //}
  }
};

const _exception:Function = (ex:Object, context?:Object = {}):void =>
{
  //if ( Raven && _.has( Raven, 'captureException' ) ) {
  //  Raven.captureException( ex, { extra: context });
  //}
  //if ( JSON && Analytics && _.has( Analytics, 'trackException' ) ) {
  //  Analytics.trackException( JSON.stringify( { ex, context } ) );
  //}
  if ( __DEV__ ) {
    console.warn(ex, context);
  }
};

/**
 * Set the first char of a string in upper case
 * @param {string} string to convert
 * @return {string} string result
 */
const _ucfirst:Function = (str:string=""):string =>
{
  return ((str)?str.charAt(0).toUpperCase()+str.slice(1).toLowerCase():str);
};

const _truncate:Function = (str:string, len:number):string =>
{
  if (str && str.length<=len){
    return str;
  }
  return str.substr( 0, len-1 ) + "...";
};

const _distance:Function =(lat1:number, lon1:number, lat2:number, lon2:number, unit:string='K'):number =>
{
	var radlat1:number = Math.PI * lat1/180;
	var radlat2:number = Math.PI * lat2/180;
	var theta:number = lon1-lon2;
	var radtheta:number = Math.PI * theta/180;
	var dist:number = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	if (dist > 1) {
		dist = 1;
	}
	dist = Math.acos(dist);
	dist = dist * 180/Math.PI;
	dist = dist * 60 * 1.1515;
	if (unit==="K") { dist = dist * 1.609344 }
	if (unit==="N") { dist = dist * 0.8684 }
	return dist;
}

export default {
  voidFunc  : _voidFunc,
  console   : _console,
  exception : _exception,
  ucfirst   : _ucfirst,
  truncate  : _truncate,
  distance  : _distance
};
