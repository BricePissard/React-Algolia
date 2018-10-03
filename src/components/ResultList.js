/* @flow */
/* eslint-disable prefer-const */
/* jshint esversion: 6 */

import React, { Component } from 'react'
import _ from 'lodash'
import Pagination from 'react-js-pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Global from '../assets/Global'

class ResultList extends Component {

  constructor(props:Object, state:Object):void {
    super(props)
    this.state = {
      results: this.props.results,
      time: this.props.time,
      total: this.props.total,
      page: this.props.page,
      limit: this.props.limit,
      limitTotal: this.props.limitTotal,
      geo: this.props.geo,
      isMenuHidden: this.props.isMenuHidden
    }
    this._onControlMenu = this._onControlMenu.bind(this)
    this._onChange = this._onChange.bind(this)
  }

  render():any {
    const limit:number = this.props.limit
    const results = this.props.results && this.props.results.slice(0, limit)
    let list:Array<Object> = []
    /*SHOW ME*/Global.console('- ResultList.render()', Global.PAGE_COLORS.RESULT_LIST, {results})
    results.map((resto:Object,i:number):void => list.push(this._getRestaurant(resto, i)))
    return (
      <section
        className={"results"}
        onClick={this._onControlMenu}>
        {this._getTitle()}
        { _.size(list) > 0 ? list : this._getEmptyList() }
        {this._getPagination()}
      </section>
    )
  }


  // -- VIEWS

  _getTitle():any {
    const total:number = this.props.total
    const time:number = Math.round(this.props.time)/1000
    return (
      <h1>{total} results found <i>in {time}seconds</i></h1>
    )
  }

  _getEmptyList():any {
    return (
      <div className={"emptyList"}>
        <h3>No Restaurants found</h3>
        <h5>Please affinates your request with filters</h5>
      </div>
    )
  }

  _getRestaurant(resto:Object, i:number):any {
    return (
      <a
        key={"resto-"+i}
        className={"result"}
        href={resto.reserve_url}
        target={"_blank"}>
        {this._getImage(resto)}
        {this._getDescription(resto)}
      </a>
    )
  }

  _getImage(resto:Object):any {
    return(
      <div className={"imgC"}>
        <img
          src={resto.image_url}
          alt={resto.name}
        />
      </div>
    )
  }

  _getDescription(resto:Object):any {
    const desc:string = resto.food_type + ' | ' + resto.area + ' | ' + resto.price_range || ''
    const review:string = '(' + resto.reviews_count + ' reviews)'
    /*SHOW ME*///Global.console('- ResultList._getDescription()', Global.PAGE_COLORS.RESULT_LIST)
    return(
      <article>
        <h3>{resto.name}</h3>
        <div>
          {resto.stars_count}
          <ul>{this._getRating(resto)}</ul>
          <span>{review}</span>
        </div>
        <span>{ _.size(desc) > 55 ? Global.truncate(desc, 55) : desc }</span>
        {this._getLocationPointer(resto)}
      </article>
    )
  }

  _getRating(resto:Object):Array<Object> {
    let rating:Array<Object> = []
    const rate:number = parseFloat(resto.stars_count)
    let pad:number = Math.round(rate * 2) / 2
    for (var i:number=0; i<5; i++) {
      rating.push(
        <li key={ `starts-${i}` } className={ pad > i ? 'full' : 'empty' }>
          <FontAwesomeIcon icon={['fas', pad-i === 0.5 ? 'star-half' : 'star']} />
        </li>
      )
    }
    return rating
  }

  _getLocationPointer(resto:Object):any {
    const distance:number = ( resto._geoloc && this.props.geo.latitude ?
      Math.round(Global.distance(
        resto._geoloc.lat,
        resto._geoloc.lng,
        this.props.geo.latitude,
        this.props.geo.longitude
      ) * 100 ) / 100 : undefined
    )
    return distance ?
    <em>
      <FontAwesomeIcon icon={['fas', 'map-marker']} />
      {distance} Km
    </em> : null
  }

  _getPagination():any {
    const page:number = this.state.page
    const limit:number = this.props.limit
    const total:number = this.props.total
    return total > 0 ?
    <div className={"paginationC"}>
      <Pagination
        hideFirstLastPages={this.props.isMenuHidden}
        pageRangeDisplayed={5}
        activePage={page}
        itemsCountPerPage={limit}
        totalItemsCount={total}
        onChange={this._onChange}
      />
    </div> : null
  }


  // -- CONTROLLERS

  _onChange(page:number):void {
    this.setState({page}, ():void => {
      this.props.setPage(page)
    })
  }

  _onControlMenu(e:Object):void {
    const width:number = window.innerWidth
    if (width <= 640 && this.state.isMenuHidden === false) {
      e.preventDefault()
      /*SHOW ME*/Global.console('- ResultList._onControlMenu()', Global.PAGE_COLORS.RESULT_LIST)
      this.setState({
        isMenuHidden: !this.state.isMenuHidden
      }, ():void => {
        this.props.setMenu(
          this.state.isMenuHidden
        )
      })
    }
  }

}

export default ResultList
