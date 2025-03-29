'use client'
import React from 'react'

export default function Footer() {
  return (
    <footer>
      <div className="footer-area">
        <div className="information">
          <div className="link">
            <button type="button">
              <b>개인정보 처리방침</b>
            </button>
            <button type="button">이용약관</button>
          </div>
          <address>
            <span>
              서울특별시 서초구 헌릉로 12 <em>기아㈜</em>
            </span>
            <br />
            <span>
              대표: <i>송호성, 최준영</i>
            </span>
            <br />
            <span>
              사업자등록번호: <i>119-81-02316</i>
            </span>
            <br />
            <span>
              통신판매번호: <i>2006-07935</i>
            </span>
            <br />
            <span>
              고객센터: <i>1833-4964</i>
            </span>
            <br />
            <span>
              제휴문의:
              <a href="mailto:wible.biz@kia.com">wible.biz@kia.com</a>
            </span>
          </address>
        </div>
        <p className="copyright">
          <img src="/images/logo_kia.svg" alt="기아 로고 이미지" />© 2023 KIA
          CORP. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
