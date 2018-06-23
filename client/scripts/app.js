// YOUR CODE HERE:

var app = {};

app.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
// var message = {
//   username: 'despinoz',
//   text: 'test',
//   roomname: '4chan'
// };

app.init = function () {};
app.send = function (message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log(data);
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      this.renderMessage(data);
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function () {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'GET',
    // datatype: 'string',
    data: {
      order: '-createdAt',
      limit: 20
    },
    // contentType: 'application/json',
    success: function (data) {
      data.results.forEach(function(ele) {
        app.renderMessage(ele);
      });
      console.log(data.results);
      console.log('chatterbox: Message received');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message', data);
    }
  });
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.renderMessage = function(message) {
  // $('#chats').prepend(`<div class="text">${message.text}</div>`);
  $('#chats').prepend(`<div class="chat">
                        <span class="username">${message.username}</span>
                        <br>
                        <span>${message.text}</span>  
                      </div>`);
  //$('#main').append(`<div class="username">${message.username}</div`);
};

app.renderRoom = function (roomName) {
  $('#roomSelect').prepend(`<div class="room">${roomName}</div>`);
};

// app.handleUsernameClick = function() {  
// this.handleUsernameClick.called = true; 
  
// };

// $('.username').on('click', handleUsernameClick() {
  
// }); 

app.handleUsernameClick = function(event) {
  if (event.target.className === 'username') {
    event.target.className += ' friend';
  }
  
  console.log(event.target.className);
  // event.target.addClass('friend');
  //node.addClass('friend');
};

app.handleSubmit = function(event) {

  console.log(event);
  // node.addClass('friend');
};
 
$(document).ready(app.fetch());

$(document).on('click', '.username', function(event) {
  event.preventDefault();
  app.handleUsernameClick(event);
}); 


$(document).on('submit', '.submit', function(event) {
  event.preventDefault();
  console.log(event.target);
  app.handleSubmit(event); 
});

$(document).on('click', '.submit', function(event) {
  event.preventDefault();

  console.log(event.target);
});


// $.ajax({
// // This is the url you should use to communicate with the parse API server.
//   url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
//   type: 'GET',
//   // datatype: 'string',
//   data: {
//     order: '-createdAt',
//     limit: 10},
//     // limit: 10
//   // contentType: 'application/json',
//   success: function (data) {
//     console.log(data)
//     console.log('chatterbox: Message received');
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to get message', data);
//   }
// });

// var message = {
//   username: 'enjiego',
//   text: 'WE did ittlk;akljdsflkajdf',
//   roomname: 'the ROOM'
// };

// //});
// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
//   type: 'POST',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     $( '.result' ).html( data ); 
//     console.log(data);
//     console.log('chatterbox: Message sent');

//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message', data);
//   }
// });

// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
//   type: 'GET',
//   // data: JSON.stringify({
//   //   text: 'value: ',
//   // }),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message received');
//     // console.log(order);
//     data['results'].sort(function(a, b ) {
//       return new Date(b.createdAt) - new Date(a.createdAt); 
//     });
//     console.log(data);
//     // for (var i = 0; i < 10; i++) {
//     //   $('#chats').prepend(`<div class="chat">
//     //                         <span class="username">${data.results[i].username}:</span><br>
//     //                         <span>${data.results[i].text}</span>
//     //                         </div>`);
//     // }
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to get message', data);
//   }
// });

// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
//   type: 'PUT',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log(data);
//     console.log('chatterbox: Message sent');
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message', data);
//   }
// });
