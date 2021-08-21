// contract test code will go here
const assert = require("assert"); //assert library
const ganache = require("ganache-cli");
const Web3 = require("web3"); //huruf besart karena web3 adalah fungsi constructor
const { interface, bytecode } = require("../compile.js");

const web3 = new Web3(ganache.provider()); //argumen proovider dapat diganti

let accounts;
let inbox;

beforeEach(async () => {
  //get a list of alll accounts
  try {
    accounts = await web3.eth.getAccounts();
  } catch (error) {}

  //use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["HI there"] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploy a contract", () => {
    console.log(inbox);
  });
});
