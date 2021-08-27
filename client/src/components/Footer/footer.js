import React from "react";
// Here we are importing a CSS file as a dependency
import "../Footer/footer.css";
import { Input } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { Button, Icon } from "semantic-ui-react";
import SocialFollow from "./SocialFollow";

function Footer() {
  return (
    <div class="footer-input">
      <Header as="h4">Join our mailing list:</Header>{" "}
      <Input placeholder="gimme@icecream.com" />
      <Button> Join</Button>
      <Header as="h4">Follow:</Header>
      <SocialFollow />
    </div>
  );
}

export default Footer;
