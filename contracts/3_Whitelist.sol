// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

// Description:
// The `WhiteList` smart contract is responsible to check if an address is whitelisted or not.
// It does that by keeping a mapping (key-value store) as state, the `whitelist` state variable.
// If an address (key) is stored with true (value), it is whitelisted.
// If an address (key) is stored with false (value), it is not whitelisted.
// It has 3 functionalities:
// * to whitelist an address
// * to remove an address from the whitelist
// * to check if an address is whitelisted

contract Whitelist {
    mapping(address => bool) public whiteList;

    constructor() {}

    function addAddress(address account) external {
        // Complete the function to be able to add a new address to the whitelist.
        // Hints:
        // * You can modify the value for a key of a mapping by: `mapping[key] = new_value;`
        // * A whitelisted address has `true` as its value in the mapping.
        whiteList[account] = true;
    }

    function removeAddress(address account) external {
        // Complete the function to be able to remove an address from the whitelist.
        // Hints:
        // * You can modify the value for a key of a mapping by: `mapping[key] = new_value;`
        // * A non-whitelisted address has `false` as its value in the mapping.
        whiteList[account] = false;
    }

    function isWhitelisted(address account) external view returns (bool) {
        // Complete the function to return the whitelist status of an address.
        // Hints:
        // * You can access the value for a key of a mapping by: `value = mapping[key]`
        // * You can return a value from a Solidity function using the `return` keyword
        return whiteList[account];
    }
}
