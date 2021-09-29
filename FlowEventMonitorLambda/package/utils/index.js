// Converts an array into a two-dimensional array, where each nested array is a batch
module.exports.batch = (arr, size) => 
    Array.from({ length: Math.ceil(arr.length / size) }, (el, index) => 
        arr.slice(index * size, index * size + size))
    
// Takes two object arrays and removes dublicates from both arrays, returning only unique elements within each array
module.exports.neutraliseObjectArrays = (arr1, arr2) => {
    console.log(`2`)
    for (var i = 0; i < arr1.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
            if (arr1[i].uuid === arr2[j].uuid) {
                arr1.splice(i, 1)
                arr2.splice(j, 1)
            }
        }
    }
  return [arr1, arr2] 
}
