/* @flow */
/* eslint-disable prefer-const */
/* jshint esversion: 6 */

import React, { Component } from 'react'
import _ from 'lodash'
import algoliasearchHelper from 'algoliasearch-helper'
import algoliasearch from 'algoliasearch'
import SearchMenu from './components/SearchMenu'
import FoodTypes from './components/FoodTypes'
import Rating from './components/Rating'
import PaymentMode from './components/PaymentMode'
import ResultList from './components/ResultList'
import Global from './assets/Global'

import './App.css'

class App extends Component {

  _updateRender:boolean = false

  constructor(props:Object, state:Object):void {
    super(props)
    this.state            = this.getInitialState.call(this)
    this._setSearch       = this._setSearch.bind(this)
    this._setLocation     = this._setLocation.bind(this)
    this._setMenu         = this._setMenu.bind(this)
    this._setFoodType     = this._setFoodType.bind(this)
    this._setRating       = this._setRating.bind(this)
    this._setPaymentMode  = this._setPaymentMode.bind(this)
    this._setPage         = this._setPage.bind(this)
    this._setMenu         = this._setMenu.bind(this)
    this._setResults      = this._setResults.bind(this)
  }

  getInitialState():Object {
    return {
      index: undefined,
      client: undefined,
      isMenuHidden: false,
      // -- search menu
      search: {
        query: '',
        time: 0,
        results: [],
        total: 0,
      },
      // -- location
      geo: {
        latitude: undefined,
        longitude: undefined,
        location: undefined,
        authorized: undefined,
      },
      // -- food type
      foodTypes: {
        available: [],
        current: undefined,
        limit: 7
      },
      // -- rating
      rating: {
        available:[],
        current: undefined
      },
      // -- payment mode
      paymentModes: {
        available: [],
        visible: ["AMEX", "Visa", "Discover", "MasterCard"],
        exclude: ["Diners Club", "Carte Blanche"],
        replace: "Discover",
        current: undefined
      },
      // -- page navigation
      pages: {
        current: 1,
        limit: 3,
        limitTotal: 5000
      }
    }
  }

  shouldComponentUpdate(nextProps:Object, nextState:Object):boolean {
    return this._updateRender
  }

  componentDidMount():void {
    /*SHOW ME*/Global.console('- App.componentDidMount()', Global.PAGE_COLORS.APP)
    this._initAlgolia().then(():void => {
      // -- setup ths filtering params.
      // @see https://www.algolia.com/doc/api-client/settings/
      // @see https://www.algolia.com/doc/api-reference/settings-api-parameters/
      if (this.state.index && _.has(this.state.index,'setSettings')) {
        this.state.index.setSettings({
          attributesForFaceting : ['food_type','stars_count','payment_options'], // <-- https://www.algolia.com/doc/api-reference/api-parameters/attributesForFaceting/
          searchableAttributes  : ['name','food_type','dining_style','city','address','area','neighborhood','postal_code','phone','price_range'],
          ranking               : ['typo','geo','words','attribute','proximity','exact','custom'], // <-- https://www.algolia.com/doc/api-reference/api-parameters/ranking/
          sortFacetValuesBy     : 'count', // <-- https://www.algolia.com/doc/api-reference/api-parameters/sortFacetValuesBy/
          page                  : this.state.pages.current || 1, // <-- https://www.algolia.com/doc/api-reference/api-parameters/page/
          hitsPerPage           : this.state.pages.limit || 3, // <-- https://www.algolia.com/doc/api-reference/api-parameters/hitsPerPage/
          paginationLimitedTo   : this.state.pages.limitTotal || 5000 // <-- https://www.algolia.com/doc/api-reference/api-parameters/paginationLimitedTo/
        },
        (err:any, content:any):void => {
          Global.exception( 'App.componentDidMount().then(...).catch()', err, content)
        })
      }
      // -- proceed to the first search.
      this._updateSearch()
    })
  }

  render():any {
    /*SHOW ME*/Global.console('- App.render()', Global.PAGE_COLORS.APP)
    return (
      <div className={"App"}>
        {this._getHeader()}
        <section className={ this.state.isMenuHidden ? 'hidden' : '' }>
          {this._getSideMenu()}
          {this._getResultList()}
        </section>
      </div>
    )
  }


  // -- VIEWS

  _getHeader():any {
    return (
      <SearchMenu
        isMenuHidden={this.state.isMenuHidden}
        setSearch={this._setSearch}
        setLocation={this._setLocation}
        setMenu={this._setMenu}
      />
    )
  }

