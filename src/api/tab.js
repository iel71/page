import axios from '../lib/axios'

export async function getFaqByTab(categoryID) {
  console.log('categoryID', categoryID)
  const res = await axios.get('/tab', {
    params: { categoryID },
  })
  return res.data
}

export async function getDataBySubTab(tab, subTab) {
  console.log('params', tab, subTab)
  const res = await axios.get('/subTab', {
    params: { tab, subTab },
  })
  return res.data
}
