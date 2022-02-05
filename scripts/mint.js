//初始化过程
const Web3 = require("web3");
const Contract = require("web3-eth-contract");
const config = require("./../config");
// 编译后的文件 自行定位文件修改路径
const TokenPETMintable = require("../artifacts/contracts/YuTouMintable.sol/YuTouMintable.json");
const abi = TokenPETMintable.abi;
// 发布后合约的地址
const address = config.contract_address;

// 合约发布的链网络
const web3 = new Web3(new Web3.providers.HttpProvider(config.network.url));
web3.eth.defaultAccount = config.deployer;

// 创建合同对象
const contract = new web3.eth.Contract(abi, address, {
  from: config.deployer, // default from address
  gasPrice: "20000000000",
  gas: "1000000",
});
// 实例化一个钱包，否则没法调用 send 方法，报地址不存在，这个是web3新的特性
web3.eth.accounts.wallet.add(config.private_key);
// web3.eth.getAccounts().then((accounts) => {
//   console.log(accounts);
//   console.log(web3.eth.accounts.wallet);
// });

// console.log("合约地址：", contract);
// 方法调用
contract.methods
  .totalSupply()
  .call()
  .then(function (totalSupply) {
    console.log("totalSupply result", totalSupply);
  });

// 查询发币之前的账户余额 钱包中所选的创世用户也可以
contract.methods
  .balanceOf(config.deployer)
  .call()
  .then(function (balanceOf) {
    console.log("Before balanceOf result", balanceOf);
  });

// contract.methods
//   .approve(config.deployer, 2024 * 10 ** 8)
//   .send({
//     from: config.deployer,
//   })
//   .then(function (result) {
//     console.log("approve result", result);
//   });

contract.methods
  .mint(config.deployer, 1024 * 10 ** 8)
  // from需要是所有者，因为发布的时候没有选择用户，默认是创世用户第一个，才可以向想合约申请给用户发币
  .send()
  .on("receipt", function (receipt) {
    // receipt example
    console.log(receipt);
  })
  .then(function (receipt) {
    // const result = mint.call().then(function(receipt) {

    console.log("call result", receipt);
    // // 查询发币之后的账户余额 钱包中所选的创世用户也可以
    // contract.methods
    //   .balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
    //   .call()
    //   .then(function (balanceOf) {
    //     console.log("After balanceOf result", balanceOf);
    //   });
  })
  .catch((error) => {
    console.error("error === ", error);
    // process.exit(1);
  });
// console.log("contract.defaultAccount", contract.defaultAccount);
// contract.methods
//   .addMinter("")
//   .send({})
//   .then(function (balanceOf) {
//     console.log("mint", balanceOf);
//   });
// // 调用mint方法向账户发行代币
