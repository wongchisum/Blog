/*
 * @Author: wangzhisen
 * @Date: 2023-06-29 16:41:54
 * @Last Modified by: wangzhisen
 * @Last Modified time: 2023-06-30 15:14:18
 *
 * 入口文件
 */
import { readPosts, MarkdownFile } from "../../scripts/readPosts";
import {getPosts} from '@/lib/post'
import Layout from "@/components/Layout";
import List from "@/components/List";

export async function getStaticProps() {
  const posts = await getPosts();
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
