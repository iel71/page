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
  const [subTab, setSubTab] = useState('전체') // 서브 탭 카테고리

  const [tabData, setTabData] = useState([]) // 탭 데이터 결과
  const [subTabData, setSubTabData] = useState([]) // 서브 탭 데이터 결과

  const [input, setInput] = useState('') // 검색 텍스트
  const [searchInfo, setSearchInfo] = useState(false) // 입력값을 1글자 입력했을 때를 위한 상태
  const [isNoData, setIsNoData] = useState(false) // 검색 결과 없을 떄를 위한 상태
  const [openIndex] = useState(null) //아코디언 컴포넌트에 사용하는 상태
  const [modal, setModal] = useState(false)

  const [limit] = useState(10)
  const [totalRecord, setTotalRecord] = useState(0)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const [loading, setLoading] = useState(false)
  //초기 로딩
  useEffect(() => {
    getTabData()
  }, [])

  //탭 클릭
  useEffect(() => {
    if (subTabData.length > 0 || isNoData) {
      getTabData()
      setOffset(0)
      setHasMore(false)
      setSearchInfo(false)
      setSubTab('전체')
      setInput('')
      setSubTabData([])
    }
  }, [tab])

  //서브 탭 클릭
  useEffect(() => {
    setOffset(0)
    setHasMore(false)
    setSubTabData([])
  }, [subTab])

  //서브 탭 데이터 호출
  useEffect(() => {
    if (!loading && subTabData.length === 0) {
      getSubTabData()
    }
  }, [subTabData])

  //탭 API 호출
  async function getTabData() {
    try {
      const result = await getFaqByTab(tab)
      if (result) {
        setTabData(result)
      }
    } catch (error) {
      console.error('FAQ 탭 데이터 불러오기 실패:', error)
    }
  }

  // 서브 탭 API 호출
  async function getSubTabData() {
    if (loading) return
    setLoading(true)
    const result = await getDataBySubTab({ tab, subTab, offset, limit, input })

    if (result && result.items.length > 0) {
      setOffset(0)
      setIsNoData(false)
      setSubTabData(subTabData.concat(result.items))
      setTotalRecord(result.pageInfo.totalRecord)
      if (result.pageInfo.nextOffset === offset) {
        setHasMore(false)
      } else {
        setHasMore(true)
        setOffset(result.pageInfo.nextOffset)
      }
    } else {
      setIsNoData(true)
      setTotalRecord(0)
      setLoading(false)
    }
    setLoading(false)
  }

  // 검색 버튼
  function searchHandler() {
    if (input.length === 0) {
      resetHandler()
      return
    }

    if (input.length === 1) {
      setSearchInfo(false)
      setModal(true)
      return
    }
    setOffset(0)
    setHasMore(false)
    setSearchInfo(true)
    setSubTabData([])
  }

  //리셋 버튼
  function resetHandler() {
    setOffset(0)
    setHasMore(false)
    setSubTab('전체')
    setInput('')
    setSearchInfo(false)
    setSubTabData([])
  }

  return (
    <>
      {/* ******* 메인 탭 UI ******* */}
      <ul className="tab-menu">
        <li className={tab === 'CONSULT' ? 'active' : ''}>
          <button
            onClick={() => {
              setTab('CONSULT')
            }}
          >
            서비스 도입
          </button>
        </li>
        <li className={tab === 'USAGE' ? 'active' : ''}>
          <button
            onClick={() => {
              setTab('USAGE')
            }}
          >
            서비스 이용
          </button>
        </li>
      </ul>

      {/* ******* 검색 UI ******* */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          searchHandler()
        }}
      >
        <div className="input-area">
          <div>
            <input
              type="text"
              placeholder="찾으시는 내용을 입력해 주세요"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            {input.length > 1 && (
              <button
                type="button"
                className="delete"
                onClick={() => setInput('')}
              >
                삭제
                <img src="/images/icon_delete.svg" alt="삭제 아이콘 이미지" />
              </button>
            )}

            <button type="button" onClick={() => searchHandler()}>
              검색
              <img src="/images/icon_search.svg" alt="검색 아이콘 이미지" />
            </button>
          </div>
        </div>
      </form>

      {!isNoData && (
        <div className="data-info">
          <p>
            총 <strong>{totalRecord || 0}</strong>건
          </p>
          {searchInfo && (
            <button className="reset" onClick={resetHandler}>
              <img src="/images/icon_reset.svg" alt="리셋 아이콘 이미지" />
              검색초기화
            </button>
          )}
        </div>
      )}

      {/* ******* 서브 탭 UI ******* */}
      <div className="sub-tab-list">
        <ul className="sub-tab-list-item">
          <li className={subTab === '전체' ? 'active' : ''}>
            <button
              onClick={() => {
                setSubTab('전체')
              }}
            >
              전체
            </button>
          </li>
          {tabData?.map((item) => (
            <li
              key={item.categoryID}
              className={subTab === item.name ? 'active' : ''}
            >
              <button
                onClick={() => {
                  setSubTab(item.name)
                }}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        {/* ******* 서브 탭 리스트 UI ******* */}
        <Accordion type="single" collapsible className="sub-tab-data">
          {isNoData ? (
            <div className="no-data">
              <img
                src="/images/icon_nodata.svg"
                alt="데이터 없음 아이콘 이미지"
              />
              검색결과가 없습니다.
            </div>
          ) : (
            subTabData?.map((item, index) => (
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

        {hasMore && (
          <button
            type="button"
            className="list-more"
            onClick={() => getSubTabData()}
          >
            + 더보기
          </button>
        )}
      </div>

      <Modal open={modal} onOpenChange={setModal} />
    </>
  )
}
