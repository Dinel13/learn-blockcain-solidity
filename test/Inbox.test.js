// contract test code will go here
const assert = require("assert"); //assert library
const ganache = require("ganache-cli");
const Web3 = require("web3"); //huruf besart karena web3 adalah fungsi constructor

const web3 = new Web3(ganache.provider()); //argumen proovider dapat diganti

class Car {
   park() {
     return "stopped";
   }
   drive() {
     return "vroom";
   }
 }
 
 let car;
 
 beforeEach(() => {
   car = new Car();
 });
 
 describe("Car", () => { //argumen pertman hnaya untuk describe jadi tidak terlalu penting
   it("can park and return stopped", () => {
     assert.equal(car.park(), "stopped");
   });
   it("can drive", () => {
     assert.equal(car.drive(), "vroom");
   });
 });