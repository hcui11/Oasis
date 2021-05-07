import oasis_logo from "./oasis.png";
import React, { useEffect, useState } from "react";
import { Box, SimpleGrid, Image, Flex, Link, Button } from "@chakra-ui/react";
import firebase from 'firebase';

const Planners = ({ goToHome, goToListings, goToPlanners, goToHosting }) => {

  const [search, setSearch] = useState("");

  const getSearchValue = () => {
    setSearch(document.getElementById("search").value);
  };

  const [listingsDocs, setListingDocs] = useState([
    {
      photoURL: 'https://images.squarespace-cdn.com/content/535ef55de4b0cd207fffc25d/1567798620819-PLDTUXF7N45MYC1YF16M/amo+logo+5.png?content-type=image%2Fpng',
      business: 'Amorology Weddings',
      name: 'Troy and Heather',
      website: 'https://www.amorologyweddings.com/',
      location: 'Southern California'
    },
    {
      photoURL: 'https://www.kylemichelleweddings.com/uploads/7/0/9/5/7095515/published/logo.png',
      business: 'Kyle Michelle Weddings',
      name: 'Kristin',
      website: 'https://www.kylemichelleweddings.com/',
      location: 'New York, Philadelphia, South Jersey'
    },
    {
      photoURL: 'https://assets.website-files.com/5bff02a76e7fb70dc36af7ac/5c001e583e231100798ac820_static1.squarespace.png',
      business: 'Events By Jesse',
      name: 'Jesse',
      website: 'https://www.eventsbyjesse.com/',
      location: 'New York'
    },
    {
      photoURL: 'http://static.showit.co/file/hPau0jJxQQWZ7_ruN8bNyA/shared/mayfield_events_logo_-_primary-01.svg',
      business: 'Mayfield Events',
      name: 'Laura',
      website: 'https://mayfieldevents.com/',
      location: 'Texas, Arizona, Colorado, New Mexico'
    },
    {
      photoURL: 'https://images.squarespace-cdn.com/content/57a918d69f7456ca517f90c3/1588131429736-RE4RBUV29HC5OACODJ6K/socal-wedding-consultant-best-wedding-planner-in-southern-california.png',
      business: 'Events By WC',
      name: 'Love',
      website: 'http://www.eventsbywc.com/',
      location: 'Southern California'
    }
  ]);

  return (
    <div>
      <nav className="navbar is-dark" style={{ "background-color": "#004d6f" }}>
        <div className="navbar-brand">
          <a className="navbar-item">
            <img
              src={oasis_logo}
              alt="Bulma: a modern CSS framework based on Flexbox"
              width="112"
              height="28"
            />
          </a>
          <div
            className="navbar-burger burger"
            data-target="navbarExampleTransparentExample"
          >
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
            <a className="navbar-item" onClick={goToPlanners}>
              Planners
            </a>
            <a className="navbar-item" onClick={goToHosting}>
              Host
            </a>
            <a className="navbar-item">Contact</a>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link" href="/documentation/overview/start/">
                More
              </a>
              <div className="navbar-dropdown is-boxed">
                <a
                  className="navbar-item"
                  href="/documentation/overview/start/"
                >
                  Mechandise
                </a>
                <a
                  className="navbar-item"
                  href="https://bulma.io/documentation/modifiers/syntax/"
                >
                  Extras
                </a>
                <a
                  className="navbar-item"
                  href="https://bulma.io/documentation/columns/basics/"
                >
                  Media
                </a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field">
                <div className="control">
                  <input
                    id="search"
                    className="input"
                    type="text"
                    placeholder="Search . . ."
                    onChange={getSearchValue}
                  />
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

      <SimpleGrid
        minHeight="94vh"
        minChildWidth="300px"
        padding="2vh"
        spacing={20}
      >
        {listingsDocs.map((listingDoc) => {
          if (search == "" || listingDoc.business.toLowerCase().includes(search.toLowerCase()) || listingDoc.location.toLowerCase().includes(search.toLowerCase())) {
            return (<Box marginY="auto">

              <Link direction="column" href={listingDoc.website} textAlign="center" isExternal>
                <Image
                  maxWidth={"100%"}
                  borderRadius={10}
                  src={`${listingDoc.photoURL}`}
                />
                {/* <Box>{listingDoc.business} with {listingDoc.name}</Box> */}
              </Link>
            </Box>);
          }
        })}
      </SimpleGrid>
    </div>
  );
};

export default Planners;
