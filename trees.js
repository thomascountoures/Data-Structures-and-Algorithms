class BinaryTreeNode {
  constructor(value, left, right) {
    this.value = value;
    this.left = left || null;
    this.right = right || null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value, currentNode = this.root) {
    if (!currentNode) this.root = new BinaryTreeNode(value);
    else {
      if (value < currentNode.value) {
        if (currentNode.left === null) currentNode.left = new BinaryTreeNode(value);
        else this.insert(value, currentNode.left);
      } else {
        if (currentNode.right === null) currentNode.right = new BinaryTreeNode(value);
        else this.insert(value, currentNode.right);
      }
    }
    return this;
  }

  find(value, currentNode = this.root) {
    if (!currentNode) return null;
    else {
      if (value < currentNode) this.find(value, currentNode.left);
      else if (value > currentNode) this.find(value, currentNode.right);
      else return currentNode;
    }
  }

  remove(value, currentNode = this.root, parentNode = this.root) {
    if (!currentNode) return null;
    else {
      if (value < currentNode) this.remove(value, currentNode.left, currentNode);
      else if (value > currentNode) this.remove(value, currentNode.right, currentNode);
      else {
        // Remember: 'value' === currentNode.value (currentNode is the node with the matching value)

        // If the matching node has no children (easy mode).
        if (currentNode.left === null && currentNode.right === null) {
          // If this node is the root, set root to null.
          if (currentNode === this.root) this.root = null;
          else if (value < parentNode.value) parentNode.left = null;
          else parentNode.right = null;

          // If the matching node has one child, on the left side.
        } else if (currentNode.left && currentNode.right === null) {
          if (currentNode === this.root) this.root = currentNode.left;
          else if (currentNode.left < parentNode.value) parentNode.left = currentNode.left;
          else parentNode.right = currentNode.left;

          // If the matching node has one child, on the right side.
        } else if (currentNode.left === null && currentNode.right) {
          if (currentNode === this.root) this.root = currentNode.right;
          else if (currentNode.right < parentNode.value) parentNode.left = currentNode.right;
          else parentNode.right = currentNode.right;

          // If the matching node has two children (hard mode).
        } else {
          // Get the leftmost child of the current node's right child.
          // Ie. move one node to the right, and then go all the way to the bottom left.
          const leftMostOfRightChild = this.getLeftMost(currentNode.right);

          // Attach the current node's left child to the bottom of that left most child
          // retrieved above. At this point, we have created chain of nodes - a combination
          // of the left most node of the current node's right child, and all of the left nodes
          // of the current node underneath that.
          //
          // This sounds a bit complicated, but basically we've just
          // created a long chain of nodes that still follow the rules of a BST.
          leftMostOfRightChild.left = currentNode.left;

          // If the matching node's value is less than the parent node's value,
          // attach the recently created string of nodes on the current node's
          // right side on the left side of the parent node.
          if (value < parentNode.value) parentNode.left = currentNode.right;
          // And vice versa.
          else if (value > parentNode.value) parentNode.right = currentNode.right;
          // If the matching node's value is not greater or less than the parent node's
          // value, that means this is the root, since a BST cannot have duplicate values.
          // We update the current root to our newly constructed set of nodes.
          else this.root = currentNode.right;
        }
      }
    }
  }

  getLeftMost(currentNode) {
    if (currentNode.left) this.getLeftMost(currentNode.left);
    else return currentNode;
  }
}
