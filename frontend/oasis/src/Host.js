import oasis_logo from './oasis.png'
import firebase from 'firebase';

const Host = ({ goToHome, goToListings }) => {
    async function create_venue() {
        const idToken = await firebase.auth().currentUser?.getIdToken()

        const response = await fetch('https://rtrwvwtohe.execute-api.us-east-1.amazonaws.com/dev/venues', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors',
            headers: {
                'Authorization': idToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': firebase.auth().currentUser.displayName,
                'photoUrl': document.getElementById("photoUrl").value,
                'venue': document.getElementById("venue").value,
                'contact': firebase.auth().currentUser.email,
                'tags': document.getElementById("tags").value
            })
        })
    }

    return (
        <div>
            <nav className="navbar is-dark" style={{ 'backgroundColor': '#004d6f' }}>
                <div className="navbar-brand">
                    <a className="navbar-item">
                        <img src={oasis_logo} alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
                    </a>
                    <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div id="navbarExampleTransparentExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item" onClick={goToHome}>
                            Home
                </a>
                        <a className="navbar-item" onClick={goToListings}>
                            Venues
                </a>
                        <a className="navbar-item">
                            Caterers
                </a>
                        <a className="navbar-item">
                            Contact
                </a>
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link" href="/documentation/overview/start/">
                                More
                    </a>
                            <div className="navbar-dropdown is-boxed">
                                <a className="navbar-item" href="/documentation/overview/start/">
                                    Mechandise
                        </a>
                                <a className="navbar-item" href="https://bulma.io/documentation/modifiers/syntax/">
                                    Extras
                        </a>
                                <a className="navbar-item" href="https://bulma.io/documentation/columns/basics/">
                                    Media
                        </a>
                            </div>
                        </div>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="field">
                                <div className="control">
                                    <input className="input" type="text" placeholder="Search . . ." />
                                </div>
                            </div>
                        </div>
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link" href="/documentation/overview/start/">
                                Welcome {firebase.auth().currentUser.displayName}
                            </a>
                            <div className="navbar-dropdown is-boxed">
                                <a className="navbar-item">{firebase.auth().currentUser.email}</a>
                                <a className="navbar-item" onClick={() => firebase.auth().signOut()}>Sign-out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <section className="hero is-fullheight">
                <div className="hero-body has-text-centered">
                    <div className="login" style={{ 'backgroundColor': '#004d6f' }}>
                        <form>
                            <div className="field">
                                <div className="control">
                                    <input id="photoUrl" className="input is-medium is-rounded" type="email" placeholder="Photo URL" autocomplete="username" required />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input id="venue" className="input is-medium is-rounded" type="email" placeholder="Venue Name" autocomplete="current-password" required />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <input id="tags" className="input is-medium is-rounded" type="email" placeholder="Tags" autocomplete="current-password" required />
                                </div>
                            </div>
                            <br />
                            <button className="button is-block is-fullwidth is-primary is-medium is-rounded" type="submit" onClick={create_venue}>
                                Host
                        </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Host;