'use client'
import React from 'react'
import { useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header>
      <a className="logo" href="/" title="KIA BIZ">
        <img src="/images/logo_kiabiz.svg" alt="로고 이미지" />
      </a>
      <nav>
        <ul>
          <li>
            <a href="https://wiblebiz.kia.com/Guide" target="_blank">
              서비스 소개
            </a>
          </li>
          <li className="active">
            <a href="https://wiblebiz.kia.com/FAQ">자주 묻는 질문</a>
          </li>
          <li>
            <a href="https://wiblebiz.kia.com/News" target="_blank">
              새소식
            </a>
          </li>
          <li>
            <a href="https://wiblebiz.kia.com/Counsel" target="_blank">
              상담문의
            </a>
          </li>
        </ul>
      </nav>
      <div className="sm-menu-box">
        <button
          type="button"
          onClick={() => {
            setOpen(!open)
            document.body.classList.toggle('open')
          }}
        >
          메뉴 버튼
        </button>
      </div>
    </header>
  )
}
