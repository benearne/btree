
export class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

export class Tree {
	constructor(arr) {
		this.array = arr;
		this.root = this.buildTree(this.array);
	}

	buildTree(arr) {
		// sort + remove dublicates
		const array = this._removeDublicates(this._mergeSort(arr));

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

	_mergeSort(arr) {
		if (arr.length <= 1) {
			return arr;
		}

		const middle = Math.floor((arr.length) / 2);

		// teile und sortiere
		const left = this._mergeSort(arr.slice(0, middle));
		const right = this._mergeSort(arr.slice(middle));

		return this._merge(left, right);
	}

	_merge(left, right) {
		const result = [];
		while (left.length && right.length) {
			if (left[0] < right[0]) result.push(left.shift());
			else result.push(right.shift());
		}
		return result.concat(left, right);
	}

	_removeDublicates(arr) {
		for (let i = 0; i < arr.length - 1; i++) {
			if (arr[i] == arr[i + 1]) {
				arr.splice(i, 1);
				i--;
			}
		}
		return arr;
	}

	_insert(value, root = this.root) {
		if (root === null) {
			return new Node(value);
		}

		// Duplicates not allowed
		if (root.data === value) {
			return root;
		}

		if (value < root.data) {
			root.left = this._insert(value, root.left);
		} else if (value > root.data) {
			root.right = this._insert(value, root.right)
		}

		return root;
	}

	insertValue(value) {
		this.root = this._insert(value, this.root);
	}

	_delete(value, root = this.root) {
		if (root === null) return root;

		if (value < root.data) {
			root.left = this._delete(value, root.left);
		} else if (value > root.data) {
			root.right = this._delete(value, root.right);
		} else {
			// kein Kind
			if (!root.left && !root.right) return null;

			// 1 Kind
			if (!root.left) return root.right;
			if (!root.right) return root.left;

			// 2 Kinder
			// kleinster Wert im rechten Teilbaum
			let successor = root.right;
			while (successor.left !== null) {
				successor = successor.left;
			}
			root.data = successor.data;
			root.right = this._delete(successor.data, root.right);
		}

		return root;
	}

	deleteItem(value) {
		this.root = this._delete(value, this.root);
	}

	find(value) {
		let current = this.root;
		while(current !== null) {
			if (current.data === value) {
				return current;
			} else if (value < current.data) {
				current = current.left;
			} else {
				current = current.right;
			}
		}
		return null;
	}

	levelOrder(callback) {
		if (!callback) {
			throw new Error("No callback function provided");
		}

		if (!this.root) return;

		// Root in queue
		const queue = [this.root];

		// As long as queue != empty:
		while (queue.length > 0) {
			// take first item -> node
			const node = queue.shift();
			// callback on node
			callback(node);
			// put is child at the end
			if (node.left) queue.push(node.left);
			if (node.right) queue.push(node.right);
		}
	}

	inOrder(callback, root = this.root) {
		if (!callback) {
			throw new Error("No callback function provided");
		}
		
		// base case
		if (!root) return;

		// read left
		this.inOrder(callback, root.left);
		// read root
		callback(root);
		// read right
		this.inOrder(callback, root.right);
	}

	preOrder(callback, root = this.root) {
		if (!callback) {
			throw new Error("No callback function provided");
		}
		
		// base case
		if (!root) return;

		// read root
		callback(root);
		// read left
		this.preOrder(callback, root.left);
		// read right
		this.preOrder(callback, root.right);
	}

	postOrder(callback, root = this.root) {
		if (!callback) {
			throw new Error("No callback function provided");
		}
		// base case
		if (!root) return;

		// read left
		this.postOrder(callback, root.left)
		// read right
		this.postOrder(callback, root.right)
		// read root
		callback(root);
	}

	_heightCounter(node) {
		if (node === null) return -1;

		const leftHeight = this._heightCounter(node.left);
		const rightHeight = this._heightCounter(node.right);

		return 1 + Math.max(leftHeight, rightHeight);
	}

	height(value) {
		// search whole tree for value
		const found = this.find(value);
		if (found) return this._heightCounter(found);
		// if not found return null
		return null
	}

	depth(value) {
		let current = this.root;
		let level = 0;
		while(current !== null) {
			if (current.data === value) {
				return level;
			} else if (value < current.data) {
				current = current.left;
				level++;
			} else {
				current = current.right;
				level++;
			}
		}
		return null;
	}

	isBalanced(node = this.root) {
		if (node === null) {
			return true;
		}
		let leftHeight = this._heightCounter(node.left);
		let rightHeight = this._heightCounter(node.right);

		if (Math.abs(leftHeight - rightHeight) > 1) {;
			return false;
		}

		return this.isBalanced(node.left) && this.isBalanced(node.right);
	}

	rebalance() {
		if (this.isBalanced()) {
			console.log("Tree was already balanced")
			return
		};
		const newArray = [];

		this.inOrder(node => newArray.push(node.data));
		this.root = this.buildTree(newArray);
		console.log("Successfully rebalanced!")
	}
}