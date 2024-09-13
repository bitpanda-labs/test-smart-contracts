import { expect } from "chai";
import { ethers } from "hardhat";

describe("Paused Contract", function () {
  let pausedContract;
  let owner;
  let addr1;

  beforeEach(async function () {
    const Paused = await ethers.getContractFactory("Paused");
    [owner, addr1] = await ethers.getSigners();
    pausedContract = await Paused.deploy();
    await pausedContract.deployed();
  });

  it("Should set the contract to unpaused on deployment", async function () {
    expect(await pausedContract.paused()).to.equal(false);
  });

  it("Should allow toggling the paused state", async function () {
    expect(await pausedContract.paused()).to.equal(false);
    await pausedContract.togglePause();
    expect(await pausedContract.paused()).to.equal(true);
    await pausedContract.togglePause();
    expect(await pausedContract.paused()).to.equal(false);
  });

  it("Should not allow state updates when the contract is paused", async function () {
    await pausedContract.togglePause();
    expect(await pausedContract.paused()).to.equal(true);
    await expect(pausedContract.updateState()).to.be.revertedWith("The contract is paused");
  });

  it("Should allow state updates when the contract is not paused", async function () {
    expect(await pausedContract.paused()).to.equal(false);
    await pausedContract.updateState();
    const lastUpdated = await pausedContract.lastUpdated();
    expect(lastUpdated).to.be.gt(0);
  });

  it("Should correctly handle toggling from paused to unpaused and allow state update", async function () {
    await pausedContract.togglePause();
    expect(await pausedContract.paused()).to.equal(true);

    await pausedContract.togglePause();
    expect(await pausedContract.paused()).to.equal(false);

    await pausedContract.updateState();
    const lastUpdated = await pausedContract.lastUpdated();
    expect(lastUpdated).to.be.gt(0);
  });
});
