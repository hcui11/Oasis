import './App.css';
import Login from './Login.js';
import Home from './Home.js';
import Listings from './Listings.js';
import Listing from './Listing.js';
import { Component } from 'react';
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBNYyGN79Anl07pr3tUw_XM1Pth37zmeCI",
  authDomain: "oasis-dccd2.firebaseapp.com",
  projectId: "oasis-dccd2",
  storageBucket: "oasis-dccd2.appspot.com",
  messagingSenderId: "601169082234",
  appId: "1:601169082234:web:7198256418403a4c59c8c3"
};

firebase.initializeApp(firebaseConfig);

class SignedInComponent extends Component {
  state = {
    page: "home",
  }

  venues = []

  getPage = () => {
    return this.state.page;
  }

  goToHome = () => {
    this.setState({ page: "home"});
  }

  goToLogin = () => {
    this.setState({ page: "login"});
  }

  goToListings = () => {
    this.setState({ page: "listings"});
  }

  goToListing = () => {
    this.setState({ page: "listing"})
  }

  async componentDidMount() {
    const idToken = await firebase.auth().currentUser?.getIdToken()

    const response = await fetch('http://localhost:4000/venues', {
      mode: "cors",
      headers: {
        'Authorization': idToken,
      }
    })

    if (response.status === 401) {
      return console.log('unauthorized')
    }

    this.venues = await response.json()
  }

  render() {
    return (
      <div>
        {
          (this.getPage() === "home")
            ? <Home goToHome={this.goToHome} goToListings={this.goToListings} />
            : (this.getPage() === "listings")
              ? <Listings venues={this.venues} goToHome={this.goToHome} goToListings={this.goToListings} goToListing={this.goToListing} />
              : <Listing goToHome={this.goToHome} goToListings={this.goToListings} />
        }
      </div>
    );
  };
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false,
    };
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({ isSignedIn: !!user })
    );
  }

  componentDidUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (this.state.isSignedIn) {
      return <SignedInComponent />;
    }
    return (
      <div>
        <Login goToHome={this.goToHome} uiConfig={this.uiConfig} />
      </div>
    );
  }
}

export default App;
