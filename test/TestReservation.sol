pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Reservation.sol";

contract TestReservation {
  Reservation reservation = Reservation(DeployedAddresses.Reservation());

  function testUserCanReserveRoom() public {
  	uint returnedId = reservation.reserve(9);

  	uint expected = 9;

  	Assert.equal(returnedId, expected, "Reservation of room ID 9 should be recorded.");
  }

  // Testing retrieval of a single room's owner
  function testGetRoomAddressByRoomId() public {
  // Expected owner is this contract
  	address expected = this;

  	address room = reservation.rooms(9);

  	Assert.equal(room, expected, "Owner of room ID 9 should be recorded.");
  }

  // Testing retrieval of all room owners
  function testGetRoomAddressByRoomIdInArray() public {
  // Expected owner is this contract
  	address expected = this;

  // Store rooms in memory rather than contract's storage
  	address[1020] memory rooms = reservation.getRooms();

  	Assert.equal(rooms[9], expected, "Owner of room ID 9 should be recorded.");
  }

}
