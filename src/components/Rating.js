/* @flow */
/* eslint-disable prefer-const */
/* jshint esversion: 6 */

import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Global from '../assets/Global'

class Rating extends Component {

  constructor(props:Object, state:Object):void {
    super(props)
    this.state = {
      current: this.props.current || undefined,
      available: this.props.available
    }
  }

  render():any {
    /*SHOW ME*/Global.console('- Rating.render()', Global.PAGE_COLORS.RATING, {rate: this.state.current})
    return (
      <div className={"filter rating"}>
        <div className={"title"}>Rating</div>
        <ul>
          {this._getStars()}
        </ul>
      </div>
    )
  }


  // -- VIEWS

  _getStars():Array<Object> {
    let stars:Array<Object> = []
    const available:Array<number> = this.props.available || []
    const current:number = this.props.current
    for (var i:number=0; i<=5; i++) {
      stars.push(
        this._getStarsRow(available, current, i)
      )
    }
    return stars
  }

  _getStarsRow(available:Array<number>, current:number, i:number):any {
    return (
      <li
        key={`stars-${i}`}
        className={ this.state.current === i ? 'selected' : ''}
        onClick={(e:Object):void=>this._update(e,i)}>
          <span>
            {this._getStarElement(i,'empty')}
            {this._getStarElement(i,'full')}
          </span>
          <i>{(available[i])?available[i]:((current>=0)?'-':'0')}</i>
      </li>
    )
  }

  _getStarElement(rate:number, type:string='empty'):Array<Object> {
    let row:Array<Object> = []
    rate = type === 'empty' ? rate : 5-rate
    for (var i:number = 0; i < rate; i++) {
      row.push(
        <b key={ `star-${type}-${i}` } className={type}>
          <FontAwesomeIcon icon={['fas','star']} />
        </b>
      )
    }
    return row
  }


  // -- CONTROLLERS

  _update(e:Object, rate:number):void {
    /*SHOW ME*/Global.console('- Rating._update()', Global.PAGE_COLORS.RATING, rate)
    rate = this.state.current === rate ? undefined : rate
    this.setState({current: rate}, ():void => {
      this.props.update(rate)
    })
  }

}

export default Rating
