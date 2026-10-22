// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Albayancor {
    address public developer;
    string public covenant;

    constructor(string memory _covenant) {
        developer = msg.sender;
        covenant = _covenant;
    }

    function updateCovenant(string memory _newCovenant) public {
        require(msg.sender == developer, "Not authorized");
        covenant = _newCovenant;
    }
}0
