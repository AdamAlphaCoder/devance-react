import React from 'react'

import { Button, Table } from 'react-bootstrap'

// TODO:
// * 1. LIST USERS
// * 2. GET USER
// * 3. CREATE USER
// * 4. UPDATE USER
// * 5. DELETE USER

const Users = () => {
  return (
    <div className="div mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>User List</h3>
        <Button variant="primary">Add User</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>18</td>
            <td>
              <Button variant="primary">View</Button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>21</td>
            <td>
              <Button variant="primary">View</Button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry</td>
            <td>50</td>
            <td>
              <Button variant="primary">View</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default Users
