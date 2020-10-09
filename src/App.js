import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'

import './App.css'

import Todos from './components/tabs/todos'
import Users from './components/tabs/users'

function App() {
  return (
    <div className="App">
      <div className="container mt-5">
        <Tabs defaultActiveKey="todos" id="uncontrolled-tab-example">
          <Tab eventKey="todos" title="Todos">
            <Todos />
          </Tab>
          <Tab eventKey="users" title="Users">
            <Users />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default App
