# sampleBiddingProject

My personal thoughts on the use case:-

This Use Case asssumes running three Quorum nodes for this bidding use case. As per my experience with such projects users bidding for the item would not be using dedicated quorum nodes to initiate bidding transations but rather their keys. 1-1 relationship between Quorum nodes and parties would not be scalable(assuming parties B and C are end bidder and not a mediater oranisation taking bids on end users behalf). 

In case parties are end users we can allot them unique assymetric encryption keys within a single/multiple node/s in party A's control by exposing APIs(hitting personal.createAccount(...)) to these end Users via a web/Mobile dashboard and they can use these keys to send bids using their UI client ( placeBid.sendTransaction(...) )



Initialising three Quorum Nodes --> This can be done by:-

Running three different Quorum instances(I prefer consensys to be on raft or IBFT) on three VMs and pairing them using addPeer() RPC method. In case this project needs to be simulated on a single machine we can also create three different Qurum nodes by changing Data Directory for all three nodes within the same VM. For further simplicity we can use QNM toolkit maintained by Connie Byers of Consensys South Africa.
