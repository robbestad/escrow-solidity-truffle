const Escrow =  artifacts.require("Escrow");

contract("Escrow", (accounts) => {
  let contractInstance;
  let arbiter = accounts[0];
  let buyer = accounts[1];
  let seller = accounts[2];
  before(async () => {
  });

  describe("setting up escrow", async () => {
    it("sets up contract", async () => {
      contractInstance = await Escrow.deployed();
      assert.notEqual(contractInstance.address, 0x0, "has contract address");

      await contractInstance.addSeller(seller);
      await contractInstance.addBuyer(buyer);

      assert.equal(
        await contractInstance.sellerAddress(),
        seller,
        "seller is correct"
      );
      assert.equal(
        await contractInstance.arbiterAddress(),
        arbiter,
        "arbiter is correct"
      );
    });


    it("depositor can deposit ether", async () => {
      const deposit = await contractInstance.depositEther({
        from: buyer,
        value: 1e18,
      });
      assert.equal(deposit.receipt.status, true, "Deposit successfull.");
    });

    it("balance of contract is equal to deposited amount", async () => {
      const balance = await contractInstance.contractBalance();
      assert.equal(
        balance.toString(),
        (1e18).toString(),
        "Failed getting contract value"
      );
    });
  
    it("arbiter can approve transaction", async () => {
    const receipt= await contractInstance.approve();
    assert.equal(receipt.receipt.status, true, "Failed approving transaction");
    });

    it("depositor cannot approve transaction", async () => {
      try {
        await contractInstance.approve({ from: buyer });
        assert.fail("should have thrown before");
      } catch (error) {
        assertJump(error);
      }
      function assertJump(error) {
        assert.isAbove(
          error.message.search("Only arbiter can call this method"),
          -1,
          "Approve should be not called by anyone but arbiter"
        );
      }
    });

    it("seller cannot approve transaction", async () => {
      try {
        await contractInstance.approve({ from: seller });
        assert.fail("should have thrown before");
      } catch (error) {
        assertJump(error);
      }
      function assertJump(error) {
        assert.isAbove(
          error.message.search("Only arbiter can call this method"),
          -1,
          "Approve should be not called by anyone but arbiter"
        );
      }
    });


});

  });
