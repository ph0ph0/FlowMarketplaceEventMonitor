/**
 * Converts an array into a two-dimensional array, where each nested array is a batch.
 * Used to batch write to dDB.
 * @param {[object]} arr
 * @param {int} size
 * @returns {[[object], n[object]]}
 */
module.exports.batch = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (el, index) =>
    arr.slice(index * size, index * size + size)
  );

/**
 * Takes two object arrays and removes duplicates from within arrays,
 * and across both arrays simultaneously, returning only unique elements
 * across both arrays. This was created because if a create event and a
 * corresponding delete event are picked up in the same call of this Lambda,
 * then we may as well take them both out rather than writing then deleteing
 * to dDB. Equally, event emission is not currently enforced through interfaces
 * in Flow. This means that it is the devs responsibility to emit events when using
 * an interface. If an event is emitted twice in a single function call, then it will
 * appear twice when this Lambda performs its search. This function also removes
 * those duplicates, leaving only one instance of the event.
 * @param {[object]} arr1
 * @param {[object]} arr2
 * @returns {[[object], [object]]}
 */
module.exports.deduplicateArrays = (arr1, arr2) => {
  try {
    // Remove duplicates within arrays
    const arr1Ids = arr1.map((e) => e.listingResourceID);
    const arr1Filtered = arr1.filter(
      (e, index) => !arr1Ids.includes(e.listingResourceID, index + 1)
    );
    const arr2Ids = arr2.map((e) => e.listingResourceID);
    const arr2Filtered = arr2.filter(
      (e, index) => !arr2Ids.includes(e.listingResourceID, index + 1)
    );

    // Remove duplicates across arrays
    arr1Filtered.forEach((element1, i) => {
      arr2Filtered.forEach((element2, j) => {
        if (element1.listingResourceID == element2.listingResourceID) {
          // Get index of element 1 in arr1, same for element2 and array2
          delete arr1Filtered[i];
          delete arr2Filtered[j];
        }
      });
    });
    return [
      arr1Filtered.filter((e) => e !== undefined),
      arr2Filtered.filter((e) => e !== undefined),
    ];
  } catch (error) {
    throw new Error(`Utils deduplicateArrays(): ${error}`);
  }
};

/**
 * Takes a raw eventObject from the Flow blockchain and
 * parses it into an object that can be saved to dDB
 * @param {object} eventObject
 * @returns {object}
 */
module.exports.createdListingParser = (eventObject) => {
  try {
    console.log(
      `eventObject (created) to be parsed: ${JSON.stringify(eventObject)}`
    );
    const data = eventObject.data;
    const timestamp = new Date().toISOString();
    const staticKey = 1; //Using 1 for all entries allows us to use this as the primary key in dDB for GSIs so we can search by sort key
    const event = {
      storefrontAddress: data.storefrontAddress,
      listingResourceID: data.listingResourceID,
      dappyID: data.dappyID,
      name: data.name,
      dna: data.dna,
      ftVaultType: data.ftVaultType,
      price: data.price,
      timestamp,
      staticKey,
    };
    return event;
  } catch (error) {
    throw new Error(`Utils createdListingParser(): ${error}`);
  }
};

/**
 * Takes a raw eventObject from the Flow blockchain and
 * parses it into an object that can be deleted from dDB
 * @param {object} eventObject
 * @returns {object}
 */
module.exports.completedListingParser = (eventObject) => {
  try {
    console.log(
      `eventObject (completed) to be parsed: ${JSON.stringify(eventObject)}`
    );
    const data = eventObject.data;
    const event = {
      listingResourceID: data.listingResourceID,
    };
    return event;
  } catch (error) {
    throw new Error(`Utils completedListingParser(): ${error}`);
  }
};
