// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

// Description:
// The `Owner` smart contract can only be used by its owner.
// If its owner calls it, it allows execution. If another address calls it, it doesn't allow execution.
// It does that by keeping an address as state, the `owner` state variable.
// The contract should be able to:
// * restrict access to any function (e.g. `updateState`) when the caller is not the owner
// * update it's owner to a new owner

contract Owner {
    address public owner;
    bool public paused;
    uint256 public lastUpdated;

    modifier onlyOwner() {
        // Complete the modifier to restrict access only to accounts that are the owner
        // If the caller is not the owner, provide this error message "Only the owner can call this function"
        // HINTS:
        // * The owner account is stored in the state variable `owner`
        // * The caller account can be accessed through the `msg.sender` global variable
        // * You can validate a condition using the `require(bool condition, string error_message)` function

        // ONLY UPDATE ABOVE THIS LINE
        require(owner == msg.sender, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function updateOwner(address newOwner) external onlyOwner {
        // Complete the function update the contract owner with a new owner
        // HINTS:
        // * The owner account is stored in the state variable `owner`
        // * You can update the value of a variable by: `variable_name = new_value;`
        owner = newOwner;
    }

    function updateState() external onlyOwner {
        lastUpdated = block.timestamp;
    }

    receive() external payable {}
}