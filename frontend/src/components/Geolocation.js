import React, { Component } from "react";

export default class Geolocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      userAddress: null,
    };
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.handleLocationError = this.handleLocationError.bind(this);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.getCoordinates,
        this.handleLocationError
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  handleLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  }

  getCoordinates(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }

  render() {
    return (
      <>
        <div className="geoLocation">
          <h1>Geo-Location </h1>
          <button onClick={this.getLocation}>Get Location</button>
          <p>Latitude:{this.state.latitude}</p>
          <p>Longitude:{this.state.longitude}</p>
          <p>Address: {this.state.userAddress}</p>

          <img
            class="img-fluid"
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}size=600x600&scale=1&format=png&maptype=roadmap&markers=size:normal%7Ccolor:blue%7Clabel:P%7C${this.state.latitude},${this.state.longitude}&key=AIzaSyCdJPbxoU8RTh1r7crLWZ4As6bGcfl84Kc`}
          ></img>

          {/* <img
            src=" http://maps.googleapis.com/maps/api/staticmap?key=AIzaSyCdJPbxoU8RTh1r7crLWZ4As6bGcfl84Kc&size=400x300&sensor=false&markers=622+E+Washington+Street,+Suite+240+Orlando,+FL+32801 "
            alt=""
          /> */}
        </div>
      </>
    );
  }
}

<img
  class="img-fluid"
  src="https://maps.googleapis.com/maps/api/staticmap?size=600x600&scale=1&format=png&maptype=roadmap&markers=size:normal%7Ccolor:blue%7Clabel:P%7C6.4488387,3.5496361&key=YOUR_API_KEY"
></img>;
