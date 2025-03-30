require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    goerli: {
      url: process.env.GOERLI_RPC_URL, // Add your Goerli RPC URL in .env
      accounts: [process.env.PRIVATE_KEY] // Add your private key in .env
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL, // For Sepolia testnet
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};

