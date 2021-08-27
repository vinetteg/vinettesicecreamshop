import React, { Component, createRef } from "react";
import _ from "lodash";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
} from "semantic-ui-react";

const menuStyle = {
  border: "none",
  borderRadius: 0,
  boxShadow: "none",
  marginBottom: "1em",
  marginTop: "4em",
  transition: "box-shadow 0.5s ease, padding 0.5s ease",
};

const fixedMenuStyle = {
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
};

const overlayStyle = {
  float: "left",
  margin: "0em 3em 1em 0em",
};

const fixedOverlayStyle = {
  ...overlayStyle,
  position: "fixed",
  top: "80px",
  zIndex: 10,
};

const overlayMenuStyle = {
  position: "relative",
  left: 0,
  transition: "left 0.5s ease",
};

const fixedOverlayMenuStyle = {
  ...overlayMenuStyle,
  left: "800px",
};

export default class Nav extends Component {
  state = {
    menuFixed: false,
    overlayFixed: false,
  };

  handleOverlayRef = (c) => {
    const { overlayRect } = this.state;

    if (!overlayRect) {
      this.setState({
        overlayRect: _.pick(c.getBoundingClientRect(), "height", "width"),
      });
    }
  };

<<<<<<< HEAD
  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/products/:id">
=======
  stickOverlay = () => this.setState({ overlayFixed: true });
>>>>>>> 51ea80dc1f9c2e829a3bcf3297ab71b408b64aa8

  stickTopMenu = () => this.setState({ menuFixed: true });

  unStickOverlay = () => this.setState({ overlayFixed: false });

  unStickTopMenu = () => this.setState({ menuFixed: false });

  render() {
    const { menuFixed, overlayFixed, overlayRect } = this.state;
    function showNavigation() {
      if (Auth.loggedIn()) {
        return (
          <Segment>
            <ul className="flex-row">
              <li className="mx-1">
                <Link to="/orderHistory">Order History</Link>
              </li>
              <li className="mx-1">
                {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                <a href="/" onClick={() => Auth.logout()}>
                  Logout
                </a>
              </li>
            </ul>
          </Segment>
        );
      } else {
        return (
          <ul className="flex-row">
            <li className="mx-1">
              <Link to="/signup">Signup</Link>
            </li>
            <li className="mx-1">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        );
      }
    }

    return (
      <header className="flex-row px-1">
        <h1>
          <Link to="/">
            <span role="img" aria-label="shopping bag">
              🍦
            </span>
            Vinette's Ice Cream Shop
          </Link>
        </h1>

        <nav>{showNavigation()}</nav>
      </header>
    );
  }
}
