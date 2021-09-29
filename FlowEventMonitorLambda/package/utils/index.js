// Converts an array into a two-dimensional array, where each nested array is a batch
module.exports.batch = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (el, index) =>
    arr.slice(index * size, index * size + size)
  );

// Takes two object arrays and removes duplicates from within arrays, and across both arrays simultaneously, returning only unique elements across both arrays
module.exports.deduplicateArrays = (arr1, arr2) => {
  // Remove duplicates within arrays
  const arr1Ids = arr1.map((e) => e.data.uuid);
  const arr1Filtered = arr1.filter(
    ({ id }, index) => !arr1Ids.includes(id, index + 1)
  );
  const arr2Ids = arr2.map((e) => e.data.uuid);
  const arr2Filtered = arr2.filter(
    ({ id }, index) => !arr2Ids.includes(id, index + 1)
  );

  // Remove duplicates across arrays
  arr1Filtered.forEach((element1) => {
    arr2Filtered.forEach((element2) => {
      if (element1.data.uuid == element2.data.uuid) {
        // Get index of element 1 in arr1, same for element2 and array2
        const e1Index = arr1.indexOf(element1);
        const e2Index = arr2.indexOf(element2);
        delete arr1[e1Index];
        delete arr2[e2Index];
      }
    });
  });
  return [
    arr1.filter((e) => e !== undefined),
    arr2.filter((e) => e !== undefined),
  ];
};
