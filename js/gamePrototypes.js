Game.prototype.getCurrentPlayer = function() {
  return this.currentPlayer;
};

Game.prototype.start = function() {
  var newPlayer = new Player();
  newPlayer.displayInventory();
  newPlayer.updateHealth();
  this.currentPlayer = newPlayer;
  this.goToRoom('entrance');
};

Game.prototype.goToRoomByButton = function(button) {
  var roomToGoTo;

  if (button.validatesInventoryFor) {
    if (this.getCurrentPlayer().checkForItem(button.validatesInventoryFor)) {
      roomToGoTo = button.roomNameSuccess;
    } else {
      roomToGoTo = button.roomNameFailure;
    }
  } else {
    roomToGoTo = button.roomName;
  }

  if (button.addsToInventory) {
    this.getCurrentPlayer().inventory = this.getCurrentPlayer().inventory.concat(button.addsToInventory);
    this.getCurrentPlayer().displayInventory();
  }

  if (button.healthVar) {
    this.getCurrentPlayer().changeHealth(button.healthVar);
  }

  if (button.removesFromInventory) {
    this.getCurrentPlayer().removeInventory(button.removesFromInventory);
    this.getCurrentPlayer().displayInventory();
  }

  if (button.hideButton) {
    $('#'+button.hideButton).hide(800);
  }

  if (button.alertMessage) {
    $('#messageDiv').empty();
    $('#messageDiv').append('<h4>'+button.alertMessage+'</h4>');
    $('#messageDiv').show(800);
    return;
  }

  if (button.image) {
    $('#storyImages').fadeOut(800, 'swing', function() {
      $('#storyImages').append('<img src="img/'+button.image+'">');
      $('#storyImages img:first-child').remove();
      $('#storyImages').fadeIn(800);
    });
  }

  this.goToRoom(roomToGoTo);
};

Game.prototype.goToRoom = function(roomName) {
  window.$('#messageDiv').hide(800);
  var room = this.rooms.find(function(room) {
    return room.name === roomName;
  });

  if (!room) {
    window.alert('YOU HAVE NOT DEFINED THAT ROOM '+ roomName);
    return;
  }

  window.$('#story .messages').hide(800, function() {

    window.$('#story .messages')[0].innerHTML = room.messages.reduce(function(memo, message) {
      return memo + '<p>' + message + '</p>';
    }, '');

    window.$('#story .messages').show(800);
  });

  if (room.buttons.length) {
    window.$('#story .button-group').hide(800, function() {
      window.$('#story .button-group')[0].innerHTML = room.buttons.reduce(function(memo, button) {
        return memo + "<button id=" + button.hideButton + " class='btn' data-button='"+ JSON.stringify(button) +"'>" + button.text + "</button>";
      }, '');
      window.$('#story .button-group').show(800);
    });
  } else {
      window.$('.button-group').empty(800);
      window.$('.try-again').show(800);
      $('#storyImages').prepend('<img src="img/death.png">');
      $("#storyImages img:last-child").remove();
    }
};
