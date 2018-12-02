pragma solidity ^0.4.17;

contract Reservation {

	  address[741] public rooms;


	  // Reserving a room
	  function reserve(uint roomID) public returns (uint) {
	  require(roomID >= 0 && roomID <= 740);

	  rooms[roomID] = msg.sender;

	  return roomID;
	}

	// Retrieving the rooms
	  function getRooms() public view returns (address[741]) {
	  return rooms;
	}


}




