//ファイル名の[]は汎用ファイルであることを示している
import Image from 'next/image'
import matter from "gray-matter"
//frontmatter以外の部分（content）も表示したいため、react-markdownも使用する必要がある
import ReactMarkdown from "react-markdown"
import Layout from "../../components/layout"
import  * as style from "../../styles/singleBlog.module.scss"

const SingleBlog = (props) => {
    return (
      <Layout>
          <div className={style.hero}>
              <Image src={props.frontmatter.image} alt="blog-image" height="500" width="1000" />
          </div>
          <div className={style.wrapper}>  
              <div>               
                  <h1>{props.frontmatter.title}</h1>
                  <p>{props.frontmatter.date}</p> 
                  <ReactMarkdown children={props.markdownBody} />
              </div> 
          </div>
      </Layout>
      )
    }

export default SingleBlog

export async function getStaticPaths() {

    const blogSlugs = ((context) => {
        const keys = context.keys()
        const data = keys.map((key, index) => {
          let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
        return slug
    })
    return data
    })(require.context('../../data', true, /\.md$/))

    const paths = blogSlugs.map((blogSlug) => `/blog/${blogSlug}`)

    return {
        paths: paths,
        //pathsに入っているslug以外のパス名に対しては404ページを表示するため、falseを代入
        fallback:false,
    }
}

//mdファイルを、ひな形ファイル内に読み込む
export async function getStaticProps(context) {
    const { slug } = context.params
    const data = await import(`../../data/${slug}.md`)
    const singleDocument = matter(data.default)

    return {
        props: {
            frontmatter: singleDocument.data,
            markdownBody: singleDocument.content,
        }
    }
}