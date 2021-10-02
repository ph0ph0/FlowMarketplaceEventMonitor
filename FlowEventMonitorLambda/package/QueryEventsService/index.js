const { events } = require("@onflow/fcl");
const {
  getBlockCursorForEvent,
  saveBlockCursorForEvent,
} = require("../BlockCursorTableService");
const { getCurrentBlockHeight, searchBlockRange } = require("../FlowService");

// TODO: Seriously needs proper error handling
// @params: [String]
module.exports.getEvents = async (eventsArray) => {
  // const contractAddress = "e223d8a629e49c68";
  // const contractName = "FUSD";
  // const eventName = "TokensWithdrawn";

  // const EVENTSARRAY = [
  //   `A.e223d8a629e49c68.FUSD.TokensWithdrawn`,
  //   `A.29e893174dd9b963.DappyContract.ListingAvailable`,
  // ];
  try {
    // Firstly get the blockheight using FCL
    const currentBlockHeight = await getCurrentBlockHeight();
    console.log(`!!!!tO cBH: ${typeof currentBlockHeight}`);
    console.log(`!!!CurrentBlockHeight: ${JSON.stringify(currentBlockHeight)}`);

    // We can use the eventName as an ID as it should be unique
    // Returns [{ eventName, events, finalCursor }]
    const cursors = await Promise.all(
      eventsArray.map(async (event) => {
        return await getBlockCursorForEvent(event, currentBlockHeight);
      })
    );
    console.log(`!!!cursors: ${JSON.stringify(cursors)}`);

    // Search the block range for events
    const eventObjectsArray = await Promise.all(
      cursors.map(async (cursor) => {
        return await searchBlockRange(currentBlockHeight, cursor);
      })
    );

    console.log(`eventsObjectsArray: ${JSON.stringify(eventObjectsArray)}`);

    // {"xxx": {events:[], fC: "ddd"},"yyy": {events:[], fC: "ddd"}}

    // Map over the eventObjectsArray and save the block cursors to dDB
    // We don't need to do anything with the returned array from map so don't need to assign it.
    await Promise.all(
      eventObjectsArray.map(
        async (eventObject) =>
          await saveBlockCursorForEvent(
            eventObject.eventName,
            eventObject.finalCursor
          )
      )
    );

    return eventObjectsArray;
  } catch (error) {
    throw new Error(`QueryEventsService getEvents(): ${error}`);
  }
};

// getEvents();

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
      uuid: "3",
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
      uuid: "",
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
      uuid: "3",
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
      uuid: "4",
      address: "0xt987oghui",
      dna: "6987tyughj8t7oyiuhl",
      name: "guyog",
    },
  },
  {
    data: {
      uuid: "5",
      address: "0xt987oghui",
      dna: "6987tyughj8t7oyiuhl",
      name: "guyog",
    },
  },
  {
    data: {
      uuid: "6",
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
