module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    currency: "ETH",
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    develop: {
      port: 8545
    }
  },
  compilers: {
    solc: {
      version: "^0.8.6",
      parser: "solcjs",  // Leverages solc-js purely for speedy parsing
    }
  }
};
