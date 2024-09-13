// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

// Description:
// The `Wallet` smart contract is responsible to hold funds and only allow its owner to withdraw them.
// It does that by keeping a number as state, the `counter` state variable.
// It has 3 functionalities:
// * to allow depositing funds (already provided)
// * to allow withdrawals to another account if there is enough balance in the wallet
// * to return the current balance of the wallet

contract SimpleWallet {
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function deposit() public payable {}

    function withdraw(address receiver, uint256 amount) public onlyOwner {
        // Complete the function to be able to send `amount` to `receiver` address.
        // If the contract has insufficient balance, provide this error message "Insufficient balance".
        // Hints:
        // * You can access the balance of this contract by: `address(this).balance`
        // * You can transfer x amount of funds to y receiver by: `payable(y).transfer(x)`
        require(address(this).balance >= amount, "Insufficient balance");
        payable(receiver).transfer(amount);
    }

    function getBalance() public view returns (uint256) {
        // Complete the function to be able to return the current balance of the wallet.
        // Hints:
        // * You can access the balance of this contract by: `address(this).balance`
        // * You can return a value from a Solidity function using the `return` keyword
        return address(this).balance;
    }
}