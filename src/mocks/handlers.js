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

    console.log(',*************', categoryID)
    let dataList = []

    if (categoryID === 'CONSULT') {
      dataList = consultTabList
    } else if (categoryID === 'USAGE') {
      dataList = usageTabList
    }

    return res(ctx.status(200), ctx.json(dataList))
  }),

  //서브 탭 클릭 후 데이터 호출 API
  rest.get('/subTab', (req, res, ctx) => {
    const url = new URL(req.url, `http://${req.headers.host}`)
    const tab = url.searchParams.get('tab')
    const subTabName = url.searchParams.get('subTabName')
    const searchText = url.searchParams.get('searchText')
    const limit = parseInt(url.searchParams.get('limit')) || 10
    let offset = parseInt(url.searchParams.get('offset')) || 0

    console.log(',*************', tab, subTabName)
    let filtered = []
    let dataList = []
    if (tab === 'CONSULT') {
      dataList = consultDataList.items
      filtered =
        subTabName === '전체'
          ? dataList
          : dataList.filter((item) => item.subCategoryName === subTabName)
    } else if (tab === 'USAGE') {
      dataList = usageDataList.items
      filtered =
        subTabName === '전체'
          ? dataList
          : dataList.filter((item) => item.categoryName === subTabName)
    }

    const slicedData = filtered.slice(offset, offset + limit)

    const totalRecord = filtered.length
    const prevOffset = offset - limit < 0 ? 0 : offset - limit
    const nextOffset = offset + limit >= totalRecord ? offset : offset + limit

    if (nextOffset < totalRecord) {
      offset = nextOffset
    }

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
