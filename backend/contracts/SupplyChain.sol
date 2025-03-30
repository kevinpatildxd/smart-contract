// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SupplyChain {
    enum ProductState { Created, Shipped, Delivered }

    struct Product {
        uint id;
        string name;
        uint256 price; // ✅ Price stored as ETH (multiplied by 10^18)
        address owner;
        ProductState state;
    }

    uint public productCount = 0;
    mapping(uint => Product) public products;

    event ProductCreated(uint id, string name, uint256 price, address owner);
    event ProductShipped(uint id);
    event ProductDelivered(uint id, address newOwner);

    // ✅ Accepts price in ETH (multiplied by 10^18)
    function createProduct(string memory name, uint256 price) public {
        require(bytes(name).length > 0, "Product name cannot be empty");
        require(price > 0, "Price must be greater than zero");

        productCount++;
        products[productCount] = Product(productCount, name, price, msg.sender, ProductState.Created);

        emit ProductCreated(productCount, name, price, msg.sender);
    }
}
