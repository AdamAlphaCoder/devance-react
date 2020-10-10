import React, { useEffect, useState } from 'react'

import { Button, Table } from 'react-bootstrap'

import User from '../../../agent/User'

import UserDetailsModal from './userDetailsModal'
import LoadingSpinner from '../../loadingSpinner'

const Users = (props) => {
  const [isLoading, setIsLoading] = useState(true)

  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleModalOpen = () => setModalOpen(true)
  const handleModalClose = () => {
    setModalOpen(false)
    setSelectedUser(null)
  }

  useEffect(() => {
    ;(async () => {
      try {
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
      <UserDetailsModal
        modalOpen={modalOpen}
        onModalClose={handleModalClose}
        existingUser={selectedUser}
      />
      <div className="d-flex justify-content-between mb-3">
        <h3>User List</h3>
        <Button onClick={handleModalOpen} variant="primary">
          Add User
        </Button>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>
                  <Button
                    onClick={() => {
                      setSelectedUser(user)
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

export default Users
