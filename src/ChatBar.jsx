import React from 'react';
console.log("Rendering <ChatBar/>");
const ChatBar = React.createClass({


  getInitialState: function(props) {
    return {content: '', username: 'Anon', oldName:'Anon'}
  },

  handleMessageChange: function(event) {
    this.setState({
      content: event.target.value,
      username: this.state.username
    });
  },

  handleNameChange: function(event) {
      this.setState({
        username: event.target.value
      })
  },
  handleEnter: function(event) {
    if(event.key === 'Enter') {
      if (event.target.id === "username") {
        if (event.target.value.length !== 0 && event.target.value.length < 15) {
          var oldName = this.state.username
          var content = this.state.content
          this.setState({
            username: event.target.value,
            oldName: oldName,
            content: content,
          })
          this.props.handleChange(this.state, "postNotification")
        }
      }
      else if (event.target.id == "new-message") {
        if (event.target.value.length !== 0 && event.target.value.length < 80) {
          this.setState({
            username: this.state.username,
            oldName: this.state.oldName,
            content: event.target.value,
          })
          this.props.handleChange(this.state, "postMessage")
        }
      }
      else {
        return
      }
    }
  },

  render: function() {
    return (
      <footer>
          <input
            id="username"
            type="text"
            value={this.state.username}
            placeholder="Your Name (Optional)"
            onChange={this.handleNameChange}
            onKeyUp={this.handleEnter}
            />
          <input
            id="new-message"
            type="text"
            placeholder="Type a message and hit ENTER"
            onChange={this.handleMessageChange}
            onKeyUp={this.handleEnter}
          />
      </footer>
    );
  }
});
export default ChatBar;