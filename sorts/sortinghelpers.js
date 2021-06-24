class SortingHelpers {
  static mergeArrays(array1, array2) {
    const sortedArray = [];
    while (array1.length > 0 && array2.length > 0) {
      if (array1[0] < array2[0]) sortedArray.push(array1.shift());
      else sortedArray.push(array2.shift());
    }
  }
}

module.exports = {
  SortingHelpers,
};
