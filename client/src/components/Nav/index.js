import React, { Component, createRef } from "react";
import "./style.css";
import _ from "lodash";
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
          <List class="ui horizontal list">
            <List.Item class="item">
              <Link to="/orderHistory">
                <Icon link name="signup" size="big" id="navbtn" />
              </Link>
            </List.Item>
            <List.Item class="item">
              {/* this is not using the Link component to logout or user and then refresh the application to the start */}
              <a href="/" onClick={() => Auth.logout()}>
                <Icon link name="log out" size="big" id="navbtn" />
              </a>
            </List.Item>
          </List>
        );
      } else {
        return (
          <List class="ui horizontal list">
            <List.Item class="item">
              <Link to="/signup">
                <Icon link name="signup" size="big" id="navbtn" />
              </Link>
            </List.Item>
            <List.Item class="item">
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
        <header className="flex-row px-1" ref={this.contextRef}>
          <Link to="/" attached="top" context={this.contextRef}>
            <span>
              <Image
                src={`/images/vicsLogo.png`}
                alt="logo"
                id="mainLogo"
                size="tiny"
                circular
                ß
              />
            </span>
          </Link>
          <nav>
            <CategoryMenu />
          </nav>
          {showNavigation()}
          <Cart />
        </header>
      </Sticky>
    );
  }
}
