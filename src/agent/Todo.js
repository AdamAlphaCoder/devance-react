import { axios } from './helpers'

const urlPrefix = '/todos'

const Todo = {
  list: () => axios.get(`${urlPrefix}/`),
  get: ({ id }) => axios.get(`${urlPrefix}/${id}`),
  post: ({ title, body, user }) =>
    axios.post(`${urlPrefix}/`, {
      title,
      body,
      user
    }),
  put: ({ id, title, body, user }) =>
    axios.put(`${urlPrefix}/${id}`, {
      title,
      body,
      user
    }),
  delete: ({ id }) => axios.delete(`${urlPrefix}/${id}`)
}

export default Todo
