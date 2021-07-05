// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6;

contract Escrow {
    address public buyer;
    address payable public seller;
    address public arbiter;
    
    // @notice Logs the address of the sender and amounts paid to the contract
    event Paid(address indexed _from, uint _value);
    // @notice Logs the approval
    event Approved(address indexed _from);

    modifier onlyDepositor() {
        require(msg.sender == buyer, "Only buyer can call this method");
        _;
    }

    modifier onlyArbiter() {
        require(msg.sender == arbiter, "Only arbiter can call this method");
        _;
    }

    constructor() {
        arbiter = msg.sender;
    }

    function addSeller(address payable _seller) public {
        seller = _seller;
    }

    function addBuyer(address _buyer) external{
        buyer = _buyer;
    }

    function sellerAddress() external view returns (address){
        return seller;
    }

    function arbiterAddress() external view returns (address){
        return arbiter;
    }

    function contractBalance() public view returns(uint256) {
    return address(this).balance;
    }

    function depositEther() external payable onlyDepositor {
        emit Paid(msg.sender, msg.value);
    }

    function approve() public onlyArbiter {
        emit Approved(msg.sender);
        uint256 balance = address(this).balance;
        seller.transfer(balance);
    }
}