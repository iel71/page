import Footer from '@/components/Footer.jsx'
import Header from '@/components/Header.jsx'
import ScrollButton from '@/components/ScrollButton.jsx'
import FaqClient from '../components/FaqClient.jsx'

export default function Home() {
  return (
    <div id="root">
      <div className="wrapper">
        {/* 해더 */}
        <Header />

        {/* 컨테이너 */}
        <div className="container-area">
          <div className="content">
            <h1>
              자주 묻는 질문 <p>궁금하신 내용을 빠르게 찾아보세요.</p>
            </h1>

            {/* 문의 리스트 컴포넌트 */}
            <FaqClient />

            {/* 서비스 문의 */}
            <h2>서비스 문의</h2>

            <div className="inquiry-area">
              <a
                className="btn-tertiary"
                href="/proposal.pdf"
                download="기아 비즈 서비스 제안서"
              >
                <img src="/images/icon_download.svg" alt="다운로드 아이콘" />
                <span>서비스 제안서 다운로드</span>
              </a>
              <a
                className=" btn-tertiary"
                href="https://wiblebiz.kia.com/Counsel"
                target={'_blank'}
              >
                <img src="/images/icon_write.svg" alt="등록하기 아이콘" />
                <span>상담문의 등록하기</span>
              </a>
              <a
                className="btn-tertiary"
                href="https://pf.kakao.com/_xfLxjdb"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src="/images/icon_talk.svg" alt="카톡 아이콘" />
                <span>
                  카톡으로 문의하기 <em>ID: Wible Biz(위블 비즈)</em>
                </span>
              </a>
            </div>

            {/* 이용 프로세스 안내 */}
            <h2>이용 프로세스 안내</h2>

            <ol className="process-area">
              <li>
                <img src="/images/icon_process01.svg" alt="문의 등록 아이콘" />
                <div>
                  <strong>1. 문의 등록</strong>
                  <em>
                    상담 문의를 등록해 주시면, 담당자가 맞춤형 상담을
                    제공합니다.
                  </em>
                </div>
              </li>
              <li>
                <img
                  src="/images/icon_process02.svg"
                  alt="관리자 설정 아이콘"
                />
                <div>
                  <strong>2. 관리자 설정</strong>
                  <em>관리자 Web 접속 후 결제방식 및 회사정보를 설정합니다.</em>
                </div>
              </li>
              <li>
                <img
                  src="/images/icon_process03.svg"
                  alt="임직원 가입 아이콘"
                />
                <div>
                  <strong>3. 임직원 가입</strong>
                  <em>
                    사용자 App에서 회원가입 후 소속 회사 인증을 진행합니다.
                  </em>
                </div>
              </li>
              <li>
                <img
                  src="/images/icon_process04.svg"
                  alt="서비스 이용 아이콘"
                />
                <div>
                  <strong>4. 서비스 이용</strong>
                  <em>
                    사용자 App에서 차량 예약을 하고 위블존에서 바로 이용하세요!
                  </em>
                </div>
              </li>
            </ol>

            {/* 어플 안내 */}
            <div className="app-area">
              <h2>
                <em>위블 비즈 App</em> 지금 만나보세요!
              </h2>
              <a
                href="https://play.google.com/store/apps/details?id=kor.mop.user.app"
                target="_blank"
                className="gp"
                rel="noreferrer noopener"
              >
                <img src="/images/logo_googleplay.svg" alt="구글 아이콘" />
                Google Play
              </a>
              <a
                href="https://apps.apple.com/kr/app/%EC%9C%84%EB%B8%94-%EB%B9%84%EC%A6%88/id1598065794"
                target="_blank"
                className="as"
                rel="noreferrer noopener"
              >
                <img src="/images/logo_appstore.svg" alt="앰 스토어 아이콘" />
                App Store
              </a>
            </div>
          </div>

          {/* 위로가기 버튼 */}
          <ScrollButton />
        </div>

        {/* 푸터 */}
        <Footer />
      </div>
    </div>
  )
}
