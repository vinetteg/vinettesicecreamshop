import React from "react";
// Here we are importing a CSS file as a dependency
import "../Footer/footer.css";
import { Input } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { Button, Icon } from "semantic-ui-react";
import SocialFollow from "./SocialFollow";

function Footer() {
  return (
    <div className="footer-input">
      <Header as="h3">Join our mailing list:</Header>{" "}
      <Input className="emailInput" placeholder="gimme@icecream.com" />
      <Button className="joinButton"> Join</Button>
      <Header as="h3">Follow:</Header>
      <SocialFollow />
    </div>
  );
}

export default Footer;
