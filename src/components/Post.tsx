import { ChangeEvent, FormEvent, useState } from 'react'

import { formatCompleteDate, formatDateDistanceFromNow } from '../herpers'

import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content {
    type: 'paragraph' | 'link';
    content: string
}

export interface PostProps {
    author: Author;
    publishedAt: Date;
    content: Content[];
}

export function Post({ author, publishedAt, content }: PostProps) {
    const [comments, setComments] = useState([
        {commentDate: new Date(), commentContent: 'Pra cima, Lauro! O projeto ficou muito bom. Vamos codar?! 💻'},
    ])

    const [newCommentText, setNewCommentText] = useState('')

    const publishedDateFormatted = formatCompleteDate(publishedAt)
    const publishedDateRelativeToNow = formatDateDistanceFromNow(publishedAt, {hasSuffix:true})

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault()

        setComments([...comments, {commentDate: new Date(), commentContent: newCommentText}])
        setNewCommentText('')
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setNewCommentText(event.target.value)
    }

    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment.commentContent !== commentToDelete
        })

        setComments(commentsWithoutDeletedOne)
    }

    const isNewCommentEmpty = newCommentText.length === 0 

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar
                        hasBorder
                        src={author.avatarUrl}
                    />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time 
                    title={publishedDateFormatted}
                    dateTime={publishedAt.toISOString()}
                >
                        {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {
                    content.map(line => {
                        switch (line.type) {
                            case 'paragraph':
                                return <p key={line.content}>{line.content}</p>
                            case 'link':
                                return <p key={line.content}><a href=''>{line.content}</a></p>
                        }
                    })
                }
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea
                    placeholder='Deixe seu comentário'
                    name='comment'
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                />
                <footer>
                    <button
                        type='submit'
                        disabled={isNewCommentEmpty}
                    >
                        Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment 
                            key={comment.commentContent} 
                            content={comment} 
                            onDeleteComment={deleteComment} 
                        />
                    )
                })}
            </div>
        </article>
    )
}