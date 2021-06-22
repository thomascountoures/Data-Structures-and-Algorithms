function heapify(arr, length, i) {
  let largest = i;
  let left = i * 2 + 1;
  let right = left + 1;

  if (left < length && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < length && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, length, largest);
  }

  return arr;
}

function heapSort(arr) {
  let length = arr.length;
  let i = Math.floor(length / 2 - 1);
  let k = length - 1;

  while (i >= 0) {
    console.log('i before heapify', i);

    heapify(arr, length, i);
    i--;
    console.log('i after heapify', i);
  }

  return arr;
}

console.log(heapSort([6, 5, 3, 1, 8, 7, 2, 4]));
