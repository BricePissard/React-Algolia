/* @flow */
/* eslint-disable prefer-const */
/* jshint esversion: 6 */

import React, { Component } from 'react';
import _ from 'lodash';
import Pagination from 'react-js-pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Global from '../assets/Global';

class ResultList extends Component {

  constructor(props:Object, state:Object):void
  {
		try {
			/*SHOW ME*///Global.console('- ResultList.constructor()', Global.PAGE_COLORS.RESULT_LIST);
			super(props);
	    this.state = this.getInitialState.call(this);
		} catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('ResultList.constructor().catch()', err);
      }
    }
  }

  getInitialState():Object
  {
    try {
			/*SHOW ME*///Global.console('- ResultList.getInitialState()', Global.PAGE_COLORS.RESULT_LIST);
      return {
        results: this.props.results,
        time: this.props.time,
        total: this.props.total,
        page: this.props.page,
        limit: this.props.limit,
        limitTotal: this.props.limitTotal,
        geo: this.props.geo
      };
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('ResultList.getInitialState().catch()', err);
      }
    }
    return {};
  }






  render():any
  {
    let list:Array<Object> = [];
    try {
      const page:number = this.state.page;
      const limit:number = this.props.limit;
      const total:number = this.props.total;
      const time:number = Math.round(this.props.time)/1000;
      //const from:number = page * limit;
      //const to:number = limit + (page * limit);
      const results = this.props.results && this.props.results.slice(0, limit);

      /*SHOW ME*/Global.console('- ResultList.render()', Global.PAGE_COLORS.RESULT_LIST, {results});

      results.map((resto:Object,i:number):void=>list.push(this._getRestaurant(resto,i)));

      return (
        <section className={"results"}>
          <h1>{total} results found <i>in {time}seconds</i></h1>
          {list}
          {this._getPagination()}
        </section>
      );
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('ResultList.render().catch()', err);
      }
    }
  }





  // -- VIEWS

  _getRestaurant(resto:Object, i:number):any
  {
    try {
      /*SHOW ME*///Global.console('- ResultList._getRestaurant()', Global.PAGE_COLORS.RESULT_LIST, resto);
      return (
        <a
          key={"resto-"+i}
          className={"result"}
          href={resto.reserve_url}
          target={"_blank"}>
          {this._getImage(resto)}
          {this._getDescription(resto)}
        </a>
      );
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('ResultList._getRestaurant().catch()', err);
      }
    }
  }

  _getImage(resto:Object):any
  {
    try {
      /*SHOW ME*///Global.console('- ResultList._getImage()', Global.PAGE_COLORS.RESULT_LIST, resto);
      return(
        <div className={"imgC"}>
          <img
            src={resto.image_url}
            alt={resto.name}
          />
        </div>
      );
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('ResultList._getImage().catch()', err);
      }
    }
  }

  _getDescription(resto:Object):any
  {
    try {
      const desc:string = resto.food_type + ' | ' + resto.area + ' | ' + resto.price_range || '';
      const review:string = '(' + resto.reviews_count + ' reviews)';
      /*SHOW ME*///Global.console('- ResultList._getDescription()', Global.PAGE_COLORS.RESULT_LIST);
      return(
        <article>
          <h3>{resto.name}</h3>
          <div>
            {resto.stars_count}
            <ul>{this._getRating(resto)}</ul>
            <span>{review}</span>
          </div>
          <span>{(_.size(desc)>55)?Global.truncate(desc,55):desc}</span>
          {this._getLocationPointer(resto)}
        </article>
      );
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('ResultList._getDescription().catch()', err);
      }
    }
  }

  _getRating(resto:Object):Array<Object>
  {
    let rating:Array<Object> = [];
    try {
      const rate:number = parseFloat(resto.stars_count);
      let pad:number = Math.round(rate*2)/2;
      /*SHOW ME*///Global.console('- ResultList._getRating()', Global.PAGE_COLORS.RESULT_LIST, {rate,pad});
      for (var i:number=0; i<5; i++) {
        rating.push(
          <li key={"starts-"+i} className={(pad>i)?'full':'empty'}>
            <FontAwesomeIcon icon={['fas',(pad-i===0.5)?'star-half':'star']} />
          </li>
        );
      }
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('ResultList._getRating().catch()', err);
      }
    }
    return rating;
  }

  _getLocationPointer(resto:Object):any
  {
    try {
      /*SHOW ME*///Global.console('- ResultList._getLocationPointer()', Global.PAGE_COLORS.RESULT_LIST);
      const distance:number = ((resto._geoloc && this.props.geo.latitude)?
        Math.round(Global.distance(
          resto._geoloc.lat,
          resto._geoloc.lng,
          this.props.geo.latitude,
          this.props.geo.longitude
        ) * 100 ) / 100
        :
        undefined
      );
      return (distance) ? (
        <em>
          <FontAwesomeIcon icon={['fas','map-marker']} />
          {distance} Km
        </em>
      ) : null;
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('ResultList._getLocationPointer().catch()', err);
      }
    }
  }

  _getPagination():any
  {
    try {
      const page:number = this.state.page;
      const limit:number = this.props.limit;
      const total:number = this.props.total;
      /*SHOW ME*///Global.console('- ResultList._getPagination()', Global.PAGE_COLORS.RESULT_LIST, {page,total,limit});
      return (total>0) ? (
        <div className={"paginationC"}>
          <Pagination
            hideFirstLastPages={false}
            pageRangeDisplayed={5}
            activePage={page}
            itemsCountPerPage={limit}
            totalItemsCount={total}
            onChange={this._onChange.bind(this)}
          />
        </div>
      ) : null;
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('ResultList._getPagination().catch()', err);
      }
    }
  }




  // -- CONTROLLERS

  _onChange(page:number):void
  {
    try {
      /*SHOW ME*///Global.console('- ResultList._onChange()', Global.PAGE_COLORS.RESULT_LIST, page);
      this.setState({page}, ():void => {
        this.props.setPage(page);
      });
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('ResultList._onChange().catch()', err);
      }
    }
  }
}

export default ResultList;
