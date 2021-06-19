class MaxHeap {
  constructor() {
    // Insert a null value for index 0.
    // This is because we are going to be
    // starting our index values at 1, to
    // slightly simplify the math calculations
    // to get the parent and child nodes of a
    // given node at a given index.
    this.heap = [];
  }

  getRootNode() {
    return this.heap[0];
  }

  getEndNode() {
    return this.heap[this.heap.length - 1];
  }

  getParentNodeIndex(index) {
    return Math.floor(index - 1 / 2);
  }

  getLeftChildNodeIndex(index) {
    return index * 2 + 1;
  }

  getRightChildNodeIndex(index) {
    return index * 2 + 2;
  }

  /**
   * Insert a value into a max heap.
   * Time Complexity: O(log(n))
   * @param {*} value
   */
  insert(value) {
    // First push a value at the bottom of the heap.
    this.heap.push(value);

    // The inserted value will always be as left as possible
    // at the bottom of the heap. In an array we represent this
    // as the end of the heap.
    let currentNodeIndex = this.heap.length - 1;

    // Get the parent node's index.
    let parentNodeIndex = this.getParentNodeIndex(currentNodeIndex);
    console.log('parent node index', parentNodeIndex);
    // While the parent node is greater than the inserted node, we will keep swapping those
    // values until this is no longer true, as this violates the rule of a max heap.
    // This process of re-balancing the heap is also known as heapifying, or for a
    // max heap, heapifying up.
    while (this.heap[parentNodeIndex] < this.heap[currentNodeIndex] && currentNodeIndex > 0) {
      // Swap array elements.
      [this.heap[parentNodeIndex], this.heap[currentNodeIndex]] = [
        this.heap[currentNodeIndex],
        this.heap[parentNodeIndex],
      ];
      // Since we just swapped the current node with its parent, then its new index will
      // be the old parent node's index.
      currentNodeIndex = parentNodeIndex;

      // Get the new parent node index.
      parentNodeIndex = this.getParentNodeIndex(currentNodeIndex);
    }
    return this;
  }

  remove() {
    // If there is nothing in the heap, return null
    if (this.heap.length === 0) return null;
    // If there are two or fewer nodes in the heap, that means we can
    // just splice out the head, and only the head. If there was only
    // one node, it will leave no nodes behind (an empty array) and if
    // there were two nodes, it will leave one behind as the new head
    // of the array. Either way, we are specifying here to only splice
    // the root of the heap.
    else if (this.heap.length <= 2) return this.heap.splice(0, 1);
    else {
      // Cache the biggest. We will return this value at the end of the method.
      const biggest = this.heap[0];

      // Replace the root of the heap with the last item in the heap.
      this.heap[0] = this.heap.splice(this.heap.length - 1);

      // We start heapifying at the root node after we've removed the original
      // root node.
      let currentNodeIndex = 0;
      let leftChildIndex = this.getLeftChildNodeIndex(currentNodeIndex);
      let rightChildIndex = this.getRightChildNodeIndex(currentNodeIndex);

      // While the current node has two children, and while one of those
      // children are bigger than the current node, keep heapifying up.
      // Keep in mind that if a node has two children, we still have more
      // nodes to explore.
      while (
        this.heap[leftChildIndex] &&
        this.heap[rightChildIndex] &&
        (this.heap[currentNodeIndex] < this.heap[leftChildIndex] ||
          this.heap[currentNodeIndex] < this.heap[rightChildIndex])
      ) {
        if (this.heap[currentNodeIndex] < this.heap[leftChildIndex]) {
          [this.heap[currentNodeIndex], this.heap[leftChildIndex]] = [
            this.heap[leftChildIndex],
            this.heap[currentNodeIndex],
          ];
          currentNodeIndex = leftChildIndex;
        } else {
          [this.heap[currentNodeIndex], this.heap[rightChildIndex]] = [
            this.heap[rightChildIndex],
            this.heap[currentNodeIndex],
          ];
          currentNodeIndex = rightChildIndex;
        }

        leftChildIndex = this.getLeftChildNodeIndex(currentNodeIndex);
        rightChildIndex = this.getRightChildNodeIndex(currentNodeIndex);
      }

      // If a node does not have two children, then it either has no more children (nothing left to explore),
      // or it has one child - in the case that it has only one child, then that means it will ALWAYS have a
      // left child, and not a right child. This is due to the fact that heaps are always "almost" a complete
      // tree - so if a node only has one child, that node belongs to the left, because nodes are always added
      // to the leftmost side of a heap when they are inserted.
      if (this.heap[rightChildIndex] === undefined && this.heap[currentNodeIndex] < this.heap[leftChildIndex]) {
        [this.heap[currentNodeIndex], this.heap[leftChildIndex]] = [
          this.heap[leftChildIndex],
          this.heap[rightChildIndex],
        ];
      }

      return biggest;
    }
  }
}

const maxHeap = new MaxHeap();
maxHeap.insert(5).insert(10).insert(15).remove(); // todo: fix remove
console.log(maxHeap);
