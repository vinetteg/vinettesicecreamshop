import React, { Component, createRef } from "react";
import "./style.css";

import Auth from "../../utils/auth";
import CategoryMenu from "../CategoryMenu";
import Cart from "../Cart";
import { Link } from "react-router-dom";
import { Icon, Image, List, Sticky } from "semantic-ui-react";

export default class Nav extends Component {
  contextRef = createRef();

  render() {
    function showNavigation() {
      if (Auth.loggedIn()) {
        return (
          <List className="ui horizontal list">
            <List.Item className="item">
              <Link to="/orderHistory">
                <Icon link name="signup" size="big" id="navbtn" />
              </Link>
            </List.Item>
            <List.Item className="item">
              {/* this is not using the Link component to logout or user and then refresh the application to the start */}
              <a href="/" onClick={() => Auth.logout()}>
                <Icon link name="log out" size="big" id="navbtn" />
              </a>
            </List.Item>
          </List>
        );
      } else {
        return (
          <List className="ui horizontal list">
            <List.Item className="item">
              <Link to="/signup">
                <Icon link name="signup" size="big" id="navbtn" />
              </Link>
            </List.Item>
            <List.Item className="item">
              <Link to="/login">
                <Icon link name="user outline" size="big" id="navbtn" />
              </Link>
            </List.Item>
          </List>
        );
      }
    }
    return (
      <Sticky>
        <header
          className="flex-row px-1 ui stackable four column grid"
          ref={this.contextRef}
        >
          <Link to="/" attached="top" context={this.contextRef}>
            <span>
              <Image
                src={`/images/vicsLogo.png`}
                alt="logo"
                id="mainLogo"
                size="tiny"
                circular
              />
            </span>
          </Link>
          <nav>
            <CategoryMenu />
          </nav>
          {showNavigation()}
          <Cart attached="bottom" />
        </header>
      </Sticky>
    );
  }
}
