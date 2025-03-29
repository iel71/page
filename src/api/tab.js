import axios from '../lib/axios'

export async function getFaqByTab(categoryID) {
  const res = await axios.get('/tab', {
    params: {
      categoryID,
    },
  })
  return res.data
}

export async function getDataBySubTab({ tab, subTab, offset, limit, input }) {
  const res = await axios.get('/subTab', {
    params: { tab, subTab, offset, limit, input },
  })
  return res.data
}
