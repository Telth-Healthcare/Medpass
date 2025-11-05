import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { Modal, Button } from 'react-bootstrap';

interface LogoutProps {
  showModal: boolean;
  onHide: () => void;
  onLogoutConfirm: () => void;
}

const Logout: React.FC<LogoutProps> = ({ showModal, onHide, onLogoutConfirm }) => {
  return (
    <Modal
      show={showModal}
      onHide={onHide}
      centered
      backdrop="static"
    >
      <Modal.Body className="text-center p-4">
        <div className="mb-4">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <LogOut className="h-6 w-6 text-red-600" />
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Confirm Logout</h3>
        <p className="text-sm text-gray-500 mb-4">
          Are you sure you want to logout from the system?
        </p>
        <div className="flex justify-center space-x-3">
          <Button
            variant="outline-secondary"
            onClick={onHide}
            className="px-4 py-2"
          >
            Cancel
          </Button>
          <Button  
            variant="danger"
            onClick={onLogoutConfirm}
            className="px-4 py-2"
          >
            Logout
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Logout;