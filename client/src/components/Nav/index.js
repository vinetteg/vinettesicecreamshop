import React, { Component, createRef } from "react";
import _ from "lodash";
import _ from "lodash";
import Auth from "../../utils/auth";
import CategoryMenu from "../CategoryMenu";
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

  stickOverlay = () => this.setState({ overlayFixed: true });

  stickTopMenu = () => this.setState({ menuFixed: true });

  unStickOverlay = () => this.setState({ overlayFixed: false });

  unStickTopMenu = () => this.setState({ menuFixed: false });

  render() {
    const { menuFixed, overlayFixed, overlayRect } = this.state;
    function showNavigation() {
      if (Auth.loggedIn()) {
        return (
          <List celled horizontal id="navbtn">
            <List.Item>
              <Link to="/orderHistory">
                <Icon link name="signup" size="big" />
              </Link>
            </List.Item>
            <List.Item>
              {/* this is not using the Link component to logout or user and then refresh the application to the start */}
              <a href="/" onClick={() => Auth.logout()}>
                <Icon link name="log out" size="big" />
              </a>
            </List.Item>
          </List>
        );
      } else {
        return (
          <List celled horizontal id="navbtn">
            <List.Item>
              <Link to="/signup">
                <Icon link name="signup" size="big" />
              </Link>
            </List.Item>
            <List.Item>
              <Link to="/login">
                <Icon link name="user outline" size="big" />
              </Link>
            </List.Item>
          </List>
        );
      }
    }
    return (
      <header className="flex-row px-1">
        <div>
          <Link to="/">
            <span>
              <Image
                src={`/images/vicsLogo.png`}
                alt=""
                size="tiny"
                circular
                ß
              />
            </span>
          </Link>
        </div>
        <nav>
          {showNavigation()}
          <CategoryMenu />
        </nav>
      </header>
    );
  }
}
