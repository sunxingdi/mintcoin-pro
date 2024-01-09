import { ethers } from "hardhat";

async function myDeployContract(contractName, constructPara, deploySigner) {
  
  console.log("\n##############################################################");

  const ERC20FixedSupply = await ethers.deployContract(contractName, constructPara, deploySigner);
  await ERC20FixedSupply.waitForDeployment();
  console.log(contractName + "合约地址:", ERC20FixedSupply.target);
  console.log(contractName + "合约方法:");

  const functionNames = extractFunctionNames(ERC20FixedSupply.interface.fragments);
  console.log(functionNames);

}

//输出合约方法名列表
async function extractFunctionNames(contractFragments: ContractFragment[]): string[] {

  return contractFragments
    .filter(fragment => fragment.type === 'function' && fragment.name)
    .map(fragment => fragment.name as string);
  
}

async function main() {

  const [deploySigner] = await ethers.getSigners();

  //发行ERC20代币 ##################################################################

  //发行固定总量代币，标准ERC20方法。
  await myDeployContract("ERC20FixedSupply", [deploySigner.address], deploySigner);

  //发行可销毁代币，新增'burn','burnFrom'方法。
  await myDeployContract("ERC20WithBurnable", [deploySigner.address], deploySigner);

  //发行可增发代币，最新openzeppelin 5.0版本无此方法，暂时忽略。

  //发行有封顶代币，新增cap方法
  await myDeployContract("ERC20WithCapped", [deploySigner.address], deploySigner);

  //发行可暂停代币，新增pause，unpause，paused方法
  await myDeployContract("ERC20WithPausable", [deploySigner.address], deploySigner);

  //锁仓合约 ######################################################################
  //发行代币同时锁仓，最新openzeppelin 5.0版本无此方法，暂时忽略。
  //发行代币之后锁仓，最新openzeppelin 5.0版本无此方法，暂时忽略。

  //发行众筹代币 ##################################################################
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
