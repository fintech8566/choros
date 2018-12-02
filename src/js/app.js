App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load rooms.
    $.getJSON('../rooms.json', function(data) {
      var roomsRow = $('#roomsRow');
      var roomTemplate = $('#roomTemplate');

      for (i = 0; i < data.length; i ++) {
        roomTemplate.find('.panel-title').text(data[i].name);
        roomTemplate.find('img').attr('src', data[i].picture);
        roomTemplate.find('.room-floor').text(data[i].floor);
        roomTemplate.find('.room-capacity').text(data[i].capacity);
        roomTemplate.find('.room-time').text(data[i].time);
        roomTemplate.find('.btn-reserve').attr('data-id', data[i].id);
                            str1 = "http://www.google.com/calendar/event?action=TEMPLATE&text=My%20Event&dates=";
                            time1 = data[i].time[0];
                            time2 = data[i].time[2];
                            time3 = Number(time1)+ 5 + 12; 
                            time4 = Number(time2)+ 5 + 12; 
                            loc1 = data[i].name;
                            loc2 = loc1.split(' ').join('%20');
                            str4 = "&details=Event%20Details%20";
                            str5 = '&location=';
                            date1 = '20190101' + 'T' + String(time3) + '0000Z';
                            date2 = '20190101' + 'T' + String(time4) + '0000Z';
                            output1 = str1 + date1 + '/' + date2 + str4 + str5 + loc2;
        roomTemplate.find('.output1').attr('href',output1);
        
        roomsRow.append(roomTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
    App.web3Provider = web3.currentProvider;
    } else {
    // If no injected web3 instance is detected, fall back to Ganache
    App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function() {

    $.getJSON('Reservation.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var ReservationArtifact = data;
      App.contracts.Reservation = TruffleContract(ReservationArtifact);

      // Set the provider for our contract
      App.contracts.Reservation.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the reserved rooms
      return App.markReserved();
    });
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-reserve', App.handleReserve);
  },

  markReserved: function(rooms, account) {
    var reservationInstance;

    App.contracts.Reservation.deployed().then(function(instance) {
      reservationInstance = instance;

      return reservationInstance.getRooms.call();
    }).then(function(rooms) {
      for (i = 0; i < rooms.length; i++) {
        if (rooms[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-room').eq(i).find('button').text('Reserved').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  handleReserve: function(event) {
    event.preventDefault();

    var roomId = parseInt($(event.target).data('id'));
    var reservationInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Reservation.deployed().then(function(instance) {
        reservationInstance = instance;

        // Execute reserve as a transaction by sending account
        return reservationInstance.reserve(roomId, {from: account});
      }).then(function(result) {
        return App.markReserved();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
