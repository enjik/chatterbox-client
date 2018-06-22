// YOUR CODE HERE:

var app = {};

var message = {
  username: 'despinoz',
  text: 'test',
  roomname: '4chan'
};

app.init = function () {};
app.send = function () {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

var firstTenElements = function (arr) {
  var messages = [];
  for (var i = 0; i < 10; i++) {
    messages.push(arr.results[i].text);
  }
  return messages;
};


$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  type: 'GET',
  // data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message received');
    console.log(data);
    for (var i = 0; i < 10; i++) {
      $('#chats').prepend(`<div class="chat">
                            <span class="username">${data.results[i].username}:</span><br>
                            <span>${data.results[i].text}</span>
                            </div>`);
    }
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to get message', data);
  }
});
