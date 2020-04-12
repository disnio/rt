// 二叉树树的一条边可能非常深，会有性能问题。AVL树是一种自平衡二叉搜索树，
// 任何一个节点左右两侧子树的高度之差最多为一。也就是说在添加移除节点时，
// 会试着成为一颗完全树。

class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // 插入节点
  insert(key) {
    let newNode = new Node(key);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  printNode(value) {
    console.log(value);
  }

  // 中序遍历是一种以上行顺序访问 bst 所有节点的遍历方式，也是从最小到最大的顺序访问所有节点。
  inOrderTraverseNode(node, callback) {
    // 终止条件，节点为null
    if (node !== null) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback);
    }
  }

  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }

  // 先序遍历是以优先于后代节点的顺序访问每个节点，应用：打印结构化的文档
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }

  preOrderTraverseNode(node, callback) {
    if (node !== null) {
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }

  // 先访问后代节点，再访问节点本身，应用：计算目录和子目录中所有文件占用空间大小
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }

  postOrderTraverseNode(node, callback) {
    if (node !== null) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }

  // 最小值
  min() {
    return this.minNode(this.root);
  }

  minNode(node) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left;
      }

      return node.key;
    }
    return null;
  }

  // 最大值
  max() {
    return this.maxNode(this.root);
  }

  maxNode(node) {
    if (node) {
      while (node && node.left !== null) {
        node = node.right;
      }

      return node.key;
    }
    return null;
  }
  // 搜索节点值
  search(key) {
    return this.searchNode(this.root, key);
  }

  searchNode(node, key) {
    if (node === null) {
      return false;
    }

    if (key < node.left) {
      return this.searchNode(node.left, key);
    } else if (key > node.key) {
      return this.searchNode(node.right, key);
    } else {
      return true;
    }
  }

  findMinNode(node) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left;
      }

      return node;
    } else {
      return null;
    }
  }
  // 删除节点值
  remove(key) {
    this.root = this.removeNode(this.root, key);
  }

  removeNode(node, key) {
    if (node === null) {
      return null;
    }

    if (key < node.key) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (key > node.key) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      // 键等于 node.key
      // 一个叶子节点
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      // 只有一个子节点
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      // 移除有两个子节点的节点，找到了需要移除的节点后，需要找到它右子树中最小的节点
      // 然后用它右子树中最小节点的键更新这个节点的值。
      // 把右子树中最小的节点移除，然后向它的父节点返回更新后节点的引用。

      console.log("node:", node)
      let aux = this.findMinNode(node.right);
      console.log(aux)
      node.key = aux.key;
      node.right = this.removeNode(node.right, aux.key);
      return node;
    }
  }
  
}

var t = new BinarySearchTree();
t.insert(11);
t.insert(7);
t.insert(15);
t.insert(5);
t.insert(3);
t.insert(9);
t.insert(8);
t.insert(10);
t.insert(13);
t.insert(12);
t.insert(14);
t.insert(20);
t.insert(18);
t.insert(25);
t.insert(6);

t.remove(15);
console.log("bst:", t);
