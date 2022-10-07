import { formatCompleteDate, formatDateDistanceFromNow } from '../herpers'

import { ThumbsUp, Trash } from 'phosphor-react'
import { Avatar } from './Avatar'

import styles from './Comment.module.css'
import { useState } from 'react'

interface CommentObject {
    commentDate: Date;
    commentContent: string;
}

interface CommentProps {
    key: string;
    content: CommentObject;
    onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
    const [likeCount, setLikeCount] = useState(0)
    
    function handleLikeComment() {
        setLikeCount((state) => {
            return state + 1
        })
    }

    function handleDeleteComment() {
        onDeleteComment(content.commentContent)
    }

    const publishedDateFormatted = formatCompleteDate(content.commentDate)
    const publishedDateRelativeToNow = formatDateDistanceFromNow(content.commentDate, {hasSuffix: true})

    return (
        <div className={styles.comment}>
            <Avatar
                src="https://github.com/diego3g.png"
            />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Diego Fernandes</strong>

                            <time 
                                title={publishedDateFormatted} dateTime={content.commentDate.toISOString()}
                            >
                                {publishedDateRelativeToNow}
                            </time>
                        </div>

                        <button onClick={handleDeleteComment} title='Deletar comentário'>
                            <Trash size={24} />
                        </button>
                    </header> 

                    <p>{content.commentContent}</p>
                </div>

                <footer>
                    <button onClick={handleLikeComment}>    
                        <ThumbsUp size={20} />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}