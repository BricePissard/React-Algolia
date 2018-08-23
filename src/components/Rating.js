/* @flow */
/* eslint-disable prefer-const */
/* jshint esversion: 6 */

import React, { Component } from 'react';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Global from '../assets/Global';

class Rating extends Component {

  constructor(props:Object, state:Object):void
  {
		try {
			/*SHOW ME*///Global.console('- Rating.constructor()', Global.PAGE_COLORS.RATING);
			super(props);
	    this.state = this.getInitialState.call(this);
		} catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('Rating.constructor().catch()', err);
      }
    }
  }

  getInitialState():Object
  {
    try {
			/*SHOW ME*///Global.console('- Rating.getInitialState()', Global.PAGE_COLORS.RATING);
      return {
        current: this.props.current || undefined,
        available: this.props.available
      };
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('Rating.getInitialState().catch()', err);
      }
    }
    return {};
  }







  render():any
  {
    try {
      /*SHOW ME*/Global.console('- Rating.render()', Global.PAGE_COLORS.RATING, {rate: this.state.current});
      return (
        <div className={"filter rating"}>
          <div className={"title"}>Rating</div>
          <ul>
            {this._getStars()}
          </ul>
        </div>
      );
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception( 'Rating.render().catch()', err);
      }
    }
  }







  // -- VIEWS

  _getStars():Array<Object>
  {
    let stars:Array<Object> = [];
    try {
      const available:Array<number> = this.props.available || [];
      const current:number = this.props.current;
      /*SHOW ME*///Global.console('- Rating._getStars()', Global.PAGE_COLORS.RATING);
      for (var i:number=0; i<=5; i++) {
        stars.push(
          this._getStarsRow(available, current, i)
        )
      }
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('Rating._getStars().catch()', err);
      }
    }
    return stars;
  }

  _getStarsRow(available:Array<number>, current:number, i:number):any
  {
    try {
      /*SHOW ME*///Global.console('- Rating._getStarsRow()', Global.PAGE_COLORS.RATING, type);
      return (
        <li
          key={"stars-"+i}
          className={((this.state.current === i)?'selected':'')}
          onClick={(e:Object):void=>this._update(e,i)}>
            {this._getStarElement(i,'empty')}
            {this._getStarElement(i,'full')}
            <i>{(available[i])?available[i]:((current>=0)?'-':'0')}</i>
        </li>
      );
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('Rating._getStarsRow().catch()', err);
      }
    }
  }

  _getStarElement(rate:number, type:string='empty'):Array<Object>
  {
    let row:Array<Object> = [];
    try {
      /*SHOW ME*///Global.console('- Rating._getStarElement()', Global.PAGE_COLORS.RATING, type);
      rate = ((type==='empty')?rate:5-rate);
      for (var i:number = 0; i < rate; i++) {
        row.push(
          <b key={"star-"+type+"-"+i} className={type}>
            <FontAwesomeIcon icon={['fas','star']} />
          </b>
        );
      }
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('Rating._getStarElement().catch()', err);
      }
    }
    return row;
  }






  // -- CONTROLLERS

  _update(e:Object, rate:number):void
  {
    try {
      /*SHOW ME*/Global.console('- Rating._update()', Global.PAGE_COLORS.RATING, rate);
      rate = ((this.state.current===rate)?undefined:rate);
      this.setState({current: rate}, ():void => {
        this.props.update(rate);
      });
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('Rating._update().catch()', err);
      }
    }
  }

}

export default Rating;
