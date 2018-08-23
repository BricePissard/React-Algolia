/* @flow */
/* eslint-disable prefer-const */
/* jshint esversion: 6 */

import React, { Component } from 'react';
import _ from 'lodash';
import Global from '../assets/Global';

class FoodTypes extends Component {

  constructor(props:Object, state:Object):void
  {
		try {
			/*SHOW ME*///Global.console('- FoodTypes.constructor()', Global.PAGE_COLORS.FOOD_TYPES);
			super(props);
	    this.state = this.getInitialState.call(this);
		} catch(err) {
      if (err && Global & _.has(Global, 'exception')) {
        Global.exception('FoodTypes.constructor().catch()', err);
      }
    }
  }

  getInitialState():Object
  {
    try {
			/*SHOW ME*///Global.console('- FoodTypes.getInitialState()', Global.PAGE_COLORS.FOOD_TYPES);
      return {
        available: this.props.available,
        current: this.props.current,
        limit: this.props.limit
      };
    } catch(err) {
      if (err && Global & _.has(Global, 'exception')) {
        Global.exception('FoodTypes.getInitialState().catch()', err);
      }
    }
    return {};
  }





  render():any
  {
    try {
      /*SHOW ME*/Global.console('- FoodTypes.render()', Global.PAGE_COLORS.FOOD_TYPES, {foodType: this.props.current});
      return (
        <div className="food">
          <div className="title">{"Cuisine | Food Type"}</div>
          <ul>
            {this._getFoodList()}
          </ul>
        </div>
      );
    } catch(err) {
      if (err && Global && _.has( Global, 'exception')) {
        Global.exception('FoodTypes.render().catch()', err);
      }
    }
  }






  // -- VIEWS

  _getFoodList():any
  {
    try {
      const limit:number = this.props.limit;
      const foods:Array<Object> = this.props.available.slice(0, limit) || [];
      /*SHOW ME*///Global.console('- FoodTypes._getFoodList()', Global.PAGE_COLORS.FOOD_TYPES, {foods,limit});
      return foods.map((food:Object, i:number):any => {
        return (
          <li
            key={"food-"+i}
            onClick={(e:Object):void => this._update(e,food)}
            className={(this.state.food === food.name)?'selected':''}>
            <span>{food.name}</span>
            <i>{food.count}</i>
          </li>
        );
      });
    } catch (err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('FoodTypes._getFoodList().catch()', err);
      }
    }
  }







  // -- CONTROLLERS

  _update(e:Object, food:Object):void
  {
    try {
      /*SHOW ME*/Global.console('- FoodTypes._update()', Global.PAGE_COLORS.FOOD_TYPES, food);
      food = ((this.state.food === food.name)? null:food && food.name || null);
      this.setState({food}, ():void => {
        console.log('herrr');
        this.props.update(food);
      });
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('FoodTypes._update().catch()', err);
      }
    }
  }

}

export default FoodTypes;
