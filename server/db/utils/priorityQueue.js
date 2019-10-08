
function Node(data) {
  this.data = data;
  this.next = null;
}

function PriorityQueue() {
  this._length = 0;
  this.head = null;
}




module.exports = { Node, PriorityQueue };
