import oasis_logo from './oasis.png'
import venue_image from './homeImage.png'
import caterer_image from './caterer.png'
import planner_image from './planner.jpeg'
import { Box } from "@chakra-ui/react";
import firebase from 'firebase';


const Home = ({ goToHome, goToListings }) => {
    return (
        <div>
            <nav className="navbar is-dark" style={{ 'background-color': '#004d6f' }}>
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
                                <a className="navbar-item" onClick={() => firebase.auth().signOut()}>Sign-out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <Box minHeight="100vh">
                <section className="hero">
                    <figure className="image">
                        <img src={venue_image} />
                    </figure>
                </section>
            </Box>







            <section className="section">
                <div class="container has-text-centered">
                    <h2 class="title">Oasis</h2>
                    <p>Oasis is a three way marketplace connecting landowners, event planners, and consumers interested in holding large events on privately owned land. Through our research, we have noticed that wedding venues are both limited and expensive, while millions of acres of beautiful, privately owned land go unutilized every year. Our product aims to connect consumers, planners, and individual landowners to facilitate the creation of high quality events in affordable and unused spaces. We hope event planners and consumers can benefit from this broader range of affordable venues while landowners can earn more income from their properties.
</p>

                    <div class="columns is-centered" style={{ 'padding': '2rem' }}>
                        <div class="column">
                            <div class="card">
                                <div class="card-image">
                                    <figure class="image is-2by1">
                                        <img src={caterer_image} alt="Placeholder image" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="media">
                                        <div class="media-content">
                                            <p class="title is-4">Caterers</p>
                                            <p class="subtitle is-6">Find the best chefs for your event.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="column">
                            <div class="card">
                                <div class="card-image">
                                    <figure class="image is-2by1">
                                        <img src="https://images.pexels.com/photos/167635/pexels-photo-167635.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Placeholder image" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="media">
                                        <div class="media-content">
                                            <p class="title is-4">Musicians</p>
                                            <p class="subtitle is-6">Find musicians to play for your special day!</p>
                                        </div>
                                    </div>

                                    {/* <div class="content">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                                <a>@bulmaio</a>.
                                <a href="#">#css</a>
                                        <a href="#">#responsive</a>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        <div class="column">
                            <div class="card">
                                <div class="card-image">
                                    <figure class="image is-2by1">
                                        <img src={planner_image} alt="Placeholder image" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="media">
                                        <div class="media-content">
                                            <p class="title is-4">Planners</p>
                                            <p class="subtitle is-6">Find a planner to help plan your event.</p>
                                        </div>
                                    </div>

                                    {/* <div class="content">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                                <a>@bulmaio</a>.
                                <a href="#">#css</a>
                                        <a href="#">#responsive</a>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>









        </div >
    );
}

export default Home;