// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20WithCapped is ERC20, ERC20Capped, Ownable {
    constructor(address initialOwner)
        ERC20("MyToken", "MTK")
        ERC20Capped(50000 * (10**uint256(18)))
        Ownable(initialOwner)
    {
        // totalSupply = 10000; decimals = 18;
        _mint(msg.sender, 10000 * (10**uint256(18)));
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Capped)
    {
        super._update(from, to, value);
    }
}
