const {
  getBlockCursorForEvent,
  saveBlockCursorForEvent,
} = require("../BlockCursorTableService");
const { getCurrentBlockHeight, searchBlockRange } = require("../FlowService");

/**
 * When passed an array of events, will search the Flow blockchain for them.
 * @param {[string]} eventsArray
//  * TODO: What does it return exactly?
 * @returns {[object]}
 */
module.exports.getEvents = async (eventsArray) => {
  try {
    // Firstly get the blockheight using FCL
    const currentBlockHeight = await getCurrentBlockHeight();
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
    // Returns an array of nested arrays, containing raw event objects grouped by block
    // [[object], ...n[object]]
    const eventObjectsArray = await Promise.all(
      cursors.map(async (cursor) => {
        return await searchBlockRange(currentBlockHeight, cursor);
      })
    );
    console.log(`eventsObjectsArray: ${JSON.stringify(eventObjectsArray)}`);

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
