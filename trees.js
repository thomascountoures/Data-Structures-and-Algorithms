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
        if (currentNode.left === null && currentNode.right === null) {
          if (currentNode === this.root) this.root = null;
          else if (value < parentNode.value) parentNode.left = null;
          else parentNode.right = null;
        } else if (currentNode.left && currentNode.right === null) {
          if (currentNode === this.root) this.root = currentNode.left;
          else if (currentNode.left < parentNode.value) parentNode.left = currentNode.left;
          else parentNode.right = currentNode.left;
        } else if (currentNode.left === null && currentNode.right) {
          if (currentNode === this.root) this.root = currentNode.right;
          else if (currentNode.right < parentNode.value) parentNode.left = currentNode.right;
          else parentNode.right = currentNode.right;
        } else {
          const leftMostOfRightChild = this.getLeftMost(currentNode.right);
          leftMostOfRightChild.left = currentNode.left;
          if (currentNode.value < parentNode.value) parentNode.left = currentNode.right;
          else if (currentNode.value > parentNode.value) parentNode.right = currentNode.right;
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
