const SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", () => {
  it("should set the value of a data variable", async () => {
    const simpleStorage = await SimpleStorage.deployed()
    await simpleStorage.set('this setup');
    const result = await simpleStorage.get();
    assert(result === 'this setup');
  });
});
