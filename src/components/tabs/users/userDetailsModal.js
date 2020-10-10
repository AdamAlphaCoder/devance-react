import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import { Button, Form, Modal } from 'react-bootstrap'

import User from '../../../agent/User'

const UserDetailsModal = (props) => {
  const [editing, setEditing] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [userForm, setUserForm] = useState({})

  const handleNameChange = (event) => setUserForm({
    ...userForm,
    name: event.target.value
  })

  const handleAgeChange = (event) => setUserForm({
    ...userForm,
    age: Number(event.target.value)
  })

  const handleEditUserClick = () => {
    setEditing(true)
  }

  const handleSaveUserClick = async () => {
    try {
      setSubmitting(true)
      const response = props.existingUser
        ? await User.put(userForm)
        : await User.post(userForm)

      if (response.status !== 200) {
        alert(response.data.error)
      }

      location.reload()
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

  const handleDeleteUserClick = async () => {
    try {
      const response = await User.delete({ id: userForm.id })

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
    if (!props.existingUser) {
      return 'New User'
    }

    return editing ? 'Edit User' : 'View User'
  }, [props.existingUser, editing])

  useEffect(() => {
    if (props.existingUser) {
      setUserForm({
        id: Number(props.existingUser.id),
        name: props.existingUser.name,
        age: Number(props.existingUser.age)
      })
    } else {
      setUserForm({
        title: '',
        name: '',
        age: 0
      })
    }
    setEditing(!props.existingUser)
  }, [props])

  return (
    <Modal show={props.modalOpen} onHide={props.onModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>{headerText}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={userForm.name}
              onChange={handleNameChange}
              type="text"
              placeholder="Name"
              disabled={!editing}
            />
          </Form.Group>
          <Form.Group controlId="age">
            <Form.Label>Age</Form.Label>
            <Form.Control
              value={userForm.age}
              onChange={handleAgeChange}
              type="number"
              placeholder="Age"
              disabled={!editing}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {props.existingUser ? (
          <Button variant="danger" onClick={handleDeleteUserClick}>
            Delete
          </Button>
        ) : null}
        {editing ? (
          <Button
            variant="primary"
            onClick={handleSaveUserClick}
            disabled={submitting}
          >
            Save Changes
          </Button>
        ) : (
          <Button variant="primary" onClick={handleEditUserClick}>
            Edit User
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

UserDetailsModal.propTypes = {
  existingUser: PropTypes.object,
  modalOpen: PropTypes.bool,
  onModalClose: PropTypes.func
}

export default UserDetailsModal
