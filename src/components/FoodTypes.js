/* @flow */
/* eslint-disable prefer-const */
/* jshint esversion: 6 */

import React, { Component } from 'react'
import Global from '../assets/Global'

class FoodTypes extends Component {

  constructor(props:Object, state:Object):void {
    super(props)
    this.state = {
      available: this.props.available,
      current: this.props.current,
      limit: this.props.limit
    }
  }


  render():any {
    /*SHOW ME*/Global.console('- FoodTypes.render()', Global.PAGE_COLORS.FOOD_TYPES, {foodType: this.props.current})
    return (
      <div className="food">
        <div className="title">{"Cuisine | Food Type"}</div>
        <ul>
          {this._getFoodList()}
        </ul>
      </div>
    )
  }


  // -- VIEWS

  _getFoodList():any {
    const limit:number = this.props.limit
    const foods:Array<Object> = this.props.available.slice(0, limit) || []
    /*SHOW ME*///Global.console('- FoodTypes._getFoodList()', Global.PAGE_COLORS.FOOD_TYPES, {foods,limit})
    return foods.map((food:Object, i:number):any =>
      <li
        key={ `food-${i}` }
        onClick={(e:Object):void => this._update(e,food)}
        className={ this.state.food === food.name ? 'selected' : '' }>
        <span>{food.name}</span>
        <i>{food.count}</i>
      </li>
    )
  }


  // -- CONTROLLERS

  _update(e:Object, food:Object):void {
    /*SHOW ME*/Global.console('- FoodTypes._update()', Global.PAGE_COLORS.FOOD_TYPES, food)
    food = this.state.food === food.name ? null : food.name || null
    this.setState({food}, ():void => {
      this.props.update(food)
    })
  }

}

export default FoodTypes
