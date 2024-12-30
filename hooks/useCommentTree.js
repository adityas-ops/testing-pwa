"use client"

const useCommentTree = () => {
    function addComment(tree, comment, parentId) {
      return tree.map((node) => {
        if (node.id === parentId) {
          return { ...node, replies: [...node.replies, comment] };
        }
        if (node.replies) {
          return { ...node, replies: addComment(node.replies, comment, parentId) };
        }
        return node;
      });
    }
    function addLike(tree, commentId) {
      return tree.map((node) => {
        if (node.id === commentId) {
          return { ...node, likes: node.likes + 1 };
        }
        if (node.replies) {
          return { ...node, replies: addLike(node.replies, commentId) };
        }
        return node;
      });
    }
    return { addComment, addLike };
  };
  
  export default useCommentTree;
  