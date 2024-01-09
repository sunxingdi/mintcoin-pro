// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20FixedSupply is ERC20, Ownable {
    constructor(address initialOwner)
        ERC20("MyToken", "MTK")
        Ownable(initialOwner)
    {
        // totalSupply = 10000; decimals = 18;
        _mint(msg.sender, 10000 * (10**uint256(18)));
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
