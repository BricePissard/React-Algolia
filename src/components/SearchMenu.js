/* @flow */
/* eslint-disable prefer-const */
/* jshint esversion: 6 */

import React, { Component } from 'react';
import _ from 'lodash';
import Global from '../assets/Global';
import Location from './Location';

class SearchMenu extends Component {

  _updateRender:boolean = false;

  constructor(props:Object, state:Object):void
  {
		try {
			/*SHOW ME*///Global.console('- SearchMenu.constructor()', Global.PAGE_COLORS.SEARCH_BAR);
			super( props );
	    this.state = this.getInitialState.call( this );
		} catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('SearchMenu.constructor().catch()', err);
      }
    }
  }

  shouldComponentUpdate(nextProps:Object, nextState:Object):boolean
  {
    return this._updateRender;
  }

  getInitialState():Object
  {
    try {
			/*SHOW ME*///Global.console('- SearchMenu.getInitialState()', Global.PAGE_COLORS.SEARCH_BAR);
      return {
        query: this.props.query,
      };
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('SearchMenu.getInitialState().catch()', err);
      }
    }
  }







  render():any
  {
    try {
      /*SHOW ME*/Global.console('- SearchMenu.render()', Global.PAGE_COLORS.SEARCH_BAR, {query: this.props.query});
      return (
        <header>
          <form className={"restaurants"} onSubmit={this._onSubmit.bind(this)}>
            <input
              onChange={this._onChange.bind(this)}
              type={"text"}
              name={"searchQuery"}
              placeholder={"Search for Restaurants by Name, Cuisine, Location"}
              value={this.state.query}>
            </input>
          </form>
          <Location
            latitude={this.props.latitude}
            longitude={this.props.longitude}
            location={this.props.location}
            authorized={this.props.authorized}
            setLocation={this.props.setLocation}
          />
        </header>
      );
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('SearchMenu.render().catch()', err);
      }
    }
  }







  // -- CONTROLLERS

	_onSubmit(e:Object):void
  {
    try {
      /*SHOW ME*/Global.console('- SearchMenu._onSubmit()', Global.PAGE_COLORS.SEARCH_BAR);
      e.preventDefault();
      if (this.state.query) {
        this.props.setSearch(this.state.query);
      }
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('SearchMenu._onSubmit().catch()', err);
      }
    }
  }

  _onChange(e:Object):void
  {
    try {
      /*SHOW ME*/Global.console('- SearchMenu._onChange()', Global.PAGE_COLORS.SEARCH_BAR);
      e.preventDefault();
      let query:string = ((e.target.value.length < 1)? "":e.target.value);
      this.setState({ query }, ():void => {
        this.props.setSearch(query);
      });
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('SearchMenu._onChange().catch()', err);
      }
    }
  }

}

export default SearchMenu
