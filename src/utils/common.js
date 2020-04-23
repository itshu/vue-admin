/**
 * Created by jiachenpan on 16/11/18.
 */

export function getCascaderObj(val,opt) {
  let labels = '';
  val.map(function (value, index, array) {
    for (var itm of opt) {
      if (itm.value == value) {
        opt = itm.children;
        labels+=itm.label + "/";
      }
    }
  });
  return labels.substring(0,labels.length-1);
}



export function getCascaderSum(treeList,cabin) {
  // for (var i in treeList) {
  //   // console.log('i',i);
  //   // console.log('datai',treeList[i].children);
  //   if (treeList[i].name == cabin) {
  //     // console.log(treeList[i]);
  //     return treeList[i]
  //   } else {
  //     return getCascaderSum(treeList[i].children, cabin);
  //   }
  // }
  let stack = [];
  for (var i in treeList) {
    stack.push(treeList[i]);
  }
  let tmpNode;
  while (stack.length > 0) {
    tmpNode = stack.pop();
    // console.log(tmpNode)
    if (tmpNode.name == cabin) {
      return tmpNode
    }
    if (tmpNode.children && tmpNode.children.length > 0) {
      let i = tmpNode.children.length - 1;
      for (i = tmpNode.children.length - 1; i >= 0; i--) {
        stack.push(tmpNode.children[i]);
      }
    }
  }
}

export function getTreeCabin(treeList) {
  let result = []
  let stack = [];
  stack.push(treeList);
  let tmpNode;
  while (stack.length > 0) {
    tmpNode = stack.pop();
    // console.log(tmpNode)
    if (!tmpNode) {
     continue
    }
    result.push(tmpNode.name)
    if (tmpNode.children && tmpNode.children.length > 0) {
      let i = tmpNode.children.length - 1;
      for (i = tmpNode.children.length - 1; i >= 0; i--) {
        stack.push(tmpNode.children[i]);
      }
    }
  }
  // console.log(result)
  return result
}
