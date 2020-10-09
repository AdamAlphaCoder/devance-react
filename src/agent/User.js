import { axios } from './helpers'

const urlPrefix = '/users'

const User = {
  list: () => axios.get(`${urlPrefix}/`),
  get: ({ id }) => axios.get(`${urlPrefix}/${id}`),
  post: ({ name, age }) =>
    axios.post(`${urlPrefix}/`, {
      name,
      age
    }),
  put: ({ id, name, age }) =>
    axios.put(`${urlPrefix}/${id}`, {
      name,
      age
    }),
  delete: ({ id }) => axios.delete(`${urlPrefix}/${id}`)
}

export default User
