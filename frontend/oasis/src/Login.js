import oasis_logo from './oasis.png'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

var uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
};

const Login = ({goToHome}) => {
  return (
    <section className="hero is-fullheight">
      <div className="hero-body has-text-centered">
        <div className="login" style={{'backgroundColor': '#004d6f'}}>
          <img src={oasis_logo} width="325px" />
          {/* <form>
            <div className="field">
              <div className="control">
                <input className="input is-medium is-rounded" type="email" placeholder="Username" autocomplete="username" required />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input className="input is-medium is-rounded" type="password" placeholder="Password" autocomplete="current-password" required />
              </div>
            </div>
            <br />
            <button className="button is-block is-fullwidth is-primary is-medium is-rounded" type="submit" onClick={goToHome}>
              Login
            </button>
          </form> */}
          {console.log(uiConfig)}
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
          <br />
          <nav className="level">
            <div className="level-item has-text-centered">
              <div>
                <a href="#">Forgot Password?</a>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <a href="#">Create an Account</a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}

export default Login;