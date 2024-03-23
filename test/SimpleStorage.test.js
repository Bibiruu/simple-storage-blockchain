const SimpleStorage = artifacts.require('SimpleStorage');

contract ('SimpleStorage', () => {
    it('sets the value of data', async () => {
        const simpleStorage = await SimpleStorage.deployed();
        await simpleStorage.set('this data');
        const result = await simpleStorage.get();
        assert(result === 'this data');
    });
})