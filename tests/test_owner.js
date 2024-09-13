import { expect } from "chai";
import { ethers } from "hardhat";

describe("Owner Contract", function () {
  let ownerContract;
  let owner;
  let newOwner;
  let addr1;

  beforeEach(async function () {
    const Owner = await ethers.getContractFactory("Owner");
    [owner, newOwner, addr1] = await ethers.getSigners();
    ownerContract = await Owner.deploy();
    await ownerContract.deployed();
  });

  it("Should set the correct owner on deployment", async function () {
    expect(await ownerContract.owner()).to.equal(owner.address);
  });

  it("Should allow the owner to update the state", async function () {
    await ownerContract.updateState();
    const lastUpdated = await ownerContract.lastUpdated();
    expect(lastUpdated).to.be.gt(0);
  });

  it("Should not allow non-owner to update the state", async function () {
    await expect(ownerContract.connect(addr1).updateState()).to.be.revertedWith(
      "Only the owner can call this function"
    );
  });

  it("Should allow the owner to update the owner address", async function () {
    await ownerContract.updateOwner(newOwner.address);
    expect(await ownerContract.owner()).to.equal(newOwner.address);
  });

  it("Should not allow non-owner to update the owner address", async function () {
    await expect(ownerContract.connect(addr1).updateOwner(addr1.address)).to.be.revertedWith(
      "Only the owner can call this function"
    );
  });

  it("Should allow new owner to perform actions after ownership transfer", async function () {
    await ownerContract.updateOwner(newOwner.address);
    await ownerContract.connect(newOwner).updateState();
    const lastUpdated = await ownerContract.lastUpdated();
    expect(lastUpdated).to.be.gt(0);
  });

  it("Should not allow the previous owner to perform actions after ownership transfer", async function () {
    await ownerContract.updateOwner(newOwner.address);
    await expect(ownerContract.updateState()).to.be.revertedWith("Only the owner can call this function");
  });
});
