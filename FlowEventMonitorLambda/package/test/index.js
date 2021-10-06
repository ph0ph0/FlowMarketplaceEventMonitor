const fcl = require("@onflow/fcl");
const { config } = fcl;

const test = async () => {
  // configure fcl
  await config().put("accessNode.api", "https://access-testnet.onflow.org");

  try {
    const block = await fcl.send([fcl.getBlock(true)]);
    const decoded = await fcl.decode(block);
    console.log(decoded.height);
  } catch (error) {
    console.log(`Error fetching block height: ${error}`);
  }
};
test();
