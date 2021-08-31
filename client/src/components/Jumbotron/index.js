import React from "react";
import "./style.css";
import Slide from "react-reveal/Slide";

function Jumbotron() {
  return (
    <div class="ui masthead center aligned segment ui fluid" id="jumboPic">
      <div class="ui text container">
        <Slide top>
          <h1>You Followed Your Heart and It Led You to Ice Cream</h1>
        </Slide>
      </div>
    </div>
  );
}

export default Jumbotron;
