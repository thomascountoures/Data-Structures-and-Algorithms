const UndirectedGraphSinglyLinkedList = require('./undirected-graphs').UndirectedGraphSinglyLinkedList;
const Stack = require('./stacksandqueues').Stack;

/**
 * A set of useful graph algorithms for coding interviews.
 * Hopefully this helps others who may require it.
 *
 * Code and descriptions By Thomas Countoures
 */
class GraphAlgorithms {
  static BFS(graph) {
    const vertices = graph.vertices;
    const stack = new Stack(vertices);

    // Create a visited object. This is to mark nodes as visited
    // once we add them to the stack. We don't want to re-explore
    // nodes that we have already visited.
    const visited = {};
    const result = [];

    // Iterate over source nodes. If source node has not already
    // been visited, push that value onto the stack to begin
    // exploring adjacent nodes.
    for (let source = 0; source < vertices; source++) {
      if (!(source in visited)) {
        stack.push(source);
        visited[source] = true;
      }
      // Continue to pull values from the top of the stack.
      // We will pull a node value from the top, and then
      // immediately add its adjacent nodes onto the stack,
      // if those nodes have not already been visited.
      while (!stack.isEmpty()) {
        const value = stack.pop();
        result.push(value);
        let immediateAdjacent = graph.adjacencyList[value].getHead();

        // Since this is a linked list, we have to iterate over each
        // node in the linked list and add them to the stack. If the
        // adjacent nodes were based in an array instead of a linked
        // list, we would be iterating over them using a for loop
        // instead of a while loop, for example.
        while (immediateAdjacent) {
          const value = immediateAdjacent.value;
          // Important: only add node values to the stack if they
          // haven't yet been visited.
          if (!(value in visited)) {
            stack.push(value);
            visited[value] = true;
          }
          // Though it might be obvious, it's important to note here
          // that this line is outside of the if block. We always
          // want to see the next adjacent node, if there is any.
          // For obvious reasons too, it would hang the while statement
          // should it be inside the if block :)
          immediateAdjacent = immediateAdjacent.next;
        }
      }
    }

    return result;
  }

  /**
   * Detects if a cycle is present in an undirected graph
   * using depth first search.
   *
   * The graph uses an adjacency list.
   * @param {*} graph (undirected)
   */
  static detectCycleUndirectedGraph(graph) {
    const visited = {};
    const vertexCount = graph.vertices;

    // I'm creating the recursive function here so I don't
    // have to keep needlessly passing the graph and visited parameters
    // to this over and over in each recursive call.
    function isCyclicRecursive(currentNode, parent) {
      visited[currentNode] = true;
      let immediateAdjacent = graph.adjacencyList[currentNode].getHead();

      // traverse over adjacent nodes to the current node.
      // if the parent is 1, and the adjacent is 2, then we
      // check 2's adjacent nodes in the adjacency list. this
      // is classic of a depth first search approach, as we
      // continue going deeper and deeper into the graph.
      while (immediateAdjacent) {
        let value = immediateAdjacent.value;
        if (!(value in visited)) {
          if (isCyclicRecursive(value, currentNode)) return true;
          // To explain this clearly:
          // If the current adjacent node you are on was already visited,
          // AND the parent node (the immediate previous node from which
          // the current node was visited from) is NOT your current value,
          // then a cycle EXISTS in this undirected graph.

          // For example, in an undirected graph, if you went from node 1 -> 2,
          // the parent would be 1, and the adjacency list of 2 included 1, the
          // current node would be equal to the parent node (visually speaking,
          // you would be traversing over the same to the back edge you just came from),
          // this is not a cycle. If however that value was already visited, and
          // it was NOT the parent value, it means that a cycle exists.
        } else if (value !== parent) return true;

        // if the value was visited and no cycle was previously detected, move on to the
        // next adjacent value in the linked list.
        immediateAdjacent = immediateAdjacent.next;
      }

      return false;
    }

    // Here we loop over each of the SOURCE vertices.
    // I am calling them source here because these are
    // the source nodes in the adjacency list. If the source
    // node was already visited, there is no need to visit
    // it again.
    for (let source = 0; source < vertexCount; source++) {
      if (!(source in visited)) {
        if (isCyclicRecursive(source, visited, null)) return true;
      }
    }

    return false;
  }

  static detectCycleDirectedGraph(graph) {
    const vertices = graph.vertices;
    const visited = {};
    const backEdges = {};

    // As above, I'm creating the recursive function here so I don't
    // have to keep needlessly passing the graph, visited and backEdges parameters
    // to this over and over.
    function isCyclicRecursive(currentNode) {
      visited[currentNode] = true;
      backEdges[currentNode] = true;

      let immediateAdjacent = g.vertices[currentNode].getHead();

      while (immediateAdjacent) {
        let value = immediateAdjacent.value;
        if (!(value in visited)) {
          if (isCyclicRecursive(value)) return true;
          // If the current node we are on was already visited, AND we
          // found the node in our back edges, it means that during this
          // depth first search traversal it was part of the path that led
          // us to our current node - therefore we have a cycle.

          // The difference with a directed graph from an undirected graph
          // is that we cannot just check to see if a node was already
          // visited. If the current node you are on was already visited
          // it does not mean there is a cycle in your graph, due to the
          // one way nature of the edges. A cycle is only possible if and
          // only if, during a DFS, we run into a node that was part of the
          // current search path we were on.
        } else if (value in backEdges) return true;
        immediateAdjacent = immediateAdjacent.next;
      }

      // If we run into a node with no more adjacent vertices, we leave the
      // while loop. Because we are trying to detect a cycle in a directed
      // graph, we must recursively remove the nodes we traversed to get to
      // our current dead end. If there are any more unvisited nodes in the
      // graph lower in the call stack, we will continue to visit those back
      // within the while loop.
      delete backEdges[immediateAdjacent];

      // Return false - no cycle detected for this DFS run
      return false;
    }

    // Here we loop over each of the SOURCE vertices.
    // I am calling them source here because these are
    // the source nodes in the adjacency list. If the source
    // node was already visited, there is no need to visit
    // it again.
    for (let source = 0; source < vertices; source++) {
      if (!(source in visited)) {
        if (isCyclicRecursive(source, visited, backEdges)) return true;
      }
    }

    return false;
  }
}

const bfsGraph = new UndirectedGraphSinglyLinkedList(5);
bfsGraph.addEdge(0, 1).addEdge(1, 2).addEdge(1, 3).addEdge(2, 4);
console.log(GraphAlgorithms.BFS(bfsGraph));

// Create undirected graph WITH cycle
// const demoGraphWithCycle = new UndirectedGraphSinglyLinkedList(5);
// demoGraphWithCycle.addEdge(1, 2).addEdge(1, 3).addEdge(2, 3);
// demoGraphWithCycle.printGraph();

// // Test detect cycle
// console.log(GraphAlgorithms.detectCycleUndirectedGraph(demoGraphWithCycle));

// // Create undirected graph WITHOUT cycle
// const demoGraphWithoutCycle = new UndirectedGraphSinglyLinkedList(5);
// demoGraphWithoutCycle.addEdge(1, 2).addEdge(1, 3).addEdge(2, 4);

// // Test detect cycle
// console.log(GraphAlgorithms.detectCycleUndirectedGraph(demoGraphWithoutCycle));
