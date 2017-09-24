function Player() {
  this.inventory = [['Knife', 'A rusty knife.'], ['Teeth', 'Billy\'s lucky bag of teeth.']];
  this.health = 90;
}

Player.prototype.displayInventory = function() {
  $('#player-inventory').empty();
  for (var i = 0; i < this.inventory.length; i++) {
    $('#player-inventory').append('<li>' + '<a href="#" data-toggle="tooltip" title="' + this.inventory[i][1] + '">'+this.inventory[i][0]+'</a></li>');
  }
};

Player.prototype.removeInventory = function(item) {
	for (var i = 0; i < this.inventory.length; i++) {
    for (var j = 0; j < this.inventory[i].length; j++) {
      if(this.inventory[i][j] === item) {
        this.inventory.splice(i, 1);
      }
    }
  }
};

Player.prototype.checkForItem = function(item) {
  for (var i = 0; i < this.inventory.length; i++) {
    if (this.inventory[i][0] === item) {
      return true;
    }
  } return false;
};

Player.prototype.changeHealth = function(damage) {
  this.health += damage;
  this.updateHealth();
};

Player.prototype.updateHealth = function() {
  $('#player-health').text(this.health);
  $('#healthBar').attr({'style' : 'width:' + this.health + '%'});
};
