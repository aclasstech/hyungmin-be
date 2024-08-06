export type TreeNode<T = any> = T & {
  id: string | number;
  parentId: string | number;
  children?: TreeNode<T>[];
};

export type ListNode<T extends object = any> = T & {
  id: string | number;
  parentId: string | number;
};

export function list2Tree<T extends ListNode[]>(
  items: T,
  parentId: string | number | null = null
): TreeNode<T[any]>[] {
  return items
    .filter((item) => item.parentId === parentId)
    .map((item) => {
      const children = list2Tree(items, item.id);
      return {
        ...item,
        ...(children.length ? { children } : null),
      };
    });
}

/**
 * Chuyển đổi kiểu tree thành list
 * @param treeData
 * @param key Các trường cần chuyển đổi
 * @param value Các giá trị được sử dụng để chuyển đổi
 */
export function filterTree2List(treeData: any, key: any, value: any) {
  const filterChildrenTree = (resTree: any, treeItem: any) => {
    if (treeItem[key].includes(value)) {
      resTree.push(treeItem);
      return resTree;
    }
    if (Array.isArray(treeItem.children)) {
      const children = treeItem.children.reduce(filterChildrenTree, []);

      const data = { ...treeItem, children };

      if (children.length) resTree.push({ ...data });
    }
    return resTree;
  };
  return treeData.reduce(filterChildrenTree, []);
}

/**
 * Chuyển đổi và giữ nguyên form dữ liệu
 * @param treeData
 * @param predicate
 */
export function filterTree<T extends TreeNode>(
  treeData: TreeNode<T>[],
  predicate: (data: T) => boolean
): TreeNode<T>[] {
  function filter(treeData: TreeNode<T>[]): TreeNode<T>[] {
    if (!treeData?.length) return treeData;

    return treeData.filter((data) => {
      if (!predicate(data)) return false;

      data.children = filter(data.children);
      return true;
    });
  }

  return filter(treeData) || [];
}

export function deleteEmptyChildren(arr: any) {
  arr?.forEach((node: any) => {
    if (node.children?.length === 0) delete node.children;
    else deleteEmptyChildren(node.children);
  });
}
