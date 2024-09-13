// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

// Description:
// The `Counter` smart contract is a decentralised way to keep track of the times something has happened.
// It does that by keeping a number as state, the `counter` state variable.
// It has 3 functionalities:
// * to increase the counter by 1
// * to decrease the counter by 1 (cannot go below 0)
// * to check the current value of the counter

contract Counter {
    int256 public counter;

    constructor() {
        counter = 0;
    }

    function increment() public {
        // Complete the function to increment the counter.
        // Hints:
        // * You can access the current counter through the state variable `counter`
        // * You can add 1 to a number by: `number += 1;`
        counter += 1;
    }

    // Function to decrement the counter
    function decrement() public {
        // Complete the function to increment the counter.
        // The counter should not go below 0, when the counter is 0 and `decrement` is called, it should remain as 0.
        // Hints:
        // * You can access the current counter through the state variable `counter`
        // * You can subtract 1 from a number by: `number -= 1;`
        // * You can execute code if a condition is true with the `if` keyword, e.g.
        // if (condition) {
        //     <code I want to execute>
        // }
        if (counter > 0) {
            counter -= 1;
        }
    }

    function getCounter() public view returns (int256) {
        // Complete the function to return the counter.
        // Hints:
        // * You can access the current counter through the state variable `counter`
        // * You can return a value from a Solidity function using the `return` keyword
        return counter;
    }
}
