import React from 'react'
import PropTypes from 'prop-types'

import { Button, Modal } from 'react-bootstrap'

const UserDetailsModal = (props) => {
  return (
    <Modal show={props.modalOpen} onHide={props.onModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>New/View/Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={props.onModalOk}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

UserDetailsModal.propTypes = {
  modalOpen: PropTypes.bool,
  onModalClose: PropTypes.func,
  onModalOk: PropTypes.func
}

export default UserDetailsModal
