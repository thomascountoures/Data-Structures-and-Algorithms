/**
 * Singly Linked List
 * No reference to tail
 * Stores only value (not suitable for a hashtable)
 *
 * Created by Thomas Countoures
 */
class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  getHead() {
    return this.head;
  }

  getSize() {
    return this.size;
  }

  replaceHead(value) {
    if (!this.head) this.head = new Node(value);
    else {
      const newNode = new Node(value);
      newNode.next = this.head;
      this.head = newNode;
      return this;
    }
  }

  replaceTail(value) {
    if (!this.head) return null;
    const newNode = new Node(value);
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.next !== null) currentNode = currentNode.next;
      else {
        currentNode.next = newNode;
        break;
      }
    }

    return this;
  }

  insert(value, index) {
    if (!this.head) return null;
    if (index === 0) {
      this.size++;
      return this.replaceHead(value);
    }

    let currentNode = this.head;
    let previousNode = null;
    let counter = 0;

    while (currentNode) {
      if (counter !== index) {
        previousNode = currentNode;
        currentNode = currentNode.next;
        counter++;
      } else {
        const newNode = new Node(value);
        previousNode.next = newNode;
        newNode.next = currentNode;
        this.size++;
        break;
      }
    }

    return this;
  }

  append(value) {
    if (!this.head) {
      this.replaceHead(value);
      this.size++;
    } else {
      let currentNode = this.head;

      while (currentNode) {
        if (currentNode.next !== null) currentNode = currentNode.next;
        else {
          currentNode.next = new Node(value);
          this.size++;
          break;
        }
      }
    }

    return this;
  }

  find(value) {
    if (!this.head) return null;
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.value !== value) currentNode = currentNode.next;
      else return currentNode;
    }
  }

  removeAt(position) {
    if (!this.head) return null;
    if (position <= 0) {
      this.head = this.head.next;
      this.size--;
    } else {
      let currentNode = this.head;
      let previousNode = null;
      let counter = 0;
      while (currentNode) {
        if (counter !== position) {
          previousNode = currentNode;
          currentNode = currentNode.next;
          counter++;
        } else {
          previousNode.next = currentNode.next;
          currentNode.next = null;
          this.size--;
          break;
        }
      }
    }

    return this;
  }

  removeByValue(value) {
    if (!this.head) return null;
    if (value === this.head.value) {
      this.head = this.head.next;
      this.size--;
    } else {
      let currentNode = this.head;
      let previousNode = null;
      while (currentNode) {
        if (currentNode.value !== value) {
          previousNode = currentNode;
          currentNode = currentNode.next;
        } else {
          previousNode.next = currentNode.next;
          this.size--;
          break;
        }
      }
    }
    return this;
  }
}

class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next || null;
  }
}

module.exports = {
  SinglyLinkedList,
};

// Demo
const linkedList = new SinglyLinkedList();
linkedList.append(2).append(3).append(5);
// linkedList.removeBy(3);
console.log(linkedList);
