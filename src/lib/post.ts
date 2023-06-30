/*
 * @Author: wangzhisen
 * @Date: 2023-06-30 10:16:29
 * @Last Modified by: wangzhisen
 * @Last Modified time: 2023-06-30 17:12:31
 */
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import matter from "gray-matter";
import { readFileSync } from "fs";
import { remark } from "remark";
import html from "remark-html";

interface PostNode {
  name: string;
  tagLevel: number;
  uuid: string;
  children: PostNode[] | null;
  dir: string; // 路径名
  isPostType: boolean; // 判断是不是文章
  info: PostArticle | null; // 文章内容
}

export interface PostArticle {
  title: string;
  uuid: string;
  tags: string[];
  content: string;
  date: string;
}

export type FlatNode = Omit<PostNode, "children">;

/**
 * 获取单篇文章的信息
 */
const getArticleInfo = async (
  fullPath: string,
  uid: string
): Promise<PostArticle> => {
  try {
    const fileContents = readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
    const { data, content } = matterResult ?? {};
    return {
      uuid: uid,
      title: data?.data ?? "",
      tags: [],
      content:contentHtml,
      date: data?.date ?? "",
    };
  } catch {
    return {
      uuid: uid,
      title: "",
      tags: [],
      content: "",
      date: "",
    };
  }
};

/**
 *
 * @param dir
 * @param level
 * @returns
 *
 * 获取文件路径的树形结构
 */
async function getAllPost(dir: string, level = 0): Promise<PostNode[]> {
  const items = await fs.readdir(dir, { withFileTypes: true });

  const posts: PostNode[] = [];

  for (const item of items) {
    const itemPath = path.join(dir, item.name);
    const isDirectory = item.isDirectory();

    if (isDirectory || itemPath.endsWith(".md")) {
      const uuid = uuidv4();
      const post: PostNode = {
        name: isDirectory ? item.name : path.parse(itemPath).name,
        tagLevel: level,
        uuid: uuid,
        isPostType: !isDirectory,
        dir: itemPath,
        children: isDirectory ? await getAllPost(itemPath, level + 1) : null,
        info: isDirectory ? null : await getArticleInfo(itemPath, uuid),
      };

      posts.push(post);
    }
  }

  return posts;
}

/**
 *
 * @param posts
 * @returns
 * 拍平树形结构
 */
function flatPosts(posts: PostNode[]): FlatNode[] {
  const flatArray: FlatNode[] = [];

  function flatten(post: PostNode) {
    const { name, tagLevel, uuid, isPostType, dir, info, children } = post;

    flatArray.push({ name, tagLevel, uuid, isPostType, dir, info });

    if (children) {
      for (const child of children) {
        flatten(child);
      }
    }
  }

  for (const post of posts) {
    flatten(post);
  }

  return flatArray;
}

/**
 * 获取所有已发布文章
 * @returns
 */
export const getPosts = async () => {
  const postsDirectory = path.resolve(process.cwd(), "posts");
  try {
    const data = await getAllPost(postsDirectory);
    const posts = flatPosts(data ?? []).filter((item) => item.isPostType);
    return posts;
  } catch {
    return [];
  }
};

function filterTagsTree(posts: PostNode[]): PostNode[] {
  return posts
    .filter((post) => !post.isPostType && post.children?.length)
    .map((post) => {
      post.children = filterTagsTree(post.children || []);
      return post;
    });
}

/**
 *
 * @param posts
 * @returns
 * 获取所有层级的话题
 */
export async function getTagsTree(): Promise<PostNode[]> {
  const postsDirectory = path.resolve(process.cwd(), "posts");
  try {
    const data = await getAllPost(postsDirectory);
    const tags = filterTagsTree(data);
    return tags;
  } catch {
    return [];
  }
}

/**
 * 通过title查询对应的数据
 */

export const getPost = async (title: string): Promise<FlatNode | null> => {
  const allPosts = await getPosts();
  const post = allPosts.find((item) => item.name === title);

  if (post) {
    return post
  }
  return null;
};
