import { expect } from "chai";
import { ethers } from "hardhat";

describe("SimpleWallet Contract", function () {
  let walletContract;
  let owner;
  let addr1;

  beforeEach(async function () {
    const Wallet = await ethers.getContractFactory("Wallet");
    [owner, addr1] = await ethers.getSigners();
    walletContract = await SimpleWallet.deploy();
    await walletContract.deployed();
  });

  it("Should allow deposits and update balance accordingly", async function () {
    await walletContract.deposit({ value: ethers.utils.parseEther("1") });
    const balance = await walletContract.getBalance();
    expect(balance).to.equal(ethers.utils.parseEther("1"));
  });

  it("Should allow the owner to withdraw funds", async function () {
    await walletContract.deposit({ value: ethers.utils.parseEther("2") });
    await walletContract.withdraw(addr1.address, ethers.utils.parseEther("1"));
    const contractBalance = await walletContract.getBalance();
    expect(contractBalance).to.equal(ethers.utils.parseEther("1"));
    const addr1Balance = await ethers.provider.getBalance(addr1.address);
    expect(addr1Balance).to.equal(ethers.utils.parseEther("10001")); // Initial balance + 1 ether
  });

  it("Should not allow non-owner to withdraw funds", async function () {
    await walletContract.deposit({ value: ethers.utils.parseEther("1") });
    await expect(
      walletContract.connect(addr1).withdraw(addr1.address, ethers.utils.parseEther("1"))
    ).to.be.revertedWith("Only the owner can call this function");
  });

  it("Should not allow withdrawal if the balance is insufficient", async function () {
    await walletContract.deposit({ value: ethers.utils.parseEther("1") });
    await expect(
      walletContract.withdraw(addr1.address, ethers.utils.parseEther("2"))
    ).to.be.revertedWith("Insufficient balance");
  });

  it("Should return the correct balance after multiple deposits", async function () {
    await walletContract.deposit({ value: ethers.utils.parseEther("1") });
    await walletContract.deposit({ value: ethers.utils.parseEther("1") });
    const balance = await walletContract.getBalance();
    expect(balance).to.equal(ethers.utils.parseEther("2"));
  });
});
