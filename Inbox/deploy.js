// deploy code will go here
const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile.js");

const provider = new HDWalletProvider(
  "error guard crisp tube anxiety combine law limit region abandon matter option",
  "https://rinkeby.infura.io/v3/d1da4480046c4875a5b8afda91fbe29b"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there!"] })
    .send({ gas: "1000000", from: accounts[0], gasPrice: '5000000000' });

  console.log("Contract deployed to", result.options.address);
};
deploy();

