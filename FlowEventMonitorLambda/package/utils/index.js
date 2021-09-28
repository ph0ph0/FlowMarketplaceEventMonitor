// Converts an array into a two-dimensional array, where each nested array is a batch
module.exports.batch = (arr, size) => 
    Array.from({ length: Math.ceil(arr.length / size) }, (el, index) => 
        arr.slice(index * size, index * size + size))
    
    