  _getSideMenu():any {
    return (
      <menu>
        <FoodTypes
          available={this.state.foodTypes.available}
          current={this.state.foodTypes.current}
          limit={this.state.foodTypes.limit}
          update={this._setFoodType}
        />
        <Rating
          current={this.state.rating.current}
          available={this.state.rating.available}
          update={this._setRating}
        />
        <PaymentMode
          available={this.state.paymentModes.available}
          visible={this.state.paymentModes.visible}
          current={this.state.paymentModes.current}
          update={this._setPaymentMode}
        />
      </menu>
    )
  }

  _getResultList():any {
    return (
      <ResultList
        results={this.state.search.results}
        time={this.state.search.time}
        total={this.state.search.total}
        page={this.state.pages.current}
        limit={this.state.pages.limit}
        limitTotal={this.state.pages.limitTotal}
        geo={this.state.geo}
        setPage={this._setPage}
        setMenu={this._setMenu}
        isMenuHidden={this.state.isMenuHidden}
      />
    )
  }


  // -- CONTROLLERS

  async _initAlgolia():void {
    const ID:string = Global.ALGOLIA_APP_ID
    const KEY:string = Global.ALGOLIA_APP_KEY
    const INDEX:string = Global.ALGOLIA_APP_INDEX
    /*SHOW ME*/Global.console('- App.initAlgolia()', Global.PAGE_COLORS.ALGOLIA, {ID})
    if (this.state.index == null && this.state.client == null) {
      const client:Object = await algoliasearch(ID, KEY)
      const index:Object = await client.initIndex(INDEX)
      this.setState({index, client})
    }
  }

  _setSearch(query:string):void {
    let search:Object = this.state.search
        search.query = query
    /*SHOW ME*/Global.console('- App._setSearch()', Global.PAGE_COLORS.APP, {search})
    this._updateRender = false
    this.setState({
      search,
      page: this._getResetPage()
    }, this._updateSearch )
  }

  _setLocation(latitude:number, longitude:number, location:string, auth:boolean):void {
    const geo:Object = {
      latitude,
      longitude,
      location,
      authorized: _.isBoolean(auth) ? auth : this.state.authorized
    }
    /*SHOW ME*/Global.console('- App._setLocation()', Global.PAGE_COLORS.APP, {geo})
    this._updateRender = false
    this.setState({
      geo,
      page: this._getResetPage()
    },
    this._updateSearch )
  }

  _setRating(rate:number):void {
    let rating:Object = this.state.rating
        rating.current = rate && rate >= 0 ? rate : undefined
    /*SHOW ME*/Global.console('- App._setRating()', Global.PAGE_COLORS.APP, {rating})
    this._updateRender = false
    this.setState({
      rating,
      page: this._getResetPage()
    },
    this._updateSearch )
  }

  _setFoodType(name:string):void {
    let foodTypes:Object = this.state.foodTypes
        foodTypes.current = name
    /*SHOW ME*/Global.console('- App._setFoodType()', Global.PAGE_COLORS.APP, {foodTypes})
    this._updateRender = false
    this.setState({
      foodTypes,
      page: this._getResetPage()
    },
    this._updateSearch )
  }

  _setPaymentMode(mode:string):void {
    let paymentModes:Object = this.state.paymentModes
        paymentModes.current = mode
    /*SHOW ME*/Global.console('- App._setPaymentMode()', Global.PAGE_COLORS.APP, {paymentModes})
    this._updateRender = false
    this.setState({
      paymentModes,
      page: this._getResetPage()
    },
    this._updateSearch )
  }

  _getResetPage():Object {
    return {
      current: 1,
      limit: this.state.pages.limit,
      limitTotal: this.state.pages.limitTotal
    }
  }

  _setPage(page:number):void {
    let pages:Object = this.state.pages
        pages.current = (page)?page:this.state.pages.current
    /*SHOW ME*/Global.console('- App._setPage()', Global.PAGE_COLORS.APP, {pages})
    this._updateRender = false
    this.setState(
      {pages},
      this._updateSearch
    )
  }

  _setMenu(isMenuHidden:boolean):void {
    /*SHOW ME*/Global.console('- App._setMenu()', Global.PAGE_COLORS.APP, {isMenuHidden})
    this._updateRender = true
    this.setState({ isMenuHidden })
  }


  // -- MODELS

