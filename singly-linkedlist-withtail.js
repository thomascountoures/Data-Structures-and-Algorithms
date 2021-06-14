/**
 * Singly Linked List
 * With reference to tail
 *
 * Created by Thomas Countoures
 */
class SinglyLinkedListWithTail {
  constructor() {
    this.head = this.tail = null;
  }

  append(value) {
    if (!this.head) this.head = this.tail = new Node(value);
    else {
      const newNode = new Node(value);
      const oldTail = this.tail;
      oldTail.next = newNode;
      this.tail = newNode;
    }
    return this;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  removeHead() {
    if (!this.head) return null;
    this.head = this.head.next;
    return this;
  }

  replaceHead(value) {
    if (!this.head) this.head = this.tail = new Node(value);
    else {
      const newNode = new Node(value);
      newNode.next = this.head;
      this.head = newNode;
    }
    return this;
  }

  replaceTail(value) {
    if (!this.head) this.head = this.tail = new Node(value);
    else {
      const newNode = new Node(value);
      this.tail.next = newNode;
      this.tail = newNode;
    }
    return this;
  }

  insert(value, index) {
    if (!this.head) return null;
    if (index === 0) return this.replaceHead(value);

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
        break;
      }
    }

    return this;
  }

  find(index) {
    if (!this.head) return null;
    if (index === 0) return this.getHead();
    let currentNode = this.head;
    let counter = 0;

    while (currentNode) {
      if (counter !== index) {
        previousNode = currentNode;
        currentNode = currentNode.next;
        counter++;
      } else return currentNode;
    }
  }

  remove(index) {
    if (!this.head) return null;
    if (index === 0) return this.removeHead();

    let currentNode = this.head;
    let previousNode = null;
    let counter = 0;

    while (currentNode) {
      if (counter !== index) {
        previousNode = currentNode;
        currentNode = currentNode.next;
        counter++;
      } else {
        previousNode.next = currentNode.next;
        currentNode.next = null;
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
  SinglyLinkedListWithTail,
};
