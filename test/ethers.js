const ethers = require("ethers");
const config = require("../config");

const abi =
  require("../artifacts/contracts/YuTouMintable.sol/YuTouMintable.json").abi;

const provider = new ethers.providers.JsonRpcProvider(config.network.url);

const Wallet = ethers.Wallet;
const signer = new ethers.Wallet(config.private_key, provider);

const contract = new ethers.Contract(config.contract_address, abi, signer);

const main = async () => {
  const balanceOf = await contract.balanceOf(config.deployer);
  // 格式化一下真实的token余额
  const realBalanceOf = ethers.utils.formatUnits(balanceOf, 8);
  console.log("realBalanceOf", realBalanceOf);

  const trans = await contract.mint(config.deployer, 1024 * 10 ** 8);
  console.log("trans", trans);
  const result = await trans.wait();
  console.log("result", result);
};

main();
