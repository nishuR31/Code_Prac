const prompt = require("prompt-sync")();

class Node {
  constructor(value) {
    this.value = value;
    this.left = this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  // Add a new value to the tree with error handling and input validation
  add() {
    let value;
    while (true) {
      try {
        value = parseInt(prompt("\nEnter value to add: ") ?? "Invalid"); // Parse and coalesce null/undefined input
        if (isNaN(value)) {
          console.log(`Invalid input. Please enter a numeric value.`);
          continue;
        }
        break; // Exit loop if value is valid
      } catch (error) {
        console.log(`An error occurred during input : ${error}\nPlease try again.`);
      }
    }

    let newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
      console.log(`\nRoot was null, so ${value} is added as the root.`);
      return;
    }

    let current = this.root;
    while (true) {
      try {
        if (value < current.value) {
          if (!current.left) {
            current.left = newNode;
            console.log(`${value} is added to the left of ${current.value}`);
            break;
          }
          current = current.left;
        } else if (value > current.value) {
          if (!current.right) {
            current.right = newNode;
            console.log(`${value} is added to the right of ${current.value}`);
            break;
          }
          current = current.right;
        } else {
          console.log(`Value ${value} already exists in the tree.`);
          break;
        }
      } catch (error) {
        console.log(`An error occurred while adding the value : ${error}.`);
        break;
      }
    }
  }

  // Search for a value in the tree with error handling and input validation
  search() {
    let value;
    while (true) {
      try {
        value = parseInt(prompt("Enter value to search: ") ?? "invalid"); // Parse and coalesce null/undefined input
        if (isNaN(value)) {
          console.log("Invalid input. Please enter a numeric value.");
          continue;
        }
        break; // Exit loop if value is valid
      } catch (error) {
        console.log(`An error occurred during input: ${error}.\nPlease try again.`);
      }
    }

    if (!this.root) {
      console.log("Empty tree, can't search.");
      return;
    }

    let current = this.root;
    while (current) {
      try {
        if (value === current?.value) {
          console.log(`${value} found at node with value ${current.value}`);
          return;
        } else if (value < current.value) {
          current = current.left;
        } else {
          current = current.right;
        }
      } catch (error) {
        console.log("An error occurred while searching the tree.");
        break;
      }
    }
    console.log(`${value} not found in the tree.`);
  }

  // Display the tree in a specified traversal order with error handling
  display() {
    let ask;
    while (true) {
      try {
        ask = prompt("Choose order to display\nIn-Order: [I/i]\nPre-Order: [Pr]\nPost-Order: [Po]\n:") ?? "";
        if (ask.toLowerCase() === "i") {
          console.log("\nTree contents (In-order):");
          this._inOrderTraversal(this.root);
          break;
        } else if (ask.toLowerCase() === "pr") {
          console.log("\nTree contents (Pre-order):");
          this._preOrderTraversal(this.root);
          break;
        } else if (ask.toLowerCase() === "po") {
          console.log("\nTree contents (Post-order):");
          this._postOrderTraversal(this.root);
          break;
        } else {
          console.log("Invalid entry. Please enter 'I', 'Pr', or 'Po' [case insentive].");
        }
      } catch (error) {
        console.log(`An error occurred during input: ${error}.\n Please try again.`);
      }
    }
  }

  // Helper function for in-order traversal
  _inOrderTraversal(node) {
    if (node) {
      this._inOrderTraversal(node.left);
      console.log(node.value);
      this._inOrderTraversal(node.right);
    }
  }

  // Helper function for pre-order traversal
  _preOrderTraversal(node) {
    if (node) {
      console.log(node.value);
      this._preOrderTraversal(node.left);
      this._preOrderTraversal(node.right);
    }
  }

  // Helper function for post-order traversal
  _postOrderTraversal(node) {
    if (node) {
      this._postOrderTraversal(node.left);
      this._postOrderTraversal(node.right);
      console.log(node.value);
    }
  }
}

// Example Usage
const tree = new Tree();

      
