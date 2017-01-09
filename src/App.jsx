import React from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

const App = React.createClass({




  handleChange: function(data,type) {

    var bottledMessage = {type: type, username: data.username, content: data.content}
    var bottledNotification = {type: type, content: `${data.oldName} changed their name to ${data.username}`}
      switch(type) {
        case "postMessage":
          this.socket.send(JSON.stringify(bottledMessage));

          break;
        case "postNotification":
            this.socket.send(JSON.stringify(bottledNotification));
          break;
        default:
          throw new Error("Unknown event type " + data.type);
      }
  },

  // in App.jsx
  componentDidMount: function() {
    var that = this
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:4000");
    this.socket.onmessage = function (res) {
      var returnedBottledMessage = JSON.parse(res.data)
      if (!isNaN(returnedBottledMessage)) {
        that.state.data.clientCount = returnedBottledMessage
        that.setState(that.state)
      }
      else {
        that.state.data.messages.push(returnedBottledMessage)
        that.setState(that.state)
      }
    }
  },

  getInitialState: function() {
    var data = {
      messages: [],
      clientCount:0
    }
    return {data: data};
  },

  render: function() {
    return (
      <div>
        <NavBar clientCount={this.state.data.clientCount}/>
        <MessageList messages={this.state.data.messages}/>
        <ChatBar handleChange={this.handleChange}/>
      </div>
    );
  }
});
export default App;
