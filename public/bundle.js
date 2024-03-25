const simpleStorageABI = [
    [
        {
          "inputs": [],
          "name": "data",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_data",
              "type": "string"
            }
          ],
          "name": "set",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "get",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ],
];

const simpleStorageAddress = '0xccdf5E879841501EfE62d351DB951072834be550';
const web3 = new Web3(window.ethereum);
const simpleStorage = new web3.eth.Contract(simpleStorageABI, simpleStorageAddress);

//bootstrap basics for snatching data
document.addEventListener('DOMContentLoaded', async () => {
    const $setData = document.getElementById('setData');
    const $data = document.getElementById('data');
    //truffle arrays of accounts
    let accounts = [];
    //populate accounts array
    try {
        accounts = web3.eth.getAccounts();
        console.log('success', accounts)
    } catch (error) {
        console.log('Error fetching accounts', error);
    }

    const getData = async () => {
        try {
            //communicating with the smart contrct
            const result = await simpleStorage.methods.get().call()
            $data.innerHTML = result;
        } catch (error) {
            console.log('error getting data', error)
        }
    };
    getData();


    $setData.addEventListener('submit', async (e) => {
        e.preventDefault()
        const data = e.target.elements[0].value;
        try {
            //ensure accunt populated
            if (accounts.length === 0) {
                // If accounts array is empty, fetch accounts
                accounts = await web3.eth.getAccounts();
            };
            await simpleStorage.methods.set(data).send({ from: accounts[0] })
            getData();
        } catch (error) {
            console.log('error in fetching data', error)
        }
    });
});
