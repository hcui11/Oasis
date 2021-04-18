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
    page: "login",
    isSignedIn: false
  }

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

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({ isSignedIn: !!user })
    );
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    // return (
    //   <div className="App">
    //     {
    //       (this.getPage() === "login")
    //         ? <Login goToHome={this.goToHome} />
    //         : (this.getPage() === "home")
    //           ? <Home goToHome={this.goToHome} goToListings={this.goToListings} />
    //           : (this.getPage() === "listings")
    //             ? <Listings goToHome={this.goToHome} goToListings={this.goToListings} goToListing={this.goToListing} />
    //             : <Listing goToHome={this.goToHome} goToListings={this.goToListings} />
    //     }
    //   </div>
    // )

    if (!this.state.isSignedIn) {
      return (
        <div>
          <Login goToHome={this.goToHome} uiConfig={this.uiConfig}/>
        </div>
      );
    }
    return (
      <div>
        <Home goToHome={this.goToHome} goToListings={this.goToListings} />
        {/* <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
        <a onClick={() => firebase.auth().signOut()}>Sign-out</a> */}
      </div>
    );
  };
}

export default App;
