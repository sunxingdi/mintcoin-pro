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

  //发行可链下签名的代币，新增DOMAIN_SEPARATOR，eip712Domain，nonces，permit方法
  await myDeployContract("ERC20WithPermit", [deploySigner.address], deploySigner);

  //发行可投票代币，新增很多方法
  await myDeployContract("ERC20WithVotes", [deploySigner.address], deploySigner);

  //发行可闪电贷代币，新增很多方法
  await myDeployContract("ERC20WithFlashMint", [deploySigner.address], deploySigner);


  //锁仓合约 ######################################################################
  //发行代币同时锁仓，最新openzeppelin 5.0版本无此方法，暂时忽略。
  //发行代币之后锁仓，最新openzeppelin 5.0版本无此方法，暂时忽略。

  //发行众筹代币 ##################################################################
  //发行通用的众筹，最新openzeppelin 5.0版本无此方法，暂时忽略。
  //发行可增发的众筹，最新openzeppelin 5.0版本无此方法，暂时忽略。
  //发行有封顶的众筹，最新openzeppelin 5.0版本无此方法，暂时忽略。
  //发行有配额的众筹，最新openzeppelin 5.0版本无此方法，暂时忽略。
  //发行可暂停的众筹，最新openzeppelin 5.0版本无此方法，暂时忽略。
  //发行有时限的众筹，最新openzeppelin 5.0版本无此方法，暂时忽略。
  //发行白名单众筹，最新openzeppelin 5.0版本无此方法，暂时忽略。
  //发行可终结的众筹，最新openzeppelin 5.0版本无此方法，暂时忽略。
  //发行到期后交付的众筹，最新openzeppelin 5.0版本无此方法，暂时忽略。
  //发行不成功退款的众筹，最新openzeppelin 5.0版本无此方法，暂时忽略。

  //多功能代币 ###################################################################
  //发行股份制受益人合约，最新openzeppelin 5.0版本无此方法，暂时忽略。

  //发行ERC777代币 ###############################################################
  //发行ERC777代币，最新openzeppelin 5.0版本无此方法，暂时忽略。

  //发行ERC721代币 ###############################################################
  //全功能ERC721代币，最新openzeppelin 5.0版本无此方法，暂时忽略。

  //可铸造ERC721代币
  await myDeployContract("ERC721WithMintable", [deploySigner.address], deploySigner);

  //可销毁的ERC721代币，新增burn方法。
  await myDeployContract("ERC721WithBurnable", [deploySigner.address], deploySigner);

  //可暂停的ERC721代币，新增pause，unpause，paused方法
  await myDeployContract("ERC721WithPausable", [deploySigner.address], deploySigner);
  
  //支持代币枚举, ERC721Enumerable.sol
  await myDeployContract("ERC721WithEnumerable", [deploySigner.address], deploySigner);

  //支持代币存储Url, ERC721URIStorage.sol
  await myDeployContract("ERC721WithURIStorage", [deploySigner.address], deploySigner);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
