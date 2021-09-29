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
    const contractAddress = "e223d8a629e49c68"
    const contractName = "FUSD"
    const eventName = "TokensWithdrawn"

    // TODO: Uncomment
    // if (fromBlock <= toBlock) {
      if (1<5) {
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
      } catch(error) {}
    }
}

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
    const contractAddress = "e223d8a629e49c68"
    const contractName = "FUSD"
    const eventName = "TokensWithdrawn"

    // TODO: Uncomment
    // if (fromBlock <= toBlock) {
      if (1<5) {
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
      } catch(error) {}
    }
}

module.exports.ListingsAvailableData = [{
	"blockId": "84585fac131bf072b4ad301c0f841b4aff4a01b5cc6854ec69ece2f3fcf48530",
	"blockHeight": 46470877,
	"blockTimestamp": "2021-09-28T14:47:27.614Z",
	"type": "A.e223d8a629e49c68.FUSD.TokensWithdrawn",
	"transactionId": "c7c2a423e6bab4315b3f4abad2221543bf487062da914553516566bab800178c",
	"transactionIndex": 0,
	"eventIndex": 0,
	"data": {
		"uuid": "1",
		"address": "0xt987oghui",
    "dna": "6987tyughj8t7oyiuhl",
    "name": "guyog"
	}
}, {
	"blockId": "15ef5fb0681f5ab989121acd53965b464328217ac3a15bce8f15be35e042d9ee",
	"blockHeight": 46470902,
	"blockTimestamp": "2021-09-28T14:47:49.209Z",
	"type": "A.e223d8a629e49c68.FUSD.TokensWithdrawn",
	"transactionId": "f56703549733d041c2d2c2017e1e5898501a0e202dea74f2cf50c64e3e780016",
	"transactionIndex": 0,
	"eventIndex": 0,
	"data": {
		"uuid": "2",
		"address": "0xt98o7gyuilh",
    "dna": "6987tyughj8t7oyiuhl",
    "name": "adhsiu"
	}
}, {
	"blockId": "316ee01512c6a452ffe7be832dd698b38861af0c62a5c8007d5e8e84d3fa7370",
	"blockHeight": 46470932,
	"blockTimestamp": "2021-09-28T14:48:14.162Z",
	"type": "A.e223d8a629e49c68.FUSD.TokensWithdrawn",
	"transactionId": "fcb2ddcf15ffb6ce47f2d48d3b66d8b2facc4fb2aab091388ddef619cc4f058d",
	"transactionIndex": 0,
	"eventIndex": 0,
	"data": {
		"uuid": "3",
		"address": "0xt68o7yguihljnk",
    "dna": "6987tyughj8t7oyiuhl",
    "name": "asdliasbdfk"
	}
}]

module.exports.ListingsCompletedData = [{
	"blockId": "84585fac131bf072b4ad301c0f841b4aff4a01b5cc6854ec69ece2f3fcf48530",
	"blockHeight": 46470877,
	"blockTimestamp": "2021-09-28T14:47:27.614Z",
	"type": "A.e223d8a629e49c68.FUSD.TokensWithdrawn",
	"transactionId": "c7c2a423e6bab4315b3f4abad2221543bf487062da914553516566bab800178c",
	"transactionIndex": 0,
	"eventIndex": 0,
	"data": {
		"uuid": "1",
		"address": "0xt987oghui",
    "dna": "6987tyughj8t7oyiuhl",
    "name": "guyog"
	}
}, {
	"blockId": "15ef5fb0681f5ab989121acd53965b464328217ac3a15bce8f15be35e042d9ee",
	"blockHeight": 46470902,
	"blockTimestamp": "2021-09-28T14:47:49.209Z",
	"type": "A.e223d8a629e49c68.FUSD.TokensWithdrawn",
	"transactionId": "f56703549733d041c2d2c2017e1e5898501a0e202dea74f2cf50c64e3e780016",
	"transactionIndex": 0,
	"eventIndex": 0,
	"data": {
		"uuid": "2",
		"address": "0xt98o7gyuilh",
    "dna": "6987tyughj8t7oyiuhl",
    "name": "adhsiu"
	}
}, {
	"blockId": "316ee01512c6a452ffe7be832dd698b38861af0c62a5c8007d5e8e84d3fa7370",
	"blockHeight": 46470932,
	"blockTimestamp": "2021-09-28T14:48:14.162Z",
	"type": "A.e223d8a629e49c68.FUSD.TokensWithdrawn",
	"transactionId": "fcb2ddcf15ffb6ce47f2d48d3b66d8b2facc4fb2aab091388ddef619cc4f058d",
	"transactionIndex": 0,
	"eventIndex": 0,
	"data": {
		"uuid": "3",
		"address": "0xt68o7yguihljnk",
    "dna": "6987tyughj8t7oyiuhl",
    "name": "asdliasbdfk"
	}
}]