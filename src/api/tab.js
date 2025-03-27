import axios from '../lib/axios'

export async function getFaqByTab(categoryID) {
  console.log('categoryID', categoryID)
  const res = await axios.get('/tab', {
    params: {
      categoryID,
    },
  })
  return res.data
}

export async function getDataBySubTab(tab, subTabName, offset, limit) {
  console.log('params!!!!', subTabName)
  const res = await axios.get('/subTab', {
    params: { tab, subTabName, offset, limit },
  })
  return res.data
}
