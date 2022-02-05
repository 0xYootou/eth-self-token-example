const Web3 = require("web3");
const abi =
  require("../artifacts/contracts/YuTouMintable.sol/YuTouMintable.json").abi;

const config = require("./../config");

// 合约地址，这里我放了一个名叫 YuTou 的代币合约的地址，在 bsctestnet 网络中
const contractAddress = "0xeD0F31001f895D4Eb8F2b63A5EF46A27CB27AD7a";
// 创建web3对象
const web3 = new Web3();
// 连接到 ropsten 测试节点
web3.setProvider(
  new Web3.providers.HttpProvider(
    "https://data-seed-prebsc-1-s1.binance.org:8545"
  )
);

// 初始化合约对象
const contract = new web3.eth.Contract(abi, contractAddress, {
  from: config.deployer,
  gasPrice: "20000000000",
  gas: "1000000",
});

const main = async () => {
  // 查询余额
  const tokenBalance = await contract.methods.balanceOf(config.deployer).call();
  console.log("tokenBalance", tokenBalance);
};

main();
