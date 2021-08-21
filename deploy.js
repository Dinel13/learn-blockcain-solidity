// deploy code will go here
const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile.js");

const provider = new HDWalletProvider(
  "error guard crisp tube anxiety combine law limit region abandon matter option",
  "https://rinkeby.infura.io/v3/d1da4480046c4875a5b8afda91fbe29b"
);

const web3 = new Web3(provider);

let accounts;

const deploy = async () => {
  //get a list of alll accounts
  accounts = await web3.eth.getAccounts();

  console.log("deploy from accont", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there"] })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("deployed to ", result.options.address);
};
deploy();
