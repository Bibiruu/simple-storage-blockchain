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
//0xccdf5E879841501EfE62d351DB951072834be550
//0x45408799B913127C86A73b8b6006331E171A0FD9
const simpleStorageAddress = '0xccdf5E879841501EfE62d351DB951072834be550';
const web3 = new Web3('HTTP://127.0.0.1:7545');
const simpleStorage = new web3.eth.Contract(simpleStorageABI, simpleStorageAddress);
console.log('SIMPLESTORAGE', simpleStorage, simpleStorageABI)

//bootstrap basics for snatching data
document.addEventListener('DOMContentLoaded', async () => {
  const $setData = document.getElementById('setData');
  const $data = document.getElementById('data');
  //truffle arrays of accounts
  let accounts = [];
  //populate accounts array
  try {
    accounts = await web3.eth.getAccounts();
    console.log('success', accounts)
  } catch (error) {
    console.log('Error fetching accounts', error);
  }

  const getData = async () => {
    try {
      //communicating with the smart contrct
      const result = await simpleStorage.methods.get().call();
      $data.innerHTML = result;
    } catch (error) {
      console.log('error getting data', error)
    }
  };
  getData();

  //console.log('DATA', getData())

  $setData.addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = await e.target.elements[0].value;
    console.log('data', data)
    try {
      // If accounts array is empty, fetch accounts
      if (accounts.length === 0) {
        accounts = await web3.eth.getAccounts();
      }
      await simpleStorage.methods.set(data).send({ from: accounts[0] });
      await getData();
    } catch (error) {
      console.log('error in fetching data', error)
    }
  });
});


