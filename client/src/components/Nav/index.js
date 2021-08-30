import React, { Component, createRef } from "react";
import "./style.css";
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
  Sticky
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

contextRef = createRef()

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
<<<<<<< HEAD
<<<<<<< HEAD
  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/products/:id">
=======
  stickOverlay = () => this.setState({ overlayFixed: true });
>>>>>>> 51ea80dc1f9c2e829a3bcf3297ab71b408b64aa8
=======
  stickOverlay = () => this.setState({ overlayFixed: true });
>>>>>>> 51ea80dc1f9c2e829a3bcf3297ab71b408b64aa8
=======
  stickOverlay = () => this.setState({ overlayFixed: true });
>>>>>>> a5c345f603f32f0d7b93f9506ced901c5e6c29e7

  stickTopMenu = () => this.setState({ menuFixed: true });

  unStickOverlay = () => this.setState({ overlayFixed: false });

  unStickTopMenu = () => this.setState({ menuFixed: false });

  render() {
    const { menuFixed, overlayFixed, overlayRect } = this.state;
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
      <header text style={{ marginTop: "2em" }} className="flex-row px-1">
        <div>
          <Link to="/">
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
        </div>
        <Visibility onBottomPassed={this.stickTopMenu}
        onBottomVisible={this.unStickTopMenu}
        once={false}>
        <nav fixed={menuFixed ? 'top' : undefined}
        style={menuFixed ? fixedMenuStyle : menuStyle}
        >
          <CategoryMenu />
        </nav>
        {showNavigation()}
       
        
        </Visibility>
      </header>
    )
  }
}
