// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.00;

contract SimpleStorage {
    string public data;

    function set(string memory _data) public {
        data = _data;
    }

    function get() view public returns (string memory) {
        return data;
    }
}