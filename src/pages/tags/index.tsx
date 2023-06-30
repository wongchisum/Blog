/*
 * @Author: wangzhisen
 * @Date: 2023-06-29 18:34:11
 * @Last Modified by: wangzhisen
 * @Last Modified time: 2023-06-30 13:44:05
 *
 * 展示所有标签
 */
// import { getTagsTree, TreeNode } from "../../../scripts/getTagsTree";
import Layout from "@/components/Layout";
import { getTagsTree } from "@/lib/post";
import styles from './index.module.scss';

export async function getStaticProps() {
  const tags = await getTagsTree();

  return {
    props: {
      tags,
    },
  };
}

type TagItem = {
  name: string;
  uuid: string;
  children: TagItem[];
};

type TagsProps = {
  data: TagItem[];
};

const TagsTree = ({ data }: TagsProps) => {
  if (Array.isArray(data)) {
    return data.map((item) => {
      if (Array.isArray(item.children)) {
        return (
          <div className={styles.tagTree} key={item.uuid}>
            <div key={item.uuid} className={styles.name}>{item.name}</div>
            <div className={styles.children}>
              <TagsTree data={item.children} />
            </div>
          </div>
        );
      }
      return <div key={item.uuid}>{item.name}</div>;
    });
  }
};

export default function Tags({ tags }: any) {
  return (
    <Layout>
      <div className={styles.tags}>
        <TagsTree data={tags} />
      </div>
    </Layout>
  );
}
