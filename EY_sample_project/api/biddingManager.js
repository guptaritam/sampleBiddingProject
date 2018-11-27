var biddingManagerApiRoutes = require('express').Router();

var Web3 = require('web3');
var config = require('../config/config')

var web3;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:20010"));
    console.log(web3.net.peerCount);
}

web3.eth.defaultAccount = web3.eth.coinbase;

var biddingManagerContractAddress = config.biddingManagerContractAddress;


// now contract interface
var biddingManagerContractABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_itemName",
				"type": "string"
			},
			{
				"name": "_itemBasePrice",
				"type": "uint256"
			}
		],
		"name": "registerItem",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_itemName",
				"type": "string"
			},
			{
				"name": "_bidderAddress",
				"type": "address"
			},
			{
				"name": "_bidAmount",
				"type": "uint256"
			}
		],
		"name": "placeBid",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_itemName",
				"type": "string"
			}
		],
		"name": "viewItem",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_actionPerformed",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_itemName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_itemBasePrice",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_timeOfTx",
				"type": "uint256"
			}
		],
		"name": "registerItemEvent",
		"type": "event"
	}
];

//The APIs below will sendTransaction()/call() contract functions using party A,B,C account keys. We can either promatically or manually unlock the key asking for the passphrase to make sure of party's identity
//now contract initiation
var biddingManagerContract = web3.eth.contract(biddingManagerContractABI).at(biddingManagerContractAddress);

biddingManagerApiRoutes.get('/', function(req, res) {

    res.send("Bidding Manager API server");

});

// this API is admin API only exposed to Node A
biddingManagerApiRoutes.post('/registerItem', function(req, res) {

    var address = req.body._address;
    var itemName = req.body._itemName;
    var itemBasePrice = req.body._itemBasePrice;

    biddingManagerContract.registerItem.sendTransaction(itemName, itemBasePrice, {
        from: address,
        gas: 400000 //hardcoded for simplicity. This value can also be dynamic based on averaging out last 2 blocks gas used
    }, function(err, result) {
        console.log(result);
        if (!err) {

            //console.log(response);
            res.json(result);
        } else
            res.status(401).json("Error" + err);
    });
});


biddingManagerApiRoutes.post('/viewItem', function(req, res) {
		
    var itemName = req.body._itemName;

    biddingManagerContract.viewItem.call(itemName, function(err, result) {
        console.log(result);
        if (!err) {

            //console.log(response);
            res.json({
                "Price" : result
            });
        } else
            res.status(401).json("Error" + err);
    });

})


biddingManagerApiRoutes.post('/placeBid', function(req, res) {

    var itemName = req.body._itemName;
    var bidderAddress = req.body._bidderAddress;
    var bidAmount = req.body._bidAmount;

    biddingManagerContract.placeBid.sendTransaction(itemName, bidderAddress, bidAmount, {
        from: bidderAddress,
        gas: 400000
    }, function(err, result) {
        console.log(result);
        if (!err) {

            //console.log(response);
            res.json(result);
        } else
            res.status(401).json("Error" + err);
    });
});

module.exports = biddingManagerApiRoutes;
