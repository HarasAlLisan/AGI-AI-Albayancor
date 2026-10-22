const hre = require("hardhat");

async function main() {
  const Albayancor = await hre.ethers.getContractFactory("Albayancor");
  const contract = await Albayancor.deploy("ميثاق البيان السيادي");
  await contract.deployed();
  console.log("Albayancor deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});0
