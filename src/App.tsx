import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { Post, PostProps } from "./components/Post"

import styles from './App.module.css'
import './global.css'

interface Post extends PostProps {
  id: number
}

const posts: Post[] = [
  {
    id: 1,
    author: {
      name: "Lauro Almeida",
      avatarUrl: "https://github.com/lauro-almeida.png",
      role: "Web Developer @Imobelix"
    },
    content: [
      { type: 'paragraph', content: 'Fala, galera!'},
      { type: 'paragraph', content: 'Acabo de terminar o primeiro módulo do bootcamp Ignite da Rocketseat. Durante as aulas desenvolvemos um feed usando react e o resultado ficou incrível.🚀'},
      { type: 'paragraph', content: 'Apesar de ser um módulo introdutório, já pratiquei alguns conceitos fundamentais no ambiente react, como por exemplo: componentes, propriedades, estado, imutabilidade, programação declarativa, entre outros.'},
      { type: 'paragraph', content: 'Tecnologias utilizadas:'},
      { type: 'link', content: '#ReactJS'},
      { type: 'link', content: '#TypeScript'},
      { type: 'link', content: '#HTML'},
      { type: 'link', content: '#CSS'},
    ],
    publishedAt: new Date('2022-09-29 09:21:00')
  },
  // {
  //   id: 2,
  //   author: {
  //     name: "Diego Fernandes",
  //     avatarUrl: "https://github.com/diego3g.png",
  //     role: "CTO @Rocketseat"
  //   },
  //   content: [
  //     { type: 'paragraph', content: 'Fala galeraa 👋'},
  //     { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
  //     { type: 'link', content: 'jane.design/doctorcare'},
  //   ],
  //   publishedAt: new Date('2022-09-25 20:00:00')
  // },
]

interface Content {
  type: 'paragraph' | 'link';
  content: string
}

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id} 
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}

