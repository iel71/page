import FaqClient from '../components/FaqClient.jsx'

export default function Home() {
  return (
    <div id="root">
      <div className="wrapper">
        <header>
          <a className="logo" href="/" title="Wible BIZ">
            <img src="/images/logo.svg" alt="로고 이미지" />
          </a>

          <nav>
            <ul>
              <li>
                <a href="https://wiblebiz.kia.com/Guide">서비스 소개</a>
              </li>
              <li className="active">
                <a href="https://wiblebiz.kia.com/FAQ">자주 묻는 질문</a>
              </li>
              <li>
                <a href="/https://wiblebiz.kia.com/News">새소식</a>
              </li>
              <li>
                <a href="https://wiblebiz.kia.com/Counsel">상담문의</a>
              </li>
            </ul>
          </nav>
        </header>
        <div className="container">
          <div className="content">
            <h1>
              자주 묻는 질문 <p>궁금하신 내용을 빠르게 찾아보세요.</p>
            </h1>
            <FaqClient />
          </div>
        </div>
      </div>
    </div>
  )
}
