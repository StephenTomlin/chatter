import React from 'react';
import Message from './Message.jsx';
console.log("Rendering <MessageList/>");
const MessageList = React.createClass({
  render: function() {
    return (
      <div id="message-list">
      {this.props.messages.map((result,index) => (
        <Message key={index} content={result.content} username={result.username}/>
          ))}
      </div>
    );
  }
});
export default MessageList;
