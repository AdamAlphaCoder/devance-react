import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import { Button, Form, Modal } from 'react-bootstrap'

import Todo from '../../../agent/Todo'

const TodoDetailsModal = (props) => {
  const [editing, setEditing] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [todoForm, setTodoForm] = useState({})

  const handleTitleChange = (event) =>
    setTodoForm({
      ...todoForm,
      title: event.target.value
    })

  const handleBodyChange = (event) =>
    setTodoForm({
      ...todoForm,
      body: event.target.value
    })

  const handleUserChange = (event) =>
    setTodoForm({
      ...todoForm,
      user: Number(event.target.value)
    })

  const handleEditTodoClick = () => {
    setEditing(true)
  }

  const handleSaveTodoClick = async () => {
    try {
      setSubmitting(true)
      const response = props.existingTodo
        ? await Todo.put(todoForm)
        : await Todo.post(todoForm)

      if (response.status !== 200) {
        alert(response.data.error)
      }

      location.reload()
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

  const handleDeleteTodoClick = async () => {
    try {
      const response = await Todo.delete({ id: todoForm.id })

      if (response.status !== 200) {
        alert(response.data.error)
      }

      location.reload()
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

  const headerText = useMemo(() => {
    if (!props.existingTodo) {
      return 'New Todo'
    }

    return editing ? 'Edit Todo' : 'View Todo'
  }, [props.existingTodo, editing])

  useEffect(() => {
    if (props.existingTodo) {
      setTodoForm({
        id: Number(props.existingTodo.id),
        title: props.existingTodo.title,
        body: props.existingTodo.body,
        user: props.existingTodo.user.id
      })
    } else {
      setTodoForm({
        title: '',
        body: '',
        user: ''
      })
    }
    setEditing(!props.existingTodo)
  }, [props])

  return (
    <Modal show={props.modalOpen} onHide={props.onModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>{headerText}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={todoForm.title}
              onChange={handleTitleChange}
              type="text"
              placeholder="Title"
              disabled={!editing}
            />
          </Form.Group>
          <Form.Group controlId="body">
            <Form.Label>Body</Form.Label>
            <Form.Control
              value={todoForm.body}
              onChange={handleBodyChange}
              as="textarea"
              rows={3}
              disabled={!editing}
            />
          </Form.Group>
          <Form.Group controlId="user">
            <Form.Label>User</Form.Label>
            <Form.Control
              value={todoForm.user}
              onChange={handleUserChange}
              as="select"
              disabled={!editing}
            >
              <option value={''} disabled>
                Select...
              </option>
              {props.users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {props.existingTodo ? (
          <Button variant="danger" onClick={handleDeleteTodoClick}>
            Delete
          </Button>
        ) : null}
        {editing ? (
          <Button
            variant="primary"
            onClick={handleSaveTodoClick}
            disabled={submitting}
          >
            Save Changes
          </Button>
        ) : (
          <Button variant="primary" onClick={handleEditTodoClick}>
            Edit Todo
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

TodoDetailsModal.propTypes = {
  existingTodo: PropTypes.object,
  users: PropTypes.array,
  modalOpen: PropTypes.bool,
  onModalClose: PropTypes.func
}

export default TodoDetailsModal
