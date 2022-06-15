import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0x949FBfC64AD6D9CD08e9cd15b20b2832A1977138");

(async () => {
  try {
    const amount = 100000000;
    await token.mintToSelf(amount);
    const totalSupply = await token.totalSupply();
    console.log(
      "✅ There now is",
      totalSupply.displayValue,
      "$NIJISANJI in circulation"
    );
  } catch (error) {
    console.error("Failed to print money", error);
  }
})();
