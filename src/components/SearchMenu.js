/* @flow */
/* eslint-disable prefer-const */
/* jshint esversion: 6 */

import React, { Component } from 'react'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Global from '../assets/Global'
import Location from './Location'

class SearchMenu extends Component {

  _updateRender:boolean = false

  constructor(props:Object, state:Object):void {
    super(props)
    this.state = {
      query: this.props.query,
      isMenuHidden: this.props.isMenuHidden
    }
    this._onMenuClick = this._onMenuClick.bind(this)
    this._onSubmit = this._onSubmit.bind(this)
    this._onChange = this._onChange.bind(this)
  }

  shouldComponentUpdate(nextProps:Object, nextState:Object):boolean {
    return this._updateRender
  }

  render():any {
    /*SHOW ME*/Global.console('- SearchMenu.render()', Global.PAGE_COLORS.SEARCH_BAR, {query: this.props.query})
    return (
      <header>
        {this._getMenuButton()}
        {this._getForm()}
        {this._getLocation()}
      </header>
    )
  }


  // -- VIEWS

  /**
   * @see https://fontawesome.com/icons?d=gallery&q=menu
   */
  _getMenuButton():any {
    return (
      <button
        className={"menu"}
        onClick={this._onMenuClick}>
        <FontAwesomeIcon icon={['fas','bars']} />
      </button>
    )
  }

  _getForm():any {
    return (
      <form className={"restaurants"} onSubmit={this._onSubmit}>
        <input
          onChange={this._onChange}
          type={"text"}
          name={"searchQuery"}
          placeholder={"Search for Restaurants by Name, Cuisine, Location"}
          value={this.state.query}>
        </input>
      </form>
    )
  }

  _getLocation():any {
    return (
      <Location
        latitude={this.props.latitude}
        longitude={this.props.longitude}
        location={this.props.location}
        authorized={this.props.authorized}
        setLocation={this.props.setLocation}
      />
    )
  }
  

  // -- CONTROLLERS

	_onSubmit(e:Object):void {
    /*SHOW ME*/Global.console('- SearchMenu._onSubmit()', Global.PAGE_COLORS.SEARCH_BAR)
    e.preventDefault()
    if (this.state.query) {
      this.props.setSearch(this.state.query)
    }
  }

  _onChange(e:Object):void {
    /*SHOW ME*/Global.console('- SearchMenu._onChange()', Global.PAGE_COLORS.SEARCH_BAR)
    e.preventDefault()
    let query:string = _.size(e.target.value) > 0 ? e.target.value : ''
    this.setState({query}, ():void => {
      this.props.setSearch(query)
    })
  }

  _onMenuClick(e:Object):void {
    e.preventDefault()
    this.setState({
      isMenuHidden: !this.state.isMenuHidden
    }, ():void => {
      this.props.setMenu(this.state.isMenuHidden)
    })
  }

}

export default SearchMenu
