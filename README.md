
-------
<p align="center">
    <a href="#Appearance">Appearance</a> &bull;
    <a href="#Getting Started">Getting Started</a> &bull;
    <a href="#Using the DApp">Using the DApp</a> &bull;
    <a href="#Disclaimers">Disclaimers</a> &bull;
    <a href="#Authors">Authors</a> &bull;
    <a href="#Acknowledgements">Acknowledgements</a>
</p>
-------



```
                                                +++    
                                             ++
                                            +
                       ++++++++  ++    ++  ++++++++  +++++++    ++++++++  ++++++
                       ++++++++  ++    ++  ++++++++  ++    ++   ++++++++  ++++++
                       ++        ++    ++  ++    ++  ++    ++   ++    ++  ++
                       ++        ++++++++  ++    ++  +++++++    ++    ++  ++++++
                       ++        ++++++++  ++    ++  ++++       ++    ++  ++++++
                       ++        ++    ++  ++    ++  ++ ++      ++    ++      ++
                       ++++++++  ++    ++  ++++++++  ++   ++    ++++++++  ++++++
                       ++++++++  ++    ++  ++++++++  ++     ++  ++++++++  ++++++
```

## Appearance

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need the following technical requirements before you are able to run
this project

```
Node.js v6+ LTS and npm (comes with Node)
[https://nodejs.org/en/]
```
```
Git
[https://git-scm.com/]
```
Once these are installed open terminal and run the following on your command line to install Truffle:
>npm install -g truffle

#to verify that Truffle has been installed properly type [truffle version] on the terminals command line.

```
Ganache
[https://truffleframework.com/ganache]
```
```
MetaMask
[https://metamask.io]
```

### Installing / Running the Tests

Now that your system has been prepped we now have to compile and migrate the smart contract contained within the downloaded file to Ganache so you can run it.


The contract is written in Solidity, which is a compiled language. This means we have to first compile our Solidity to bytecode so the Ethereum Virtual Machine (EVM) can execute it. In terminal, making sure you are in the root directory that contains the downloaded DApp run:

    >truffle compile

You should see something similar to the following on your screen:
```
    >>>Compiling ./contracts/Migrations.sol
    >>>Compiling ./contracts/Reservation.sol
    >>>Writing artifcats to ./build/contracts
```
Now that we've successfully compiled the contracts for the DApp, we need to migrate them to blockchain. Migrations are essentially just a deployment script that alters the state of your applications contracts, moving it from one state to another.

However, before we migrate the contracts to blockchain, we need to have a blockchain running. For this project we used Ganache, which is a virtual personal blockchain for Ethereum development. At this point, please open up Ganache's application. When you first open Ganache, it automatically generatesthe local port 7545. The port used for this project is different, so you willhave to navigate to settings in the top right corner > click on port number > switch to 8566.

Now that you've changed the port, navigate back to your terminal and type:

    >truffle migrate

You should see output similar to the following one:
```
    >Using network 'development'.

    Running migration: 1_initial_migration.js
    Deploying Migrations...
    ... 0xb684361ffb25ab56d79c2c586422b8cfe327234aa11fc97a49f558473d5cf7e1
    Migrations: 0xb74bf96d04431887a078081c1bd6d4486348d74a
    Saving successful migration to network...
    ... 0xb67a087230a119e93a3073ccdb389a56b2cd05d8d18ae67f97c291ddd485c9cc
    Saving artifacts...
    Running migration: 2_deploy_contracts.js
    Deploying Reservation...
    ... 0xa9260514b71028f9d27cd22bcd20343317457678f60a095e697ed11ebeea57f8
    Reservation: 0x545589c58934a5c11fb2bde22ecc957670704922
    Saving successful migration to network...
    ... 0x5ea1048dda2de7e3eedfe8179acbee8ac442f630ffdfe5c9a8565e44f2a7bf3b
    Saving artifacts...

```
The next step is to test the smart contract you just migrated. We've already taken care of the backend stuff for this one, so just navigate back to terminal's command line and type:

    >truffle test

If all the tests run smoothly, as they should, you should see something similar in terminal:

```
    >Using network 'development'.
    Compiling ./contracts/Reservation.sol...
    Compiling ./test/TestReservation.sol...
    Compiling truffle/Assert.sol...
    Compiling truffle/DeployedAddresses.sol...

      TestReservation
        ✓ testUserCanReserveRoom (47ms)
        ✓ testGetRoomAddressByRoomId (90ms)
        ✓ testGetRoomAddressByRoomIdInArray (557ms)

    3 passing (1s)
```

### Configuring MetaMask 

Once installed, you'll see the MetaMask icon next to your address bar in your browser (Chrome). Click on the icon and set up the account. Click on the menu that shows "Main Network" and select Custom RPC. In the box titled "New RPC URL" enter `http://127.0.0.1:8566` and click Save. The network name at the top will change to say "Private Network". Click on the arrow next to "Settings" to leave this page and return to the Accounts page. Import an account using the private key of one of the accounts running in Ganache (other than 
account with index 0).

Each account created by Ganache is given 100 ether. It's slightly less on the account with index 0 because some gas was used when the contract was deployed and when the tests were run.

## Using the DApp

To start the local web server and interact with the application, (keeping in mind that the downloaded file still needs to be selected within terminal) type:

    >npm run dev

The dev server will launch and open a new browser tab containing the dApp. 

To use the dApp, search for the room (using any of the room characteristics), click the Reserve button on the room of your choice.

You'll be automatically prompted to approve the transaction by MetaMask. Type in the gas fee that you want to pay to get the trasaction approved faster. Click Submit. You'll see the button next to the reserved room change to "Reserved" and become disabled because the room has now been booked. You can also import the reservation to your Google calendar. 

You'll see the transaction listed in MetaMask and in Ganache under the "Transactions" section.

## Disclaimers

This is just a smaller test version of a larger scale project we are looking to roll out. For the time being this is not a fully functional 'live' project on our blockchain, Choros. Any currency used on this platform is worthless and is being used solely for development purposes.

## Authors

* **Izabela Litwin** - *Design and Implementation* 

* **Austin Saunders** - *Design and Whitepaper*

* **Will Leelamanthep** - *Design and Whitepaper*

## Acknowledgments

* Big thanks to our professor Nikhil Malik for all the support and giving us thechance to take this project to the next level.
* The inspiration for this project came from a very outdated system our campus uses called 25Live for book reservations. It's slow, clunky and inefficient. With Blockchain, we were able to completely turn this around.
* We used the Ethereum Pet Shop tutorial created by Truffle to build this DApp.
