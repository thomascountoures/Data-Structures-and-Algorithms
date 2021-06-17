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
        if(!currentNode) this.root = new BinaryTreeNode(value);
        else {
            if(value < currentNode.value) {
                if(currentNode.left === null) currentNode.left = new BinaryTreeNode(value);
                else this.insert(value, currentNode.left);
            } else if(value > currentNode.value) {
                if(currentNode.right === null) currentNode.right = new BinaryTreeNode(value);
                else this.insert(value, currentNode.right);
            }
        }
        return this;
    }
}