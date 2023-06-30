import Layout from "@/components/Layout";
import styles from "./index.module.scss";
import { GetServerSideProps } from "next";
import { getPost, FlatNode } from "@/lib/post";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const post = await getPost(context.params?.id as string);
  return {
    props: {
      data: post,
    },
  };
};

type PostProps = {
  data: FlatNode | null;
};

export default function Post({ data }: PostProps) {
  return (
    <Layout>
      <div className={styles.post}>
        {data && (
          <div className={`${styles.postBody} article-content`}>
            <div className={styles.title}>{data.name}</div>
            <div className={styles.info}>
            <div>{data.info?.date}</div>
            <div>{data.info?.tags}</div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: data.info?.content }} className={styles.container}></div>
          </div>
        )}
      </div>
    </Layout>
  );
}
