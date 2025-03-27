'use client'
import { useState, useEffect } from 'react'
import { getFaqByTab, getDataBySubTab } from '../api/tab'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion'
import Modal from './Modal'

export default function FaqClient() {
  const [tab, setTab] = useState('CONSULT') //CONSULT or USAGE
  const [subTabName, setSubTabName] = useState('전체')
  const [tabData, setTabData] = useState([]) // CONSULT or USAGE 탭에 따른 전체 데이터 가져오기
  const [subTabData, setSubTabData] = useState({})
  const [faqList, setFaqList] = useState([])

  const [input, setInput] = useState('') // 검색 텍스트
  const [searchInfo, setSearchInfo] = useState(false) // 입력값을 1글자 입력했을 때를 위한 상태
  const [isNoData, setIsNoData] = useState(false)
  const [openIndex] = useState(null) //아코디언 컴포넌트에 사용하는 상태
  const [modal, setModal] = useState(false)

  const [limit] = useState(10)
  const [totalRecord, setTotalRecord] = useState(0)

  const [offset, setOffset] = useState(0)

  // const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const tabDataFn = () => {
    setSubTabName('전체')
    setOffset(0)
    // setHasMore(true)
    getFaqByTab(tab)
      .then((res) => {
        console.log(',,,,,텝리스트 Fetched getFaqByTab data!!', res)
        setTabData(res)
      })
      .then(() => {
        subTabDataFn2()
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

    setSearchInfo(true)
  }

  // subTabDataFn 함수 정의
  // const subTabDataFn = (tab, subTab) => {
  //   console.log(',TabData@@@@@@', tab, subTab)
  //   setOffset(0)
  //   setSubTabName(subTab)

  //   getDataBySubTab(tab, subTab, 0, limit).then((res) => {
  //     console.log(',,,,,데이터리스트@!!!!', res)
  //     if (offset === 0) {
  //       setSubTabData(res)
  //     } else {
  //       setSubTabData({ ...subTabData, res })
  //     }

  //     if (res.pageInfo.nextOffset === offset) {
  //       setHasMore(false)
  //     } else {
  //       setHasMore(true)
  //       setOffset(res.pageInfo.nextOffset)
  //     }
  //     console.log('Fetched getDataBySubTab data!!', res)
  //   })
  // }

  const subTabDataFn2 = () => {
    // setIsLoading(true)

    getDataBySubTab(tab, subTabName, offset, input).then((res) => {
      console.log(',res', res)
      if (res && res.items.length > 0) {
        setIsNoData(false)
        setFaqList(faqList.concat(res.items))
        setTotalRecord(res.pageInfo.totalRecord)
        if (res.pageInfo.nextOffset === offset) {
          setHasMore(false)
        } else {
          setHasMore(true)
          setOffset(res.pageInfo.nextOffset)
        }
      } else {
        setIsNoData(true)
        setTotalRecord(0)
      }
    })

    // setIsLoading(false)
  }

  const loadMore = () => {
    setOffset((prevOffset) => prevOffset + 10) // offset 증가
  }

  useEffect(() => {
    if (faqList.length > 0 || isNoData) {
      setOffset(0)
      setHasMore(false)
      // setIsSearch(false)
      setSubTabName('전체')
      setInput('')
      setFaqList([])
    }
  }, [tab])

  useEffect(() => {
    if (offset === 0) return
    subTabDataFn2()
  }, [offset, tab, subTabName])

  useEffect(() => {
    const timer = setTimeout(() => {
      tabDataFn('CONSULT')
      // subTabDataFn2()
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
              // tabDataFn('CONSULT')
              setTab('CONSULT')
              tabDataFn()
              subTabDataFn2()
            }}
          >
            서비스 도입
          </button>
        </li>
        <li className={tab === 'USAGE' ? 'active' : ''}>
          <button
            onClick={() => {
              // tabDataFn('USAGE')
              setTab('USAGE')
              tabDataFn()
              subTabDataFn2()
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
                setSubTabName('전체')
                subTabDataFn2()
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
              <button
                onClick={() => {
                  setSubTabName(item.name)

                  subTabDataFn2()
                }}
              >
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
            faqList?.map((item, index) => (
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
        <button type="button" className="list-more" onClick={loadMore}>
          + 더보기
        </button>
        {/* {hasMore && (
          <button type="button" className="list-more" onClick={loadMore}>
            + 더보기
          </button>
        )} */}
      </div>

      <Modal open={modal} onOpenChange={setModal} />
    </>
  )
}
