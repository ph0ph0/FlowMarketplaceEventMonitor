module.exports.getListingAvailableEvents = async () => {
  // Get the most recent sealed block
  // TODO: Uncomment
  // const block = await fcl.send([fcl.getBlock(true)]);
  // decoded = await fcl.decode(block);

  // Get the current block height
  // TODO: Uncomment
  // startingBlockHeight = decoded.height
  // console.log(`height: ${startingBlockHeight}`)

  // Get the block cursor
  // If no block cursor, set it to the current block height - 249; that's the largest spread you can do.
  // Query dDB to get bH.
  // TODO: Update fromBlock with cursor

  // TODO: Uncomment
  // const fromBlock = startingBlockHeight - 249
  // const toBlock = startingBlockHeight

  // Event details
  const contractAddress = "e223d8a629e49c68";
  const contractName = "FUSD";
  const eventName = "TokensWithdrawn";

  // TODO: Uncomment
  // if (fromBlock <= toBlock) {
  if (1 < 5) {
    try {
      // Query for events
      // TODO:Uncomment
      // const result = await fcl.send([
      //   fcl.getEventsAtBlockHeightRange(`A.${contractAddress}.${contractName}.${eventName}`, fromBlock, toBlock)
      // ]);
      // const decoded = await fcl.decode(result)
      // console.log(`Events: ${JSON.stringify(decoded)}`)
      // TODO: Update block cursor
      // If we have some events, return them
    } catch (error) {}
  }
};

module.exports.getListingCompletedEvents = async () => {
  // Get the most recent sealed block
  // TODO: Uncomment
  // const block = await fcl.send([fcl.getBlock(true)]);
  // decoded = await fcl.decode(block);

  // Get the current block height
  // TODO: Uncomment
  // startingBlockHeight = decoded.height
  // console.log(`height: ${startingBlockHeight}`)

  // Get the block cursor
  // If no block cursor, set it to the current block height - 249; that's the largest spread you can do.
  // Query dDB to get bH.
  // TODO: Update fromBlock with cursor

  // TODO: Uncomment
  // const fromBlock = startingBlockHeight - 249
  // const toBlock = startingBlockHeight

  // Event details
  const contractAddress = "e223d8a629e49c68";
  const contractName = "FUSD";
  const eventName = "TokensWithdrawn";

  // TODO: Uncomment
  // if (fromBlock <= toBlock) {
  if (1 < 5) {
    try {
      // Query for events
      // TODO:Uncomment
      // const result = await fcl.send([
      //   fcl.getEventsAtBlockHeightRange(`A.${contractAddress}.${contractName}.${eventName}`, fromBlock, toBlock)
      // ]);
      // const decoded = await fcl.decode(result)
      // console.log(`Events: ${JSON.stringify(decoded)}`)
      // TODO: Update block cursor
      // If we have some events, return them
    } catch (error) {}
  }
};

module.exports.ListingsAvailableData = [
  {
    data: {
      uuid: "1",
      address: "0xt987oghui",
      dna: "6987tyughj8t7oyiuhl",
      name: "guyog",
    },
  },
  {
    data: {
      uuid: "2",
      address: "0xt987oghui",
      dna: "6987tyughj8t7oyiuhl",
      name: "guyog",
    },
  },
  {
    data: {
      uuid: "1",
      address: "0xt987oghui",
      dna: "6987tyughj8t7oyiuhl",
      name: "guyog",
    },
  },
  {
    data: {
      uuid: "2",
      address: "0xt987oghui",
      dna: "6987tyughj8t7oyiuhl",
      name: "guyog",
    },
  },
];

module.exports.ListingsCompletedData = [
  {
    data: {
      uuid: "1",
      address: "0xt987oghui",
      dna: "6987tyughj8t7oyiuhl",
      name: "guyog",
    },
  },
  {
    data: {
      uuid: "2",
      address: "0xt987oghui",
      dna: "6987tyughj8t7oyiuhl",
      name: "guyog",
    },
  },
  {
    data: {
      uuid: "1",
      address: "0xt987oghui",
      dna: "6987tyughj8t7oyiuhl",
      name: "guyog",
    },
  },
  {
    data: {
      uuid: "2",
      address: "0xt987oghui",
      dna: "6987tyughj8t7oyiuhl",
      name: "guyog",
    },
  },
];

// module.exports.ListingsAvailableData = [
//   {
//     data: {
//       uuid: "1",
//       address: "0xt987oghui",
//       dna: "6987tyughj8t7oyiuhl",
//       name: "guyog",
//     },
//   },
//   {
//     data: {
//       uuid: "2",
//       address: "0xt987oghui",
//       dna: "6987tyughj8t7oyiuhl",
//       name: "guyog",
//     },
//   },
//   {
//     data: {
//       uuid: "3",
//       address: "0xt987oghui",
//       dna: "6987tyughj8t7oyiuhl",
//       name: "guyog",
//     },
//   },
//   {
//     data: {
//       uuid: "4",
//       address: "0xt987oghui",
//       dna: "6987tyughj8t7oyiuhl",
//       name: "guyog",
//     },
//   },
//   {
//     data: {
//       uuid: "5",
//       address: "0xt987oghui",
//       dna: "6987tyughj8t7oyiuhl",
//       name: "guyog",
//     },
//   },
//   {
//     data: {
//       uuid: "6",
//       address: "0xt987oghui",
//       dna: "6987tyughj8t7oyiuhl",
//       name: "guyog",
//     },
//   },
//   {
//     data: {
//       uuid: "7",
//       address: "0xt987oghui",
//       dna: "6987tyughj8t7oyiuhl",
//       name: "guyog",
//     },
//   },
//   {
//     data: {
//       uuid: "8",
//       address: "0xt987oghui",
//       dna: "6987tyughj8t7oyiuhl",
//       name: "guyog",
//     },
//   },
// ];

// module.exports.ListingsCompletedData = [
//   {
//     data: {
//       uuid: "1",
//       address: "0xt987oghui",
//       dna: "6987tyughj8t7oyiuhl",
//       name: "guyog",
//     },
//   },
//   {
//     data: {
//       uuid: "2",
//       address: "0xt987oghui",
//       dna: "6987tyughj8t7oyiuhl",
//       name: "guyog",
//     },
//   },
//   {
//     data: {
//       uuid: "3",
//       address: "0xt987oghui",
//       dna: "6987tyughj8t7oyiuhl",
//       name: "guyog",
//     },
//   },
//   {
//     data: {
//       uuid: "4",
//       address: "0xt987oghui",
//       dna: "6987tyughj8t7oyiuhl",
//       name: "guyog",
//     },
//   },
//   {
//     data: {
//       uuid: "5",
//       address: "0xt987oghui",
//       dna: "6987tyughj8t7oyiuhl",
//       name: "guyog",
//     },
//   },
//   {
//     data: {
//       uuid: "6",
//       address: "0xt987oghui",
//       dna: "6987tyughj8t7oyiuhl",
//       name: "guyog",
//     },
//   },
//   {
//     data: {
//       uuid: "7",
//       address: "0xt987oghui",
//       dna: "6987tyughj8t7oyiuhl",
//       name: "guyog",
//     },
//   },
//   {
//     data: {
//       uuid: "8",
//       address: "0xt987oghui",
//       dna: "6987tyughj8t7oyiuhl",
//       name: "guyog",
//     },
//   },
// ];