  _updateSearch():void {
    /*SHOW ME*/Global.console('- App._updateSearch()', Global.PAGE_COLORS.ALGOLIA, {client: this.state.client})

    // -- Init Algolia Search Helper
    // @see https://www.algolia.com/doc/api-reference/api-methods/search/
    let helper:Object = algoliasearchHelper(this.state.client, Global.ALGOLIA_APP_INDEX, {facets: ["food_type","stars_count","payment_options"]})
        helper.clearRefinements()

    // -- Filter by string query
    // @see https://www.algolia.com/doc/api-reference/api-parameters/query/
    helper.setQuery(this.state.search.query)

    // -- Filter by pagination
    // @see https://www.algolia.com/doc/api-reference/api-parameters/page/
    helper.setQueryParameter('page', this.state.pages.current)

    // -- Filter by Food Types (defined Facet)
    const foodType:string = this.state.foodTypes.current
    if (_.size(foodType) > 0) {
      helper.addFacetRefinement('food_type', foodType)
    }

    // -- Filter by star rating (defined Facet)
    // @see https://www.algolia.com/doc/api-reference/api-parameters/numericFilters/
    const rate:number = this.state.rating.current
    if (rate >= 0) {
      helper.setQueryParameter('numericFilters', [
        "stars_count >= "+ rate === 0 ? 0 : rate - 0.5,
        "stars_count < " + rate === 0 ? 1 : rate + 0.5
      ])
    }

    // -- Filter by payment mode (defined Facet)
    // @see https://www.algolia.com/doc/api-reference/api-parameters/facetFilters/
    const paymentMode:string = this.state.paymentModes.current
    if (_.size(paymentMode) > 0) {
      helper.setQueryParameter('facetFilters', ['payment_options:'+paymentMode])
    }

    // -- Filter by location (if geo.lat/geo.lng provided)
    // @see https://www.algolia.com/doc/api-reference/api-parameters/aroundLatLng/
    if (this.state.geo && this.state.geo.latitude && this.state.geo.longitude) {
      helper.setQueryParameter('aroundLatLng',
        this.state.geo.latitude +','+
        this.state.geo.longitude
      )
      helper.setQueryParameter('aroundRadius', 'all')
    }

    // -- Launch the request.
    helper.search()
    helper.on('result', this._setResults)
  }

  _setResults(content:Object):void {
    let r:Array<Object> = content.hits || []

    // -- control the data received
    r = this._filter(r, 'food')
    r = this._filter(r, 'rating')
    r = this._filter(r, 'payment')

    const foodTypesAvailable:Array<Object> = content.getFacetValues("food_type") || []
    const ratingAvailable:Array<Object> = content.getFacetValues("stars_count") || []
    const paymentAvailable:Array<Object> = content.getFacetValues("payment_options") || []

    let search:Object = this.state.search
        search.results = r
        search.time = content.processingTimeMS
        search.total = content.nbHits

    let foodTypes:Object = this.state.foodTypes
        foodTypes.available = foodTypesAvailable

    let paymentModes:Array<Object> = this.state.paymentModes
        paymentModes.available = paymentAvailable

    // -- caltulate the ranking stars average occurances
    let s:Array<number> = []
    let rating:Object = this.state.rating
    _.orderBy(ratingAvailable,'name','asc')
    .map((e:Object):Object => {return{r:Math.round(parseFloat(e.name)),c:e.count}})
    .map((e:Object):void => {for(var i=0;i<=5;i++){if(!s[i]){s[i]=0}if(e.r>=i&&e.r<i+1){s[i]+=e.c}}return true})
    rating.available = s

    /*SHOW ME*/Global.console("- App._updateSearch() > helper.on('result').then(...)", Global.PAGE_COLORS.ALGOLIA, {content, r})

    this._updateRender = true
    this.setState({
      search,
      foodTypes,
      rating,
      paymentModes,
      pages: this._getResetPage()
    })
  }

  _filter(rr:Array<Object>, action:string):Array<Object> {
    let res:Array<Object> = rr
    switch (action) {
      default:
      case 'rating':
        const rate:number = this.state.rating.current || undefined
        /*SHOW ME*///Global.console('- App._filter() > rating', Global.PAGE_COLORS.ALGOLIA, {rate})
        if (rate !== undefined) {
          res = rr.filter((r:Object):boolean=>Math.round(r.stars_count)>=rate)
        }
        break

      case 'food':
        const food:string = this.state.foodTypes.current || undefined
        /*SHOW ME*///Global.console('- App._filter() > food', Global.PAGE_COLORS.ALGOLIA, {food})
        if (food !== undefined) {}
        break

      case 'payment' :
        const exc:Array<string> = this.state.paymentModes.exclude
        const rep:string = this.state.paymentModes.replace
        const cur:string = this.state.paymentModes.current || undefined
        /*SHOW ME*///Global.console('- App._filter() > payment', Global.PAGE_COLORS.ALGOLIA, {cur})
        if (cur !== undefined) {
          res = rr.filter((r:Object):boolean => r && r.payment_options && r.payment_options.includes(cur) ?
            true :
            exc.includes(cur) ? r && r.payment_options && r.payment_options.includes(rep) ? true : false
            : false
          )
        }
        break
    }
    return res
  }

}

export default App
