import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'

import Todo from '../../../agent/Todo'
import User from '../../../agent/User'

import TodoDetailsModal from './todoDetailsModal'
import LoadingSpinner from '../../loadingSpinner'

// TODO:
// * 1. LIST TODOS
// * 2. GET TODO
// * 3. CREATE TODO
// * 4. UPDATE TODO
// * 5. DELETE TODO

// TODO: LIMIT BODY TO 25 CHARACTERS, SHOW FULL VERSION IN VIEW

const Todos = (props) => {
  const [isLoading, setIsLoading] = useState(true)

  const [todos, setTodos] = useState([])
  const [users, setUsers] = useState([])
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleModalOpen = () => setModalOpen(true)
  const handleModalClose = () => {
    setModalOpen(false)
    setSelectedTodo(null)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const todosResponse = await Todo.list()
        setTodos(todosResponse.data.todos)

        const usersResponse = await User.list()
        setUsers(usersResponse.data.users)

        setIsLoading(false)
      } catch (err) {
        console.error(err)
        alert(err.message)
      }
    })()
  }, [props])

  return (
    <div className="div mt-4">
      <TodoDetailsModal
        modalOpen={modalOpen}
        onModalClose={handleModalClose}
        existingTodo={selectedTodo}
        users={users}
      />
      <div className="d-flex justify-content-between mb-3">
        <h3>Todo List</h3>
        <Button onClick={handleModalOpen} variant="primary">
          Add Todo
        </Button>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
              <th>User</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.body}</td>
                <td>{todo.user.name}</td>
                <td>
                  <Button
                    onClick={() => {
                      setSelectedTodo(todo)
                      setModalOpen(true)
                    }}
                    variant="primary"
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default Todos
