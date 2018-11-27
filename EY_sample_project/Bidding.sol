pragma solidity ^ 0.4 .17;

contract Bidding {

    address admin;
    string itemName;
    uint itemBasePrice;

    struct bid {
        address biddingAddress;
        uint bidAmount;
    }

    mapping(string => bid) bids;

    event registerItemEvent(string _actionPerformed, string _itemName, uint _itemBasePrice);

    modifier onlyNodeA(address _address) {
        if (_address == admin)
        throw;
        _;
    }
    
    function Bidding() {
        admin = msg.sender;
    }

    function registerItem(address _address, string _itemName, uint _itemBasePrice) onlyNodeA(_address) {

        //can apply validators as below 
        //require(isItemRegistered[_itemName] == false);
        
        itemName = _itemName;
        itemBasePrice = _itemBasePrice;
    
        //isItemRegistered[_itemName] = true;

        registerItemEvent("ITEM REGISTERED", _itemName, _itemBasePrice);
    }

    //considering only a single item 
    function viewItem(string _itemName) returns(uint) {

        //require(isItemRegistered[_itemName] == true);

        return (itemBasePrice);
    }

    function placeBid(string _itemName, address _biddingAddress, uint _bidAmount) {

        bids[_itemName].biddingAddress = _biddingAddress;
        bids[_itemName].bidAmount = _bidAmount; 
    }
}