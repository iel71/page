import { rest } from 'msw'
import { usageTabList } from './data/usageTabList'
import { consultTabList } from './data/consultTabList'

import { usageDataList } from './data/usageDataList'
import { consultDataList } from './data/consultDataList'

export const handlers = [
  //메인 탭 API
  rest.get('/tab', (req, res, ctx) => {
    const categoryID = req.url.searchParams.get('categoryID')

    if (categoryID === 'CONSULT') {
      return res(ctx.status(200), ctx.json(consultTabList))
    }

    if (categoryID === 'USAGE') {
      return res(ctx.status(200), ctx.json(usageTabList))
    }
  }),

  //서브 탭 API
  rest.get('/subTab', (req, res, ctx) => {
    const tab = req.url.searchParams.get('tab')
    const subTab = req.url.searchParams.get('subTab')
    let filtered = []
    let dataList = []
    if (tab === 'CONSULT') {
      dataList = consultDataList.items
      console.log(',,,tab!!', dataList, tab, subTab)
      filtered = dataList.filter((item) => item.subCategoryName == subTab)
    } else if (tab === 'USAGE') {
      dataList = usageDataList.items
      filtered = dataList.filter((item) => item.categoryName == subTab)
    }
    console.log(',,,dataList', dataList)
    if (subTab === '전체') {
      return res(
        ctx.status(200),
        ctx.json({
          pageInfo: {
            totalRecord: dataList.length,
            offset: 0,
            limit: 10,
            prevOffset: 0,
            nextOffset: 0,
          },
          items: dataList,
        }),
      )
    } else {
      console.log(',,,tab!!', dataList, tab, subTab)
      // const filtered = dataList.filter((item) => item.subCategoryName == subTab)
      console.log(',,,filtered', filtered)
      return res(
        ctx.status(200),
        ctx.json({
          pageInfo: {
            totalRecord: filtered.length,
            offset: 0,
            limit: 10,
            prevOffset: 0,
            nextOffset: 0,
          },
          items: filtered,
        }),
      )
    }
  }),
]
