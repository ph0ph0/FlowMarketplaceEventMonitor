// Converts an array into a two-dimensional array, where each nested array is a batch
module.exports.batch = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (el, index) =>
    arr.slice(index * size, index * size + size)
  );

// Takes two object arrays and removes duplicates from within arrays, and across both arrays simultaneously, returning only unique elements across both arrays
module.exports.deduplicateArrays = (arr1, arr2) => {
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
};

module.exports.createdListingParser = (eventObject) => {
  console.log(
    `eventObject (created) to be parsed: ${JSON.stringify(eventObject)}`
  );
  const data = eventObject.data;
  const event = {
    storefrontAddress: data.storefrontAddress,
    listingResourceID: data.listingResourceID,
    dappyID: data.dappyID,
    name: data.name,
    dna: data.dna,
    ftVaultType: data.ftVaultType,
    price: data.price,
  };
  return event;
};

module.exports.completedListingParser = (eventObject) => {
  console.log(
    `eventObject (completed) to be parsed: ${JSON.stringify(eventObject)}`
  );
  const data = eventObject.data;
  const event = {
    listingResourceID: data.listingResourceID,
  };
  return event;
};
