import { prettyPrint } from "./prettyprint.js";
import { Tree } from "./classes.js";

// Create a binary search tree from an array of random numbers < 100. 
// You can create a function that returns an array of random numbers every time you call it if you wish.

function createTree(length) {
	const arr = [];
	for (let i = 0; i < length; i++) {
		arr[i] = Math.floor(Math.random() * 100);
	}
	const tree = new Tree(arr);
	prettyPrint(tree.root);
	return tree;
}

const myTree = createTree(7);

// Confirm that the tree is balanced by calling isBalanced.
myTree.isBalanced();

// Print out all elements in level, pre, post, and in order.
console.log("LEVEL")
myTree.levelOrder(node => console.log(node.data));

console.log("PREORDER")
myTree.preOrder(node => console.log(node.data));

console.log("POSTORDER")
myTree.postOrder(node => console.log(node.data));

console.log("INORDER")
myTree.inOrder(node => console.log(node.data));

// Unbalance the tree by adding several numbers > 100.
myTree.insertValue(Math.floor(100+ Math.random() * 100))
myTree.insertValue(Math.floor(100+ Math.random() * 100))
myTree.insertValue(Math.floor(100+ Math.random() * 100))

// Confirm that the tree is unbalanced by calling isBalanced.
console.log("Balanced:", myTree.isBalanced());

// Balance the tree by calling rebalance.
myTree.rebalance();

// Confirm that the tree is balanced by calling isBalanced.
console.log("Balanced:", myTree.isBalanced());

// Print out all elements in level, pre, post, and in order.
console.log("LEVEL")
myTree.levelOrder(node => console.log(node.data));

console.log("PREORDER")
myTree.preOrder(node => console.log(node.data));

console.log("POSTORDER")
myTree.postOrder(node => console.log(node.data));

console.log("INORDER")
myTree.inOrder(node => console.log(node.data));