import oasis_logo from "./oasis.png";
import React, { useEffect, useState } from "react";
import { Box, SimpleGrid, Image, Flex, Link, Button } from "@chakra-ui/react";

const Listings = ({venues, goToHome, goToListings, goToListing }) => {

  const [search, setSearch] = useState("");
    
  const getSearchValue = () => {
    setSearch(document.getElementById("search").value);
  };

  const [listingsDocs, setListingDocs] = useState(venues);

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
            <a className="navbar-item">Caterers</a>
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
          if (search == "" || listingDoc.venue.toLowerCase().includes(search.toLowerCase()) || listingDoc.tags.toLowerCase().includes(search.toLowerCase())) {
            return (<Box marginY="auto">
                        <Flex direction="column" onClick={goToListing}>
                            <Image
                                maxWidth={"100%"}
                                borderRadius={10}
                                src={`${listingDoc.photoUrl}`}
                            />
                            <Box>{listingDoc.venue} by {listingDoc.name}</Box>
                        </Flex>              
                    </Box>);
          }
        })}
      </SimpleGrid>
    </div>
  );
};

export default Listings;
