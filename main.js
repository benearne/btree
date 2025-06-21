import { prettyPrint } from "./prettyprint.js";

class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

class Tree {
	constructor(arr) {
		this.array = arr;
		this.root = this.buildTree(this.array);
	}

	buildTree(arr) {
		// Turns the array into a balanced binary tree full od NODE objects
		// dont forget to sort and remove duplicates
		// return the level-0 root node

		// sort + remove dublicates
		const array = this.removeDublicates(this.mergeSort(arr));

		// basecase
		if (array.length == 0) {
			return null;
		} else if (array.length == 1) {
			return new Node(array[0]);
		}

		// Mid
		const middle = Math.floor((array.length - 1) / 2);
		const root = new Node(array[middle]);

		// left arr
		root.left = this.buildTree(array.slice(0, middle));
		root.right = this.buildTree(array.slice(middle + 1));
		return root; 
	}

	mergeSort(arr) {
		if (arr.length <= 1) {
			return arr;
		}

		const middle = Math.floor((arr.length) / 2);

		// teile und sortiere
		const left = this.mergeSort(arr.slice(0, middle));
		const right = this.mergeSort(arr.slice(middle));

		return this.merge(left, right);
	}

	merge(left, right) {
		const result = [];
		while (left.length && right.length) {
			if (left[0] < right[0]) result.push(left.shift());
			else result.push(right.shift());
		}
		return result.concat(left, right);
	}

	removeDublicates(arr) {
		for (let i = 0; i < arr.length - 1; i++) {
			if (arr[i] == arr[i + 1]) {
				arr.splice(i, 1);
				i--;
			}
		}
		return arr;
	}

	insert(value, root = this.root) {
		if (root === null) {
			return new Node(value);
		}

		// Duplicates not allowed
		if (root.data === value) {
			return root;
		}

		if (value < root.data) {
			root.left = this.insert(value, root.left);
		} else if (value > root.data) {
			root.right = this.insert(value, root.right)
		}

		return root;
	}

	insertValue(value) {
		this.root = this.insert(value, this.root);
	}


}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr);


prettyPrint(tree.root)

tree.insertValue(77);
prettyPrint(tree.root)