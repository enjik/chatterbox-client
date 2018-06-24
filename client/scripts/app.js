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
      // console.log(data);
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // this.renderMessage(data);
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};


var fetchData = {
  order: '-createdAt',
  limit: 20
  //where: {roomname: 'All'}
};
app.fetch = function () {
  
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'GET',
    // datatype: 'string',
    data: fetchData,
    // contentType: 'application/json',
    success: function (data) {
      app.clearRooms();
      var rooms = new Set();
      data.results.forEach(function(ele) {
        ele.text = _.escape(ele.text);
        ele.username = _.escape(ele.username);
        ele.roomname = _.escape(ele.roomname);
        // ele.text = _.escape(ele.text);
        if (!rooms.has(ele.roomname) && ele.roomname !== '') {
          app.renderRoom(ele.roomname);
          rooms.add(ele.roomname);
        }
        app.renderMessage(ele);
        
      });
      app.clearRooms1();
      console.log(data.results);
      console.log('chatterbox: Message received');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message', data);
    }
  });
};
$(document).ready(app.fetch());

app.clearMessages = function() {
  $('#chats').empty();
};

app.renderMessage = function(message) {
  // $('#chats').prepend(`<div class="text">${message.text}</div>`);
  $('#chats').append(`<div class="chat">
                        <span class="username">${message.username}</span>
                        <br>
                        <span class="message">${message.text}</span>  
                      </div>`);
  //$('#main').append(`<div class="username">${message.username}</div`);
};

app.renderRoom = function (roomName) {
  // $('#roomSelect').prepend(`<div class="room">${roomName}</div>`);
  
  $('select').prepend(`<option value="${roomName}">${roomName}</option>`);
  
  // console.log($('select').children());
};

app.clearRooms = function() {
  $('#roomSelect').empty(); 
};

app.clearRooms1 = function() {
  $('#roomSelect').append('<option value="new room" class="createRoom">Create Room</option>');
};

// app.handleUsernameClick = function() {  
// this.handleUsernameClick.called = true; 
  
// };

// $('.username').on('click', handleUsernameClick() {
  
// }); 

app.handleUsernameClick = function(event) {
  var target = $(event.target);
  target.toggleClass('friend');
  if (event.target.className === 'username') {
    event.target.className += ' friend';
  }
  
  if (event.currentTarget.nextElementSibling.nextElementSibling.className === 'message') {
    event.currentTarget.nextElementSibling.nextElementSibling.className += ' friendMessage';
  }
  
  // event.target.addClass('friend');
  //node.addClass('friend');
};

// var currentRoom = 'Feed'; 
app.handleSubmit = function(event) {
  var message = {
    username: window.name,
    text: $('#message').val(),
    roomname: $( '#roomSelect option:selected' ).text()
  };
  app.send(message);
  app.clearMessages();
  app.fetch();
  console.log(event);
};
 



$(document).on('click', '.username', function(event) {
  event.preventDefault();
  app.handleUsernameClick(event);
}); 

// $(document).on('click', '.message', function(event) {
//   event.preventDefault();
//   console.log(event.target);
// }); 


$(document).on('submit', '.submit', function(event) {
  event.preventDefault();
  // console.log(event.target);
  app.handleSubmit(event); 
});

$(document).on('click', '.submit', function(event) {
  event.preventDefault();
  app.handleSubmit(event); 
  // currentRoom = $( '#roomSelect option:selected' ).text();
  // console.log($( '#roomSelect option:selected' ).text());
  console.log(event.target);
});

$(document).change('#roomSelect', function(event) {

  if ($( '#roomSelect option:selected' ).text() === 'Create Room') {
    var text = prompt('Room name: ');
    app.renderRoom(text);
  } else {
    var roomNameObj = {roomname: $( '#roomSelect option:selected' ).text()};
    fetchData['where'] = roomNameObj; 
    app.clearMessages();
    app.fetch();
  }
});

// // This is different than e.currentTarget which would refer to the parent <ul> in this context
// e.target.style.visibility = 'hidden';

// $(document).on('click', '#createRoom', function(event) {
//   event.preventDefault();
//   var text = prompt('Room name: ');
//   app.renderRoom(text);
// });

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
