/* @flow */
/* eslint-disable prefer-const */
/* jshint esversion: 6 */

import React, { Component } from 'react'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Global from '../assets/Global'

class PaymentMode extends Component {

  constructor(props:Object, state:Object):void {
    super(props)
    this.state = {
      current: this.props.current,
      available: this.props.available,
      visible: this.props.visible
    }
  }

  render():any {
    /*SHOW ME*/Global.console('- PaymentMode.render()', Global.PAGE_COLORS.PAYMENT_MODE, {paymentMode: this.props.current})
    return (
      <div className={"filter payment"}>
        <div className={"title"}>Payment Mode</div>
        <ul>
          {this._getList()}
        </ul>
      </div>
    )
  }


  // -- VIEWS

  _getList():any
  {
    const available:Array<Object> = this.props.available || []
    const visible:Array<Object> = this.props.visible || []
    return (
      visible.map((mode:string, i:number):any => {
        var payMode:Object = _.find(available,(obj)=>obj.name===mode)
        return (
          <li
            key={"payment-"+i}
            onClick={(e:Object):void => this._update(e,mode)}
            className={(this.state.current === mode)?'selected':''}>
            <FontAwesomeIcon icon={['fab','cc-'+mode.toLowerCase()]} />
            {Global.ucfirst(mode)}
            <i>{payMode&&payMode.count}</i>
          </li>
        )
      })
    ) || null
  }


  // -- CONTROLLERS

  _update(e:Object, mode:string):void
  {
    /*SHOW ME*/Global.console('- PaymentMode._update()', Global.PAGE_COLORS.PAYMENT_MODE, mode)
    mode = this.state.current === mode ? null : mode
    this.setState({current: mode}, ():void => {
      this.props.update(mode)
    })
  }

}

export default PaymentMode
