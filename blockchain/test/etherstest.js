const SimpleStorage = artifacts.require('./SimpleStorage')

contract("SimpleStorage", accounts => {
    let owner = accounts[0]
    let contract

    before(async () => {
        contract = await SimpleStorage.deployed()
    })

    it("The value should be 42", async () => {

        // Set value of 42
        await contract.set(42, { from: owner })

        // Get stored value
        let storedData = await contract.get()

        assert.equal(storedData, 42, "The value 42 was not stored.")
    })
})