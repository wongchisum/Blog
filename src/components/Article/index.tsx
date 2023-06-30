import { FlatNode } from "@/lib/post";
import styles from "./index.module.scss";

type PostProps = {
  data: FlatNode | null;
};

export default function Article({ data }: PostProps) {
  return (
    <div className={styles.post}>
      {data && (
        <div className={`${styles.postBody} article-content`}>
          <div className={styles.title}>{data.name}</div>
          <div className={styles.info}>
            <div>{data.info?.date}</div>
            <div>{data.info?.tags}</div>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: data.info?.content }}
            className={styles.container}
          ></div>
        </div>
      )}
    </div>
  );
}
