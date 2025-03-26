import axios from '../lib/axios'

export async function getFaqByTab(categoryID, offset, limit) {
  console.log('categoryID', categoryID)
  const res = await axios.get('/tab', {
    params: {
      categoryID,
      limit,
      offset,
    },
  })
  return res.data
}

export async function getDataBySubTab(tab, subTab, offset, limit) {
  console.log('params', tab, subTab)
  const res = await axios.get('/subTab', {
    params: { tab, subTab, offset, limit },
  })
  return res.data
}
