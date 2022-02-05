const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const TokenPET = await hre.ethers.getContractFactory("YuTouMintable");
  const pet = await TokenPET.deploy();

  await pet.deployed();

  console.log("TokenPET symbol is:", await pet.symbol());
  console.log("TokenPET deployed to:", pet.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
