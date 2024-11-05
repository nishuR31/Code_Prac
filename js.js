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

  add() {
    let value;
    while (true) {
      try {
        value = parseInt(prompt("\nEnter value to add: ") ?? "Invalid");
        if (isNaN(value)) {
          console.log("Invalid input. Please enter a numeric value.");
          continue;
        }
        break;
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

  search() {
    let value;
    while (true) {
      try {
        value = parseInt(prompt("Enter value to search: ") ?? "invalid");
        if (isNaN(value)) {
          console.log("Invalid input. Please enter a numeric value.");
          continue;
        }
        break;
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
          console.log("Invalid entry. Please enter 'I', 'Pr', or 'Po' [case insensitive].");
        }
      } catch (error) {
        console.log(`An error occurred during input: ${error}.\n Please try again.`);
      }
    }
  }

  _inOrderTraversal(node) {
    if (node) {
      this._inOrderTraversal(node.left);
      console.log(node.value);
      this._inOrderTraversal(node.right);
    }
  }

  _preOrderTraversal(node) {
    if (node) {
      console.log(node.value);
      this._preOrderTraversal(node.left);
      this._preOrderTraversal(node.right);
    }
  }

  _postOrderTraversal(node) {
    if (node) {
      this._postOrderTraversal(node.left);
      this._postOrderTraversal(node.right);
      console.log(node.value);
    }
  }
}

// Main Menu
function mainMenu() {
  const tree = new Tree();
  while (true) {
    console.log("\n--- Tree Operations Menu ---");
    console.log("1. Add a value to the tree");
    console.log("2. Search for a value in the tree");
    console.log("3. Display the tree");
    console.log("4. Exit");

    try {
      let choice = prompt("Enter your choice (1-4): ") ?? "";

      if (choice === "1") {
        tree.add();
      } else if (choice === "2") {
        tree.search();
      } else if (choice === "3") {
        tree.display();
      } else if (choice === "4") {
        console.log("Exiting the program. Goodbye!");
        process.exit(0);  // Exit the program gracefully
      } else {
        console.log("Invalid choice. Please enter a number between 1 and 4.");
      }
    } catch (error) {
      console.log(`An error occurred: ${error}. Please try again.`);
    }
  }
}

mainMenu();
