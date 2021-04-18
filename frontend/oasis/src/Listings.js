import oasis_logo from "./oasis.png";
import React, { useEffect, useState } from "react";
import { Box, SimpleGrid, Image, Flex, Link, Button } from "@chakra-ui/react";

const Listings = ({ goToHome, goToListings, goToListing }) => {

  const [search, setSearch] = useState("");
    
  const getSearchValue = () => {
    setSearch(document.getElementById("search").value);
  };

  const [listingsDocs, setListingDocs] = useState([
    {
      photoUrl:
        "https://s9739.pcdn.co/wp-content/uploads/2013/02/white-barn-wedding-decorations.jpg.optimal.jpg",
      Name: "Old John's Barn",
      Tags: "indoor barn"
    },
    {
      photoUrl:
        "http://cheersbabephoto.com/wp-content/uploads/2018/09/CheersBabePhoto-753.jpg",
      Name: "Saratoga Springs",
      Tags: "forest trees"
    },
    {
      photoUrl: "https://s.hdnux.com/photos/71/60/01/15138892/3/1200x0.jpg",
      Name: "Whitney's Botanical Garden",
      Tags: "garden indoor"
    },
    {
      photoUrl:
        "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=725&h=483&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F13%2F2018%2F07%2F18%2Fbackyard-wedding1.jpg",
      Name: "Ryan's Backyard",
      Tags: "backyard trees"
    },
    {
      photoUrl:
        "https://www.butfirstcoffeeblog.com/wp-content/uploads/2017/01/KALLIE-MICHAEL-9.jpg",
      Name: "Mick's Beautiful Acreage",
      Tags: "forest trees"
    },
    {
      photoUrl:
        "https://apracticalwedding.com/wp-content/uploads/2019/01/APW-Weddings-94873-46410.jpg",
      Name: "Sadie's Oasis",
      Tags: "backyard"
    },
    {
      photoUrl:
        "https://woodncratedesigns.com/wp-content/uploads/2019/10/backyard-reception-lighting.jpg",
      Name: "Dante's Inferno",
      Tags: "dancefloor dance floor backyard"
    },
    {
      photoUrl:
        "https://i2.wp.com/davincibridal.com/blog/wp-content/uploads/2016/11/wedding-venue4-1.jpg",
      Name: "Jenny's Lookout",
      Tags: "mountains overlook"
    },
    {
      photoUrl:
        "https://www.lookslikefilm.com/wp-content/uploads/2019/01/7V2A5632.jpg",
      Name: "Forest Lover's Dream",
      Tags: "forest trees"
    },
    {
      photoUrl:
        "https://yeahweddings-11993.kxcdn.com/wp-content/uploads/2020/09/outdoor-wedding-740x492.jpg",
      Name: "Lakeview Wedding Lot",
      Tags: "lake water mountains"
    },
    {
      photoUrl:
        "https://s3.us-west-2.amazonaws.com/images.herecomestheguide.com/images/articles/IndoorOutdoorWeddings-OakTreeManor.jpg",
      Name: "Married Under the Tree",
      Tags: "trees"
    },
    {
      photoUrl:
        "https://getordained.org/assets/getordained/blog/large-outdoor-wedding-setup.jpg",
      Name: "Parkland Wedding",
      Tags: "backyard dancefloor"
    },
    {
      photoUrl:
        "https://images.squarespace-cdn.com/content/v1/547b5805e4b0ac0fb96026bd/1566252816798-XSXGHFP8K1OT7BGZV5YL/ke17ZwdGBToddI8pDm48kCa8xVeeoiuu2MYgxenCQWhZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpx6TfU7SMEJyCJnxig_qQDhXkSr5GQTMa2m1phSewwr6KsD8BDDMnZd_SWGdW536_s/outdoor-wedding-venue-orange-county-weddings-venues-oc.jpg",
      Name: "Garden Getaway",
      Tags: "backyard garden"
    },
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
          if (search == "" || listingDoc.Name.toLowerCase().includes(search.toLowerCase()) || listingDoc.Tags.toLowerCase().includes(search.toLowerCase())) {
            return (<Box marginY="auto">
                        <Flex direction="column" onClick={goToListing}>
                            <Image
                                maxWidth={"100%"}
                                borderRadius={10}
                                src={`${listingDoc.photoUrl}`}
                            />
                            <Box>{listingDoc.Name}</Box>
                        </Flex>              
                    </Box>);
          }
        })}
      </SimpleGrid>
    </div>
  );
};

export default Listings;
