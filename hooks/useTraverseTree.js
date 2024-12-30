"use client";
import { v4 as uuidv4 } from "uuid";

const useTraverseTree = () => {
  function insertNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: uuidv4(),
        name: item,
        isFolder: isFolder,
        items: [],
      });
      return tree;
    }
    if (tree.items) {
      let latestNode = [];
      latestNode  = tree.items.map((node) =>
        insertNode(node, folderId, item, isFolder)
      );
      return { ...tree, items: latestNode };
    }
  }
  function deleteNode(tree, folderId) {
    if (tree.id === folderId) {
      return null; // Remove the current node
    }
    if (tree.items) {
      // Filter out the node with the matching id
      const updatedItems = tree.items
        .map((node) => deleteNode(node, folderId)) // Recursively call deleteNode
        .filter((node) => node !== null); // Remove any null values
  
      return { ...tree, items: updatedItems };
    }
  
    return tree;
  }
  return { insertNode , deleteNode};
};

export default useTraverseTree;
