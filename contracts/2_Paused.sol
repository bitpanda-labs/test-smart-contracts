// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

// Description:
// The `Paused` smart contract can be paused and unpaused.
// If it is paused, it cannot be used. If it is unpaused it can be used.
// It does that by keeping a boolean as state, the `paused` state variable.
// If `paused` is true, the contract is paused.
// If `paused` is false, the contract is not paused.
// The contract should be able to:
// * restrict access to any function (e.g. `updateState`) when the contract is paused
// * toggle its paused status with a call to the `togglePaused` function

contract Paused {
    bool public paused;
    uint256 public lastUpdated;

    modifier onlyWhenNotPaused() {
        // Complete the modifier to only allow access when the contract is not paused
        // If the contract is paused, provide this error message "The contract is paused"
        // HINTS:
        // * The `paused` state variable controls if a contract is paused or not
        // * You can validate a condition using the `require(bool condition, string error_message);` function

        // ONLY UPDATE ABOVE THIS LINE
        require(!paused, "The contract is paused");
        _;
    }

    constructor() {
        paused = false;
        lastUpdated = block.timestamp;
    }

    function togglePause() external {
        // Complete the function to be able to toggle the contract as paused and not paused
        // Hints:
        // * The `paused` state variable controls if a contract is paused or not
        // * The `!` operator can be used to evaluate the invert of a boolean value: !true -> false, !false -> true
        paused = !paused;
    }

    function updateState() external onlyWhenNotPaused {
        lastUpdated = block.timestamp;
    }

    receive() external payable {}
}