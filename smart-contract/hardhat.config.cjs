require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { PRIVATE_KEY, BSCSCAN_API_KEY, BSC_TESTNET_RPC } = process.env;

module.exports = {
  solidity: "0.8.20",
  networks: {
    bscTestnet: {
      url: BSC_TESTNET_RPC || "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: BSCSCAN_API_KEY,
  },
};