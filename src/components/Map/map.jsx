import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import { connect } from 'react-redux';
import { fetchPermits } from '../../actions/permitActions';

import markerApproved from '../../assets/img/marker-approved.png';
import markerRequested from '../../assets/img/marker-pending.png';
import markerExpired from '../../assets/img/marker-expired.png';

export class Contents extends Component {
  constructor() {
    super();
    this.state = {
      selectedPlace: {},
      showingInfoWindow: false,
      activeMarker: null,
      position: null,
      ceter: {}
    };
    this.autocomplete = React.createRef();
  }

  componentDidMount() {
    this.renderAutoComplete();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps.map) this.renderAutoComplete();
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onInfoWindowClose = () => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { position } = this.state;
    if (this.autocomplete.current.value === '') {
      this.props.fetchPermits();
    } else if (position) {
      this.props.fetchPermits({
        $where: `within_circle(location, ${position.lat()}, ${position.lng()}, 1000)`
      });
      this.setState({
        center: position
      });
    }
  };

  useMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.props.fetchPermits({
          $where: `within_circle(location, ${position.coords.latitude}, ${position.coords.longitude}, 1000)`
        });

        var initialLocation = new this.props.google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        // var geocoder = new this.props.google.maps.Geocoder();
        // if (geocoder) {
        //   geocoder.geocode({ latLng: initialLocation }, (results, status) => {
        //     if (status === this.props.google.maps.GeocoderStatus.OK) {
        //       console.log(results[0].formatted_address);
        //     } else {
        //       console.log('Geocoding failed: ' + status);
        //     }
        //   });
        // }
        this.setState({
          center: initialLocation
        });
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  renderAutoComplete() {
    const { google, map } = this.props;

    if (!google || !map) return;

    const autocomplete = new google.maps.places.Autocomplete(
      this.autocomplete.current
    );
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (!place.geometry) return;

      if (place.geometry.viewport) map.fitBounds(place.geometry.viewport);
      else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      this.setState({ position: place.geometry.location });
    });
  }

  render() {
    const { data } = this.props;

    const containerStyle = {
      position: 'relative',
      width: '100%',
      height: '100%'
    };

    return (
      <>
        <form
          className='form-inline'
          inline
          onSubmit={this.onSubmit}
          style={{ padding: '30px 15px' }}
        >
          <label htmlFor='location'>Location : </label>
          <input
            id='location'
            className='form-control'
            placeholder='Enter a location'
            ref={this.autocomplete}
            type='text'
            style={{ marginLeft: '15px', width: '300px' }}
          />

          <input
            className='btn btn-primary'
            type='submit'
            value='Filter'
            style={{ marginLeft: '15px' }}
          />
          <input
            className='btn btn-success'
            type='button'
            value='Use my current location'
            style={{ marginLeft: '15px' }}
            onClick={this.useMyLocation}
          />
        </form>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '60%',
            padding: '30px 15px'
          }}
        >
          <Map
            google={this.props.google}
            zoom={14}
            containerStyle={containerStyle}
            center={this.state.center}
            onClick={() => this.setState({ showingInfoWindow: false })}
          >
            {data.map((item, index) => {
              const {
                applicant,
                address,
                facilitytype,
                status,
                fooditems
              } = item;
              return (
                <Marker
                  icon={
                    status === 'APPROVED'
                      ? markerApproved
                      : status === 'REQUESTED'
                      ? markerRequested
                      : markerExpired
                  }
                  key={index}
                  position={{ lat: item.latitude, lng: item.longitude }}
                  onClick={this.onMarkerClick}
                  applicant={applicant}
                  address={address}
                  facilitytype={facilitytype}
                  status={status}
                  fooditems={fooditems}
                />
              );
            })}

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onInfoWindowClose}
            >
              <div>
                <h6>{this.state.selectedPlace.applicant}</h6>
                <p>
                  Status: <strong>{this.state.selectedPlace.status}</strong>
                </p>
                <p>
                  Facility Type:{' '}
                  <strong>{this.state.selectedPlace.facilitytype}</strong>
                </p>
                <p>
                  Address: <strong>{this.state.selectedPlace.address}</strong>
                </p>
                <p>
                  Food Items:{' '}
                  <strong>{this.state.selectedPlace.fooditems}</strong>
                </p>
              </div>
            </InfoWindow>
          </Map>
        </div>
      </>
    );
  }
}

const MapWrapper = props => (
  <Map className='map' google={props.google} visible={false}>
    <Contents {...props} />
  </Map>
);
export default connect(null, { fetchPermits })(
  GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
  })(MapWrapper)
);
