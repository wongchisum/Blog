/*
 * @Author: wangzhisen
 * @Date: 2023-06-29 16:36:38
 * @Last Modified by: wangzhisen
 * @Last Modified time: 2023-06-29 19:09:59
 *
 * 根据 /posts 目录文件夹的层级关系，生成对应的树形结构数据
 */

import fs from "fs/promises";
import path from "path";

export interface TreeNode {
  name: string;
  children: TreeNode[];
}

async function getTreeByDir(dir: string): Promise<TreeNode[]> {
  const tree: TreeNode = { name: path.basename(dir), children: [] };

  try {
    const files = await fs.readdir(dir, { withFileTypes: true });

    const promises = files.map(async (file) => {
      const filePath = path.join(dir, file.name);

      if (file.isDirectory()) {
        const childTree = await getTreeByDir(filePath);
        tree.children.push(childTree);
      }
    });

    await Promise.all(promises);
  } catch (err) {
    console.error(`读取目录时发生错误：${err}`);
  }

  return [tree];
}

/**
 * 获取树状结构的所有主题
 */
export  const getTagsTree = async() => {
  const targetDir = path.join(process.cwd(), "posts"); // 替换为你的目录路径
    try {
      const data = await getTreeByDir(targetDir)
      return data;
    } catch(error) {
      console.error(`生成树状结构时发生错误：${error}`)
      return []
    }
};
