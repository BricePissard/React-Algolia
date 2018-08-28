/* @flow */
/* eslint-disable prefer-const */
/* jshint esversion: 6 */

import React, { Component } from 'react'
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PlacesAutocomplete,{geocodeByAddress,getLatLng} from 'react-places-autocomplete';
import Global from '../assets/Global';

class Location extends Component {

  _updateRender:boolean = true;

  constructor(props:Object, state:Object):void
  {
    try {
      /*SHOW ME*///Global.console('- Location.constructor()', Global.PAGE_COLORS.LOCATION);
      super(props);
      this.state = this.getInitialState.call(this);
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('Location.constructor().catch()', err);
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
			/*SHOW ME*///Global.console('- Location.getInitialState()', Global.PAGE_COLORS.LOCATION);
      return {
        latitude: this.props.latitude,
        longitude: this.props.longitude,
        location: this.props.location || '',
        authorized: this.props.authorized,
        visible: ((!navigator.getLocation)?true:false),
        loading: false
      };
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('Location.getInitialState().catch()', err);
      }
    }
    return {};
  }





  render():any
  {
    try {
			/*SHOW ME*/Global.console('- Location.render()', Global.PAGE_COLORS.LOCATION, {location: this.state.location});
      return (
        <div className={"location"}>
          {this._getAutocompleter()}
          {this._getGeolocationButton()}
        </div>
      );
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('Location.render().catch()', err);
      }
    }
  }

  /**
   * @see https://fontawesome.com/icons?d=gallery
   */
  _getGeolocationButton():void
  {
    try {
			/*SHOW ME*///Global.console('- Location._getGeolocationButton()', Global.PAGE_COLORS.LOCATION, {location: this.state.location});
      return (
        <button onClick={this._getLocation.bind(this)}>
          {(this.state.loading===true)?
            <FontAwesomeIcon icon={['fas','spinner']} spin />
            :
            <FontAwesomeIcon icon={['fas','crosshairs']} />
          }
        </button>
      );
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('Location._getGeolocationButton().catch()', err);
      }
    }
  }

  _getAutocompleter():any
  {
    try {
			/*SHOW ME*///Global.console('- Location._getAutocompleter()', Global.PAGE_COLORS.LOCATION, {location: this.state.location});
      return (
        <PlacesAutocomplete
          value={this.state.location}
          onChange={this._onChange.bind(this)}
          onSelect={this._onSelect.bind(this)}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }):any => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'or nearby...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion:Object):any => {
                  const className:string = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  const style:Object = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}>
                      <span>
                        {Global.truncate(suggestion.description,35)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      );
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('Location._getAutocompleter().catch()', err);
      }
    }
  }







  // -- CONTROLLERS

  _getLocation(e:Object):void
  {
    try {
      /*SHOW ME*/Global.console('- Location._getLocation()', Global.PAGE_COLORS.LOCATION);
      e.preventDefault();
      if (navigator.getLocation) {
        alert("Your browser does not seem to support geolocation, please enter your location manually.");
      } else {
        this._updateRender = true;
        this.setState({loading: true}, ():void => {
          navigator.geolocation &&
          navigator.geolocation.getCurrentPosition &&
          navigator.geolocation.getCurrentPosition((pos:Array<Object>):void => {
            /*SHOW ME*/Global.console('- Location._getLocation() > navigator.getCurrentPosition(...)', Global.PAGE_COLORS.LOCATION, pos);
            const latitude:number = pos['coords']['latitude'];
            const longitude:number = pos['coords']['longitude'];
            this._updateRender = false;
            this.setState({
              latitude,
              longitude,
              authorized: true
            }, ():void => this._getGeocode(latitude + ',' + longitude));
          });
        });
      }
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('Location._getLocation().catch()', err);
      }
    }
  }

  _onChange(location:string):void
  {
    try {
      /*SHOW ME*///Global.console('- Location._onChange()', Global.PAGE_COLORS.LOCATION, location);
      this._updateRender = true;
      this.setState({ location });
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('Location._onChange().catch()', err);
      }
    }
  };

  _onSelect(location:string):void
  {
    try {
      /*SHOW ME*/Global.console('- Location._onSelect()', Global.PAGE_COLORS.LOCATION, location);
      if (location!=='') {
        geocodeByAddress(location)
          .then((results:Object):Object => {
            this.setState({location: results[0].formatted_address});
            return getLatLng(results[0]);
          })
          .then((pos:Object):void => {
            this.props.setLocation(
              pos.lat,
              pos.lng,
              this.state.location
            );
          })
          .catch((err:any):void => Global.exception('Location._onSelect().then(...).catch()', err));
      } else {
        // -- reset location.
        this.props.setLocation(undefined, undefined, '');
      }
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('Location._onSelect().catch()', err);
      }
    }
  };

  /**
   * @see https://www.npmjs.com/package/react-places-autocomplete
   */
  _getGeocode(location:string):void
  {
    try {
      this._updateRender = true;
			/*SHOW ME*/Global.console('- Location._getGeocode()', Global.PAGE_COLORS.LOCATION, location);
      if (_.size(location)>0) {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+location.replace(' ','+'))
        .then((el:Object):void => el.json())
        .then((el:Object):void => {
          try {
            el = el.results[0];
            /*SHOW ME*/Global.console('- Location._getGeocode().then(...)', Global.PAGE_COLORS.LOCATION, el);
            this.setState({
              location: el.formatted_address,
              latitude: el.geometry.location.lat,
              longitude: el.geometry.location.lng,
              authorized: true,
              loading: false
            }, ():void => {
              this.props.setLocation(
                this.state.latitude,
                this.state.longitude,
                this.state.location,
                this.state.authorized,
              );
            });
          } catch(err) {
            Global.exception('Location._getGeocode().then(...).catch()', err);
            this.setState({
              latitude: undefined,
              longitude: undefined,
              location: '',
              loading: false
            }, ():void => {
              this.props.setLocation(
                this.state.latitude,
                this.state.longitude,
                this.state.location,
                this.state.authorized
              );
            });
          }
        });
      }
    } catch(err) {
      if (err && Global && _.has(Global, 'exception')) {
        Global.exception('Location._getGeocode().catch()', err);
      }
    }
  }

}

export default Location;
