'use client'
import { useState, useEffect, useRef } from 'react'
import { getFaqByTab, getDataBySubTab } from '../api/tab'

export default function FaqClient() {
  const [tab, setTab] = useState('CONSULT')
  const [subTabName, setSubTabName] = useState('전체')
  const [tabData, setTabData] = useState([])
  const [subTabData, setSubTabData] = useState({})
  const [input, setInput] = useState('')

  const [openIndex, setOpenIndex] = useState(null)

  const tabDataFn = (tab) => {
    setTab(tab)
    getFaqByTab(tab).then((res) => {
      setTabData(res)
      setSubTabName('전체')
      console.log('Fetched getFaqByTab data!!', res)
    })
  }
  const subTabDataFn = (tab, tabItem) => {
    console.log(',,', tab, tabItem)
    setSubTabName(tabItem)
    getDataBySubTab(tab, tabItem).then((res) => {
      setSubTabData(res)

      console.log('Fetched getDataBySubTab data!!', res)
    })
  }

  const inputHandler = (e) => {
    setInput(e.target.value)
  }

  const toggleHandler = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      tabDataFn('CONSULT')
      subTabDataFn('CONSULT', '전체')
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* 메인 탭 UI */}
      <ul className="tab-menu">
        <li className={tab === 'CONSULT' ? 'active' : ''}>
          <button
            onClick={() => {
              tabDataFn('CONSULT')
              subTabDataFn('CONSULT', '전체')
            }}
          >
            서비스 도입
          </button>
        </li>
        <li className={tab === 'USAGE' ? 'active' : ''}>
          <button
            onClick={() => {
              tabDataFn('USAGE')
              subTabDataFn('USAGE', '전체')
            }}
          >
            서비스 이용
          </button>
        </li>
      </ul>

      {/* 검색 UI */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <div className="input-area">
          <div>
            <input
              type="text"
              placeholder="찾으시는 내용을 입력해 주세요"
              value={input}
              onChange={inputHandler}
            />
            <button>
              검색
              <img src="/images/icon_search.svg" alt="검색 아이콘 이미지" />
            </button>
          </div>
        </div>
      </form>
      <div className="data-info">
        <h2>
          검색결과 총<strong>{subTabData?.items?.length || 0}</strong>건
        </h2>
        <button className="reset">
          <img src="/images/icon_reset.svg" alt="리셋 아이콘 이미지" />
          검색초기화
        </button>
      </div>

      {/* 서브 탭 UI */}
      <div className="sub-tab-list">
        <ul className="sub-tab-list-item">
          <li className={subTabName === '전체' ? 'active' : ''}>
            <button
              onClick={() => {
                subTabDataFn(tab, '전체')
              }}
            >
              전체
            </button>
          </li>
          {tabData?.map((item) => (
            <li
              key={item.categoryID}
              className={subTabName === item.name ? 'active' : ''}
            >
              <button onClick={() => subTabDataFn(tab, item.name)}>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
        <ul className="sub-tab-data">
          {subTabData?.items?.map((item, index) => (
            <li key={item.id} onClick={() => toggleHandler(index)}>
              <div
                className={`toggle-area ${openIndex === index ? 'active' : ''}`}
              >
                <span>
                  {tab == 'CONSULT' ? item.subCategoryName : item.categoryName}
                </span>
                {tab == 'USAGE' && <span>{item.subCategoryName}</span>}
                <strong>{item.question}</strong>
                <img src="/images/icon_arrow.svg" alt="화살표 아이콘 이미지" />
              </div>
              {openIndex === index && (
                <div
                  className={`toggle-text ${openIndex === index ? 'open' : ''}`}
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                ></div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
