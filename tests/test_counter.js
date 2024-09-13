import { expect } from "chai";
import { ethers } from "hardhat";

describe("Counter Contract", function () {
  let counterContract;

  beforeEach(async function () {
    const Counter = await ethers.getContractFactory("Counter");
    counterContract = await Counter.deploy();
    await counterContract.deployed();
  });

  it("Should initialize the counter to 0", async function () {
    const counterValue = await counterContract.getCounter();
    expect(counterValue).to.equal(0);
  });

  it("Should increment the counter by 1", async function () {
    await counterContract.increment();
    const counterValue = await counterContract.getCounter();
    expect(counterValue).to.equal(1);
  });

  it("Should decrement the counter by 1", async function () {
    await counterContract.increment();
    let counterValue = await counterContract.getCounter();
    expect(counterValue).to.equal(1);
    await counterContract.decrement();
    counterValue = await counterContract.getCounter();
    expect(counterValue).to.equal(0);
  });

  it("Should not decrement the counter below 0", async function () {
    await counterContract.decrement();
    const counterValue = await counterContract.getCounter();
    expect(counterValue).to.equal(0);
  });

  it("Should handle multiple increments and decrements correctly", async function () {
    await counterContract.increment();
    await counterContract.increment();
    await counterContract.increment();

    let counterValue = await counterContract.getCounter();
    expect(counterValue).to.equal(3);

    await counterContract.decrement();
    await counterContract.decrement();

    counterValue = await counterContract.getCounter();
    expect(counterValue).to.equal(1);

    await counterContract.decrement();
    await counterContract.decrement();
    counterValue = await counterContract.getCounter();
    expect(counterValue).to.equal(0);
  });
});
