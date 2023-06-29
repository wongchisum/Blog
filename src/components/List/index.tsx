import styles from './index.module.scss'

type ListItem = {
    name:string // 姓名
    content:string // 内容
    date:string // 日期
    id:string // 唯一标识
    tags:string[] // 分类
} 

type ListProps = {
    data:ListItem[]
}

export default function List({data=[]}:ListProps) {
    return (
        <div className={styles.list}>
            {
                data.map(({name,content,date,id,tags}) => {
                    return (
                        <div key={id} className={styles.listItem}>
                            <div className={styles.title}>{name}</div>
                            <div className={styles.content}>{content}</div>
                            <div className={styles.footer}>
                            <div className={styles.date}>{date}</div>
                            <div className={styles.tags}>{tags}</div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}