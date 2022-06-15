import sdk from "./1-initialize-sdk.js";
import { ethers, VoidSigner } from "ethers";

const vote = sdk.getVote("0x32dECdc91EE34306D820808EcA67b6BE79603703");
const token = sdk.getToken("0x949FBfC64AD6D9CD08e9cd15b20b2832A1977138");

(async () => {
  try {
    const amount = 420_000;
    const description =
      "Should the DAO mint an additional " +
      amount +
      " tokens into the treasury?";
    const executions = [
      {
        toAddress: token.getAddress(),
        nativeTokenValue: 0,
        transactionData: token.encoder.encode("mintTo", [
          vote.getAddress(),
          ethers.utils.parseUnits(amount.toString(), 18),
        ]),
      },
    ];
    await vote.propose(description, executions);
    console.log("✅ Successfully created proposal to mint tokens");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }
  try {
    const amount = 6_900;
    const description =
      "Should the DAO transfer " +
      amount +
      " tokens from the treasury to " +
      process.env.WALLET_ADDRESS +
      " for being awesome?";
    const executions = [
      {
        toAddress: token.getAddress(),
        nativeTokenValue: 0,
        transactionData: token.encoder.encode("transfer", [
          process.env.WALLET_ADDRESS,
          ethers.utils.parseUnits(amount.toString(), 18),
        ]),
      },
    ];
    await vote.propose(description, executions);
    console.log(
      "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
    );
  } catch (error) {
    console.error("failed to create second proposal", error);
  }
})();
