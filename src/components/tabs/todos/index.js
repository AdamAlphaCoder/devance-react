import React from 'react'
import { Button, Table } from 'react-bootstrap'

// TODO:
// * 1. LIST TODOS
// * 2. GET TODO
// * 3. CREATE TODO
// * 4. UPDATE TODO
// * 5. DELETE TODO

// TODO: LIMIT BODY TO 25 CHARACTERS, SHOW FULL VERSION IN VIEW

const Todos = () => {
  return (
    <div className="div mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>Todo List</h3>
        <Button variant="primary">Add Todo</Button>
      </div>
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
          <tr>
            <td>1</td>
            <td>Lorem</td>
            <td>Ipsum Dolor Sit Amet</td>
            <td>Adam</td>
            <td>
              <Button variant="primary">View</Button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>How much</td>
            <td>
              Wood would a woodchuck chuck if a woodchuck could chuck wood
            </td>
            <td>Jason</td>
            <td>
              <Button variant="primary">View</Button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Mary had a</td>
            <td>Little lamb and she was white as snow</td>
            <td>Larry</td>
            <td>
              <Button variant="primary">View</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default Todos
