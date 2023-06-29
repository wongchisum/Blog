/*
 * @Author: wangzhisen
 * @Date: 2023-06-29 18:34:11
 * @Last Modified by: wangzhisen
 * @Last Modified time: 2023-06-29 19:18:21
 *
 * 展示所有标签
 */
import { getTagsTree, TreeNode } from "../../../scripts/getTagsTree";
import Layout from "@/components/Layout";

export async function getStaticProps() {
  const tags = await getTagsTree();

  return {
    props: {
      tags,
    },
  };
}

type TagsProps = {
  tags: TreeNode[];
};

type TagProps = {
    data:TreeNode
}

const TagNode = ({name}:{name:string}) => {
    console.log("name>>",name)
    return <div>{name}</div>
}

const TagTree = ({data}:TagProps[]) => {
    return data.map((item) => {
        console.log("item>>",item)
        if (item.children && item.children.length) {
            return (
                <>
                <TagNode {...item}/>
                <TagTree data={item.children}/>
                </>
            )
        } else {
            return <TagNode {...item}/>
        }
    })
    
}

export default function Tags({ tags }: TagsProps) {
  return <Layout>
    <div>{JSON.stringify(tags, null, 4)}</div>
    {
        Array.isArray(tags) && <TagTree  data={tags}/>
    }
    </Layout>;
}
