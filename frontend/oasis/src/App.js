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

class App extends Component {
  state = {
    page: "home",
    isSignedIn: false
  }

  venuves = []

  getPage = () => {
    return this.state.page;
  }

  goToHome = () => {
    this.setState({ page: "home", isSignedIn: true });
  }

  goToLogin = () => {
    this.setState({ page: "login", isSignedIn: false });
  }

  goToListings = () => {
    this.setState({ page: "listings", isSignedIn: true });
  }

  goToListing = () => {
    this.setState({ page: "listing", isSignedIn: true })
  }

  async componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({ page: "home", isSignedIn: !!user })
    );

    const idToken = await firebase.auth().currentUser?.getIdToken()
    
    console.log(idToken)
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

// Make sure we un-register Firebase observers when the component unmounts.
componentWillUnmount() {
  this.unregisterAuthObserver();
}

render() {
  if (!this.state.isSignedIn) {
    return (
      <div>
        <Login goToHome={this.goToHome} uiConfig={this.uiConfig} />
      </div>
    );
  }
  console.log(firebase.auth().currentUser?.getIdToken())
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

export default App;
