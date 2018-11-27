pragma solidity ^ 0.4 .17;

//This contract is for registration of a single item for bidding
contract Bidding {

    address admin;
    string itemName;
    uint itemBasePrice;

//This structure would be used to save bids from party B and C. For now only two attributes are kept for demo purposes
    struct bid {
        string itemName;
        uint bidAmount;
    }

//Indexed Mapping to keep a track and easy retrieval of bids. #Key# here is unique bidderAddress of party B and C
    mapping(address => bid) bids;

    event registerItemEvent(string _actionPerformed, string _itemName, uint _itemBasePrice, uin256 _timeOfTx);

    modifier onlyNodeA() {
        if (msg.sender != admin)
        throw;
        _;
    }
    
    function Bidding() {
        admin = msg.sender;
    }

    function registerItem(string _itemName, uint _itemBasePrice) onlyNodeA() {
        itemName = _itemName;
        itemBasePrice = _itemBasePrice;
        registerItemEvent("ITEM REGISTERED", _itemName, _itemBasePrice, now);
    }

    function viewItem(string _itemName) returns(uint) {
       return (itemBasePrice);
    }

    function placeBid(string _itemName, address _bidderAddress, uint _bidAmount) {
        bids[_bidderAddress].itemName = _itemName;
        bids[_bidderAddress].bidAmount = _bidAmount; 
    }
}
