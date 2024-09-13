"use client"
// In a component or a test file

import useModalStore from "@/hooks/useModalStore";

const TestComponent = () => {
  const { isOpen, openModal, closeModal } = useModalStore();
    console.log(isOpen)
  // Test opening the modal
  const handleOpen = () => openModal({ name: 'Test Product' });

  // Test closing the modal
  const handleClose = () => closeModal();

  return (
    <div>
      <button onClick={handleOpen}>Open Modal</button>
      <button onClick={handleClose}>Close Modal</button>
      <div>Modal is {isOpen ? 'Open' : 'Closed'}</div>
    </div>
  );
};

export default TestComponent;