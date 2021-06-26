const SortingHelpers = require('./sortinghelpers').SortingHelpers;

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

    return array;
  }

  /**
   * Quicksort
   * Time complexity: O(nlog(n))
   * Space complexity: O(log(n))
   *
   *
   * @param {*} array
   */
  static QuickSort(array) {
    // Immediately call the quick sort helper.
    // That's where we will do the bulk of the work.
    quickSortHelper(array, 0, array.length - 1);

    // The quick sort helper itself. This is what
    // will be called recursively to sort the array.
    function quickSortHelper(array, startIdx, endIdx) {
      if (startIdx >= endIdx) return;
      console.log('array', array, 'startIdx', startIdx, 'endIdx', endIdx);

      // The pivot index to which we will compare values to while we
      // iterate through the array. In this iteration, we always start
      // the pivot index at index 0.
      let pivotIndex = startIdx;

      // We create with a left pointer and a right pointer. The left
      // pointer always starts immediately to the right of the pivot index, 
      // and the right pointer always starts at the end of the array.
      let lpIndex = startIdx + 1;
      let rpIndex = endIdx;

      // While the right pointer is greater than the left pointer, continue
      // the iteration. Once the left and right pointers pass each other,
      // the iteration should stop.
      while (rpIndex >= lpIndex) {
        // If the left pointer is greater than the pivot index, and the right pointer
        // is smaller than the pivot index, SWAP these two values around. 
        
        // The reasoning for this is a bit hard to explain, but basically as we iterate
        // through the values to right of the pivot index, we will continue to move the
        // left pointer to the right if the number the left pointer is pointing to is
        // smaller than the number at the pivot index. Vice versa, if the right pointer's
        // number is bigger than the pivot index number, we continue to move it to the left.

        // Why? Because at the end of the iteration (below) we always swap the pivot index
        // with the right pointer index, wherever it ends up. This ensures that the pivot
        // index number is properly sorted at its final spot in the array. This is indicative
        // of the "quick sort" technique. As we iterate through the array, we place all the
        // values that are smaller than the pivot index to the LEFT of the pivot index's final
        // sorted spot, and all the values that are greater than the pivot index to the RIGHT
        // of the pivot index's final sorted spot. This creates TWO SUB ARRAYS, and we
        // recursively call this quick sort algorithm all over again on both sub arrays.
        if (array[lpIndex] > array[pivotIndex] && array[rpIndex] < array[pivotIndex]) {
          [array[lpIndex], array[rpIndex]] = [array[rpIndex], array[lpIndex]];
          lpIndex++;
          rpIndex--;
        }

        // As mentioned above, if the left pointer points to a smaller number than the
        // pivot index, move the left pointer to the right.
        if (array[lpIndex] <= array[pivotIndex]) lpIndex++;

        // Vice versa for the right pointer, if it's pointing to a number greater than
        // the pivot index, move the right pointer to the left.
        if (array[rpIndex] >= array[pivotIndex]) rpIndex--;
      }

      // At the end of the iteration, always swap the pivot index with the right pointer index.
      [array[pivotIndex], array[rpIndex]] = [array[rpIndex], array[pivotIndex]];

      // The why logic might not be obvious upon first glance, but what is going on here is that
      // we always want to call quick sort on the smaller sub array first. This is specifically
      // to do with time complexity. If we start our recursion on the bigger sub array, we may
      // end up with (at worst case) an O(n) time complexity. This is because if for whatever
      // reason the sub arrays in the forthcoming recursive calls kept creating a sub array of
      // a length of 1, and put the rest of the numbers in the other sub array, we would continue
      // to re-iterate through (almost) the entire length of the array again. At worst case this
      // could happen over and over again and we would end up with O(n) calls on the call stack.

      // We want to make sure that we call the quicksort on the smaller sub array first, because
      // with that technique you will at most only make O(log(n)) calls and have O(log(n)) space
      // on the call stack AT ONCE. We will let tail recursion (not supported in all languages,
      // I believe ES6 at the time of writing this comment supports it, at least in some browers)
      // which removes the memory usage on the call stack after we've finished applying quick sort
      // to the smaller sub arrays. 
      const leftSubArrayIsSmaller = rpIndex - 1 - startIdx < endIdx - (rpIndex + 1);
      if (leftSubArrayIsSmaller) {
        quickSortHelper(array, startIdx, rpIndex - 1);
        quickSortHelper(array, rpIndex + 1, endIdx);
      } else {
        quickSortHelper(array, rpIndex + 1, endIdx);
        quickSortHelper(array, startIdx, rpIndex - 1);
      }
    }

    return array;
  }
}

const arrayToSort = [6, 5, 3, 1, 8, 7, 2, 4];

//console.log(HeapSortAlgorithms.HeapSort(arrayToSort));
console.log(SortingAlgorithms.QuickSort(arrayToSort));
