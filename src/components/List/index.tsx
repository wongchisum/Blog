import styles from './index.module.scss'
import {PostArticle} from '@/lib/post'
import {useRouter} from 'next/router'
import Article from '../Article'

type ListItem = {
    name:string // 姓名
    dir:string // 路径
    content:string // 内容
    date:string // 日期
    uuid:string // 唯一标识
    info:PostArticle
} 

type ListProps = {
    data:ListItem[]
}

export default function List({data=[]}:ListProps) {
    const router = useRouter()

    const handleGoPost = (name:string) => {
        router.push(`/post/${name}`)
    }

    return (
        <div className={styles.list}>
            {
                data.map((item) => {
                    return (
                        // <div  className={styles.listItem} key={uuid} onClick={() => handleGoPost(name)}>
                        //     <div className={styles.title}>{name}</div>
                        //     <div className={`${styles.content} article-content`  }>{info.content}</div>
                        //     <div className={styles.footer}>
                        //     <div className={styles.date}>{info?.date}</div>
                        //     <div className={styles.tags}>{info?.tags}</div>
                        //     </div>
                        // </div>
                        <div onClick={() => handleGoPost(item.name)} key={item.uuid} >
                            <Article data={item} />
                        </div>
                        
                    )
                })
            }
        </div>
    )
}