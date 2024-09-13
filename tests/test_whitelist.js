import { expect } from "chai";
import { ethers } from "hardhat";

describe("Whitelist Contract", function () {
  let whitelistContract;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    const Whitelist = await ethers.getContractFactory("Whitelist");
    [owner, addr1, addr2] = await ethers.getSigners();
    whitelistContract = await Whitelist.deploy();
    await whitelistContract.deployed();
  });

  it("Should initialize with an empty whitelist", async function () {
    expect(await whitelistContract.isWhitelisted(addr1.address)).to.equal(false);
    expect(await whitelistContract.isWhitelisted(addr2.address)).to.equal(false);
  });

  it("Should allow an address to be added to the whitelist", async function () {
    await whitelistContract.addAddress(addr1.address);
    expect(await whitelistContract.isWhitelisted(addr1.address)).to.equal(true);
  });

  it("Should allow an address to be removed from the whitelist", async function () {
    await whitelistContract.addAddress(addr1.address);
    expect(await whitelistContract.isWhitelisted(addr1.address)).to.equal(true);

    await whitelistContract.removeAddress(addr1.address);
    expect(await whitelistContract.isWhitelisted(addr1.address)).to.equal(false);
  });

  it("Should correctly handle multiple whitelist changes", async function () {
    await whitelistContract.addAddress(addr1.address);
    await whitelistContract.addAddress(addr2.address);
    expect(await whitelistContract.isWhitelisted(addr1.address)).to.equal(true);
    expect(await whitelistContract.isWhitelisted(addr2.address)).to.equal(true);

    await whitelistContract.removeAddress(addr1.address);
    expect(await whitelistContract.isWhitelisted(addr1.address)).to.equal(false);
    expect(await whitelistContract.isWhitelisted(addr2.address)).to.equal(true);
  });

  it("Should return false for addresses that were never added to the whitelist", async function () {
    expect(await whitelistContract.isWhitelisted(addr1.address)).to.equal(false);
    expect(await whitelistContract.isWhitelisted(addr2.address)).to.equal(false);
  });
});
