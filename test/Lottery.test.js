// contract test code will go here
const assert = require("assert"); //assert library
const ganache = require("ganache-cli");
const Web3 = require("web3"); //huruf besart karena web3 adalah fungsi constructor
const { interface, bytecode } = require("../Lottery/compile.js");

const web3 = new Web3(ganache.provider()); //argumen proovider dapat diganti

let lottery;
let accounts;

beforeEach(async () => {
  //get a list of alll accounts
  accounts = await web3.eth.getAccounts();

  //use one of those accounts to deploy the contract
  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Lottery Contract", () => {
  it("deploy a contract", () => {
    assert.ok(lottery.options.address);
    //ok = true jika value argument ada.
    // yang hanya terjadi jika ciontract berhasil dibuat
  });
  it("allow one occiount to enter", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether"),
    });

    const player = await lottery.methods.getAllPlayers().call({
      from: accounts[0],
    });

    assert.equal(accounts[0], player[0]);
    assert.equal(1, player.length);
  });
  it("allow multiple occiount to enter", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether"),
    });

    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei("0.02", "ether"),
    });

    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei("0.02", "ether"),
    });

    const player = await lottery.methods.getAllPlayers().call({
      from: accounts[0],
    });

    assert.equal(accounts[0], player[0]);
    assert.equal(accounts[1], player[1]);
    assert.equal(accounts[2], player[2]);
    assert.equal(3, player.length);
  });
});
