import sdk from "./1-initialize-sdk.js";

const editionDrop = sdk.getEditionDrop(
  "0x3cF84D00a7425662F291a1556268Ce7b813edCFB"
);
const token = sdk.getToken("0x949FBfC64AD6D9CD08e9cd15b20b2832A1977138");

(async () => {
  try {
    const walletAddress = await editionDrop.history.getAllClaimerAddresses(0);

    if (walletAddress.length === 0) {
      console.log(
        "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!"
      );
      process.exit(0);
    }

    const airdropTargets = walletAddress.map((address) => {
      const randomAmount = Math.floor(
        Math.random() * (10000 - 1000 + 1) + 1000
      );
      console.log("✅ Going to airdrop", randomAmount, "tokens to", address);

      const airdropTarget = {
        toAddress: address,
        amount: randomAmount,
      };
      return airdropTarget;
    });
    console.log("🌈 Starting airdrop...");
    await token.transferBatch(airdropTargets);
    console.log(
      "✅ Successfully airdropped tokens to all the holders of the NFT!"
    );
  } catch (err) {
    console.error("Failed to airdrop tokens", err);
  }
})();
