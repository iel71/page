'use client'
import { useState, useEffect, useRef } from 'react'
import { getFaqByTab, getDataBySubTab } from '../api/tab'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion'
import Modal from './Modal'
export default function FaqClient() {
  const [tab, setTab] = useState('CONSULT')
  const [subTabName, setSubTabName] = useState('전체')
  const [tabData, setTabData] = useState([])
  const [subTabData, setSubTabData] = useState({})
  const [input, setInput] = useState('')
  const [searchInfo, setSearchInfo] = useState(false)

  const [openIndex, setOpenIndex] = useState(null)
  const [modal, setModal] = useState(false)

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
  const resetHandler = () => {
    setInput('')
    setSearchInfo(false)
  }

  const searchHandler = () => {
    if (input.length === 0) {
      return
    }
    if (input.length === 1) {
      setSearchInfo(false)
      setModal(true)
      return
    }

    // if (input.length === 1) {
    //   setErrorText(true)
    //   return
    // }
    // setOffset(0)
    // setIsNext(false)
    setSearchInfo(true)
    // setFaqList([])
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
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  searchHandler()
                }
              }}
            />

            <button onClick={searchHandler}>
              검색
              <img src="/images/icon_search.svg" alt="검색 아이콘 이미지" />
            </button>
          </div>
        </div>
      </form>

      {searchInfo && (
        <div className="data-info">
          <p>
            검색결과 총 <strong>{subTabData?.items?.length || 0}</strong>건
          </p>
          <button className="reset" onClick={resetHandler}>
            <img src="/images/icon_reset.svg" alt="리셋 아이콘 이미지" />
            검색초기화
          </button>
        </div>
      )}

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

        <Accordion type="single" collapsible className="sub-tab-data">
          {subTabData && subTabData.items && subTabData.items.length === 0 ? (
            <div className="no-data">
              <img
                src="/images/icon_nodata.svg"
                alt="데이터 없음 아이콘 이미지"
              />
              검색결과가 없습니다.
            </div>
          ) : (
            subTabData?.items?.map((item, index) => (
              <AccordionItem
                value={item.id}
                className="toggle-area"
                key={index}
              >
                <AccordionTrigger>
                  <div
                    className={`toggle-area ${
                      openIndex === index ? 'active' : ''
                    }`}
                  >
                    <span>
                      {tab == 'CONSULT'
                        ? item.subCategoryName
                        : item.categoryName}
                    </span>
                    {tab == 'USAGE' && <span>{item.subCategoryName}</span>}
                    <strong>{item.question}</strong>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div
                    className={`toggle-text ${
                      openIndex === index ? 'open' : ''
                    }`}
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  ></div>
                </AccordionContent>
              </AccordionItem>
            ))
          )}
        </Accordion>
      </div>

      <Modal open={modal} onOpenChange={setModal} />
    </>
  )
}
