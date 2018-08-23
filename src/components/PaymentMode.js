/* @flow */
/* eslint-disable prefer-const */
/* jshint esversion: 6 */

import React, { Component } from 'react';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Global from '../assets/Global';

class PaymentMode extends Component {

  constructor(props:Object, state:Object):void
  {
		try {
			/*SHOW ME*///Global.console('- PaymentMode.constructor()', Global.PAGE_COLORS.PAYMENT_MODE);
			super(props);
	    this.state = this.getInitialState.call(this);
		} catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('PaymentMode.constructor().catch()', err);
      }
    }
  }

  getInitialState():Object
  {
    try {
			/*SHOW ME*///Global.console('- PaymentMode.getInitialState()', Global.PAGE_COLORS.PAYMENT_MODE);
      return {
        current: this.props.current,
        available: this.props.available,
        visible: this.props.visible
      };
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('PaymentMode.getInitialState().catch()', err);
      }
    }
    return {};
  }







  render():any
  {
    try {
      /*SHOW ME*/Global.console('- PaymentMode.render()', Global.PAGE_COLORS.PAYMENT_MODE, {paymentMode: this.props.current});
      return (
        <div className={"filter payment"}>
          <div className={"title"}>Payment Mode</div>
          <ul>
            {this._getList()}
          </ul>
        </div>
      );
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('PaymentMode.render().catch()', err);
      }
    }
  }





  // -- VIEWS

  _getList():any
  {
    try {
      const available:Array<Object> = this.props.available || [];
      const visible:Array<Object> = this.props.visible || [];
      /*SHOW ME*///Global.console('- PaymentMode._getList()', Global.PAGE_COLORS.PAYMENT_MODE, {available,visible});
      return (
        visible.map((mode:string, i:number):any => {
          var payMode:Object = _.find(available,(obj)=>obj.name===mode);
          return (
            <li
              key={"payment-"+i}
              onClick={(e:Object):void => this._update(e,mode)}
              className={(this.state.current === mode)?'selected':''}>
              <FontAwesomeIcon icon={['fab','cc-'+mode.toLowerCase()]} />
              {Global.ucfirst(mode)}
              <i>{payMode&&payMode.count}</i>
            </li>
          );
        })
      ) || null;
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('PaymentMode._getList().catch()', err);
      }
    }
  }





  // -- CONTROLLERS

  _update(e:Object, mode:string):void
  {
    try {
      /*SHOW ME*/Global.console('- PaymentMode._update()', Global.PAGE_COLORS.PAYMENT_MODE, mode);
      mode = ((this.state.current === mode)?null:mode);
      this.setState({current: mode}, ():void => {
        this.props.update(mode);
      });
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('PaymentMode._update().catch()', err);
      }
    }
  }
}

export default PaymentMode;
