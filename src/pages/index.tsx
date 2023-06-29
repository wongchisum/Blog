/*
 * @Author: wangzhisen
 * @Date: 2023-06-29 16:41:54
 * @Last Modified by: wangzhisen
 * @Last Modified time: 2023-06-29 17:08:44
 *
 * 入口文件
 */
import { readPosts, MarkdownFile } from "../../scripts/readPosts";
import Layout from "@/components/Layout";
import List from "@/components/List";

export async function getStaticProps() {
  const posts = await readPosts();
  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }: { posts: MarkdownFile[] }) {
  return (
    <Layout>
      <List data={posts} />
    </Layout>
  );
}
