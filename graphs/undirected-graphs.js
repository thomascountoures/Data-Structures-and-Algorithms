const SinglyLinkedList = require('../linkedlists/singly-linkedlist').SinglyLinkedList;

/**
 * An undirected graph using a singly linked
 * list to store its adjacent nodes in an
 * adjacency list.
 */
class UndirectedGraphSinglyLinkedList {
  constructor(vertices) {
    this.vertices = vertices;
    this.adjacencyList = Array(vertices);

    for (let i = 0; i < this.vertices; i++) {
      this.adjacencyList[i] = new SinglyLinkedList();
    }
  }

  addVertex(vertex) {
    if (vertex < this.vertices) this.adjacencyList[vertex] = new SinglyLinkedList();
    return this;
  }

  addEdge(source, destination) {
    if (source < this.vertices && destination < this.vertices) {
      this.adjacencyList[source].append(destination);
      this.adjacencyList[destination].append(source);
    }
    return this;
  }

  removeVertex(vertex) {
    if (vertex < this.vertices) {
      this.adjacencyList[vertex] = new SinglyLinkedList();
      for (let source = 0; source < this.vertices; source++) {
        this.adjacencyList[source].removeByValue(vertex);
      }
      return this;
    }
  }

  removeEdge(source, destination) {
    if (source < this.vertices && destination < this.vertices) {
      this.adjacencyList[source].removeByValue(destination);
      this.adjacencyList[destination].removeByValue(source);
    }
    return this;
  }

  printGraph() {
    console.log('---- Adjacency List of Undirected Graph -----\n\n');
    console.log('- - - - -');
    let sourceOutput = '';
    for (let i = 0; i < this.adjacencyList.length; i++) {
      const source = this.adjacencyList[i];
      sourceOutput = `${i} - [${JSON.stringify(source)}]: `;
      let currentNode = source.getHead();
      let output = '';
      while (currentNode) {
        output += `${currentNode.value} --> `;
        currentNode = currentNode.next;
        if (currentNode === null) console.log(sourceOutput + output);
      }
      console.log('\n');
    }
    console.log('- - - - -');
  }
}

// demo
const undirectedGraph = new UndirectedGraphSinglyLinkedList(5);
undirectedGraph.addVertex(1).addVertex(2).addEdge(1, 2).addEdge(1, 3);
// undirectedGraph.printGraph();
// console.log(undirectedGraph);

/**
 * A directed graph using an array of singly
 * linked lists to store its adjacent nodes, within
 * an adjacency list.
 */
class DirectedGraphSinglyLinkedList {
  constructor(vertices) {
    this.vertices = vertices;
    this.adjacencyList = Array(vertices);

    for (let i = 0; i < this.vertices; i++) {
      this.adjacencyList[i] = new SinglyLinkedList();
    }
  }

  addVertex(vertex) {
    if (vertex < this.vertices) this.adjacencyList[vertex] = new SinglyLinkedList();
    return this;
  }

  addEdge(source, destination) {
    if (source < this.vertices && destination < this.vertices) {
      this.adjacencyList[source].append(destination);
    }
    return this;
  }

  removeVertex(vertex) {
    if (vertex < this.vertices) {
      // remove source vertex first
      this.adjacencyList[vertex] = new SinglyLinkedList();
      for (let source = 0; i < this.vertices; source++) {
        this.adjacencyList[source].removeByValue(vertex);
      }
    }
    return this;
  }

  removeEdge(source, destination) {
    if (source < this.vertices && destination < this.vertices) {
      this.adjacencyList[source].removeByValue(destination);
    }
    return this;
  }

  printGraph() {
    console.log('---- Adjacency List of Directed Graph -----\n\n');
    console.log('- - - - -');
    let sourceOutput = '';
    for (let i = 0; i < this.adjacencyList.length; i++) {
      const source = this.adjacencyList[i];
      sourceOutput = `${i} - [${JSON.stringify(source)}]: `;
      let currentNode = source.getHead();
      let output = '';
      while (currentNode) {
        output += `${currentNode.value} --> `;
        currentNode = currentNode.next;
        if (currentNode === null) console.log(sourceOutput + output);
      }
      console.log('\n');
    }
    console.log('- - - - -');
  }
}

const directedGraphSinglyLinkedList = new DirectedGraphSinglyLinkedList(5);
directedGraphSinglyLinkedList.addEdge(1, 2).addEdge(1, 3).removeEdge(1, 2);

module.exports = {
  UndirectedGraphSinglyLinkedList,
  DirectedGraphSinglyLinkedList,
};

// directedGraphSinglyLinkedList.printGraph();
// console.log(directedGraphSinglyLinkedList);
