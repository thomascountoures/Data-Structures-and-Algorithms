class SortingAlgorithms {
  /**
   * Sorts an array in ascending order.
   * Takes an unsorted array, turns it
   * into a max heap, and then runs a
   * heapsort on it.
   * @param {*} array
   */
  static HeapSort(array) {
    let parentNodeIndex = Math.floor(array.length / 2 - 1);
    let nPointer = array.length - 1;

    // Turns array into max heap.
    function heapify(array, parentNodeIndex, lengthPointer) {
      let leftChildIndex = parentNodeIndex * 2 + 1;
      let rightChildIndex = leftChildIndex + 1;
      let largestNodeIndex = parentNodeIndex;

      // If the left child falls within the bounds of the current length pointer, and the parent
      // node's value is smaller than the left child's value, update the largestNodeIndex to the
      // index of the current left child.
      if (leftChildIndex < lengthPointer && array[largestNodeIndex] < array[leftChildIndex]) {
        largestNodeIndex = leftChildIndex;
      }

      // If the right child falls within the bounds of the current length pointer, and the left
      // child's value is smaller than the right child's value, update the largestNode index to
      // the index of the current right child.
      if (rightChildIndex < lengthPointer && array[largestNodeIndex] < array[rightChildIndex]) {
        largestNodeIndex = rightChildIndex;
      }

      // If the largest node index is no longer the parent index (ie. we found a left or right child larger
      // than the current parent node's value, swap those values around, and then run heapify again). Remember,
      // when we run heapify again, we are updating the current parent node to the index of the largest child's
      // value was BEFORE the swap.
      if (largestNodeIndex !== parentNodeIndex) {
        [array[parentNodeIndex], array[largestNodeIndex]] = [array[largestNodeIndex], array[parentNodeIndex]];
        heapify(array, largestNodeIndex, lengthPointer);
      }
    }

    // Step 1: Turn array into Max Heap
    // This will start at the last parent in the
    // heap, and then move up (from right to left, going up each level),
    // swapping the parent and child node if their current
    // order does not satisfy a max heap.
    while (parentNodeIndex >= 0) {
      heapify(array, parentNodeIndex, array.length);
      parentNodeIndex--;
    }
    console.log('heapify complete ------------------------');
    // Step 2: Do the actual Heap Sort
    while (nPointer > 0) {
      [array[0], array[nPointer]] = [array[nPointer], array[0]];
      heapify(array, 0, nPointer);

      // We move the pointer down AFTER the swap
      // and heapify occurs. Remember, for example
      // when this runs for the first time, if the
      // array length is say, 8, nPointer is 7. Inside
      // the heapify method we check to make sure that
      // the children we are comparing are LESS than the
      // length pointer (nPointer). So once we swap the
      // top of the heap to the back of the array, we
      // will already be excluding that number from the
      // heapifying process (it will be left alone).
      // Then, after we heapify, we move the nPointer
      // one to the left, so that we swap the number at
      // the index the nPointer is pointing to, but once
      // it's swapped, we continue to exclude it from
      // the heapifying process.

      // Example visualization of heap sort:
      //                          n
      // Start:   [7, 6, 3, 4, 2, 1]
      //                          n
      //          [1, 6, 3, 4, 2, 7]
      // After heapify: (check if children are less than nPointer, so exclude 7)
      //                          n
      //          [6, 4, 3, 1, 2, 7]
      // Move nPointer down after heapify is complete
      //                       n
      //          [6, 4, 3, 1, 2, 7]
      // Swap again
      //                       n
      //          [2, 4, 3, 1, 6, 7]
      // Heapify
      //                       n
      //          [4, 2, 3, 1, 6, 7]
      // Move nPointer down
      //                    n
      //          [4, 2, 3, 1, 6, 7]
      //
      // Swap
      //                    n
      //          [1, 2, 3, 4, 6, 7]
      // Heapify
      //                    n
      //          [3, 2, 1, 4, 6, 7]
      // Move nPointer down
      //                 n
      //          [3, 2, 1, 4, 6, 7]
      // Swap
      //                 n
      //          [1, 2, 3, 4, 6, 7]
      // Heapify
      //                 n
      //          [2, 1, 3, 4, 6, 7]
      // Move nPointer down
      //              n
      //          [2, 1, 3, 4, 6, 7]
      // Swap
      //              n
      //          [1, 2, 3, 4, 6, 7]
      // Heapify
      //              n
      //          [1, 2, 3, 4, 6, 7]
      // Move nPointer down
      //           n
      //          [1, 2, 3, 4, 6, 7]
      //
      // Stop loop, n is no longer greater than 0
      // Done, array is sorted
      nPointer--;
    }
    console.log('after sort', array);
    return array;
  }
}

const arrayToSort = [6, 5, 3, 1, 8, 7, 2, 4];

console.log(SortingAlgorithms.HeapSort(arrayToSort));
