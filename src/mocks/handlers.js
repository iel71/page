import { rest } from 'msw'
import { usageTabList } from './data/usageTabList'
import { consultTabList } from './data/consultTabList'
import { usageDataList } from './data/usageDataList'
import { consultDataList } from './data/consultDataList'

export const handlers = [
  //메인 탭 리스트 API
  rest.get('/tab', (req, res, ctx) => {
    const url = new URL(req.url, `http://${req.headers.host}`)
    const categoryID = url.searchParams.get('categoryID')
    let dataList = []

    if (categoryID === 'CONSULT') {
      dataList = consultTabList
    } else if (categoryID === 'USAGE') {
      dataList = usageTabList
    }
    return res(ctx.status(200), ctx.json(dataList))
  }),

  //서브 탭 데이터 호출 API
  rest.get('/subTab', (req, res, ctx) => {
    const url = new URL(req.url, `http://${req.headers.host}`)
    const tab = url.searchParams.get('tab')
    const subTab = url.searchParams.get('subTab')
    const input = url.searchParams.get('input')
    const limit = parseInt(url.searchParams.get('limit')) || 10
    let offset = parseInt(url.searchParams.get('offset')) || 0

    let filtered = []
    let dataList = []

    if (tab === 'CONSULT') {
      dataList = consultDataList.items
      filtered =
        subTab === '전체'
          ? dataList
          : dataList.filter((item) => item.subCategoryName === subTab)
    } else if (tab === 'USAGE') {
      dataList = usageDataList.items
      filtered =
        subTab === '전체'
          ? dataList
          : dataList.filter((item) => item.categoryName === subTab)
    }

    if (input) {
      filtered = filtered.filter((item) =>
        item.question?.toLowerCase().includes(input),
      )
    }

    const slicedData = filtered.slice(offset, offset + limit)
    const totalRecord = filtered.length
    const prevOffset = offset - limit < 0 ? 0 : offset - limit
    const nextOffset = offset + limit >= totalRecord ? offset : offset + limit

    return res(
      ctx.status(200),
      ctx.json({
        pageInfo: {
          totalRecord: totalRecord,
          offset: offset,
          limit: limit,
          prevOffset: prevOffset,
          nextOffset: nextOffset,
        },
        items: slicedData,
      }),
    )
  }),
]
