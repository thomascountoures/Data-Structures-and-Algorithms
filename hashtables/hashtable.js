class HashTable {
  constructor(limit) {
    this.buckets = [];
    this.limit = limit;

    for (let i = 0; i < limit; i++) {
      this.buckets[i] = new HashTableSinglyLinkedList();
    }
  }

  hash(key) {
    let result = '';
    for (let i = 0; i < key.length; i++) {
      result += key.charCodeAt(i);
    }
    return result % this.limit;
  }

  insert(key, value) {
    const hash = this.hash(key);
    const bucket = this.buckets[hash];
    bucket.append(key, value);
  }

  remove(key) {
    const hash = this.hash(key);
    const bucket = this.buckets[hash];
    bucket.remove(key);
  }
}

class HashTableSinglyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  getHead() {
    return this.head;
  }

  getSize() {
    return (this.size = 0);
  }

  insert(key, value) {
    if (!this.head) this.head = new Node(key, value);
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.next !== null) {
        // Keys must be unique. Do not add to linkedlist
        // if key already exists. Instead overwrite the value.
        if (key === currentNode.key) currentNode.value = value;
        currentNode = currentNode.next;
      } else {
        currentNode.next = new Node(key, value);
        this.size++;
      }
    }
  }

  remove(key) {
    if (!this.head) return null;
    let currentNode = this.head;
    let previousNode = null;

    while (currentNode) {
      if (key !== currentNode.key) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      } else {
        previousNode.next = currentNode.next;
        currentNode.next = null;
        this.size--;
        break;
      }
    }
  }

  removeAt(i) {
    if (!this.head) return null;
    let currentNode = this.head;
    let previousNode = null;
    let counter = 0;
    while (currentNode) {
      if (counter !== i) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      } else {
        previousNode.next = currentNode.next;
        currentNode.next = null;
        this.size--;
        break;
      }
    }
  }
}

class Node {
  constructor(key, value) {
    this[key] = key;
    this.value = value;
  }
}
