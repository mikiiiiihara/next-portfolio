//このアプリ（サイト）のトップレベルのファイルで、アプリ全体で適用させたい設定やスタイルなどをここに書く
import '../styles/all.scss'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
