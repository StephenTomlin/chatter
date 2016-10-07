import React from 'react';
import App from './App.jsx'
console.log("Rendering <NavBar/>");
const NavBar = React.createClass({
  render: function() {
    return (
      <div id="nav">
        <p id="counter">CLIENT COUNT: {this.props.clientCount}</p>
        <h1>Stephen's Chatty App</h1>
      </div>
    );
  }
});
export default NavBar;