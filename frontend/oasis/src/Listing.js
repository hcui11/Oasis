import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import oasis_logo from './oasis.png';
import { Box, Heading, Button, Flex } from "@chakra-ui/react";
import "./Listing.css";

function Listing({goToHome, goToListings}) {
    return (
        <div>
            <nav className="navbar is-dark" style={{'background-color': '#004d6f'}}>
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
                    </div>
                </div>
            </nav>
            <br/>
            <div>
                <Flex maxWidth="50vw" marginX="auto" marginY="auto" marginTop="2vh" direction="column">
                    <Heading fontSize={30} marginY="auto">Saratoga Springs</Heading>
                    <Carousel>
                        <div>
                            <img src="https://i.pinimg.com/originals/68/b5/c8/68b5c83bd0ee889287222c3ed556e26b.jpg"/>
                        </div>
                        <div>
                            <img src="https://aliceche.com/wp-content/uploads/2017/06/IMG_9468.jpg"/>
                        </div>
                        <div>
                            <img src="http://majestapatterson.com/wp-content/uploads/2012/07/saratoga-springs-wedding-0005.jpg"/>
                        </div>
                    </Carousel>
                    <Button marginY="auto" fontSize={30} marginX="auto" width="300px" marginBottom="4vh" borderRadius={10} backgroundColor="#004d6f" color="white" border="none">
                        Check Availability
                    </Button>
                </Flex>
            </div>
        </div>
    )
}

export default Listing
