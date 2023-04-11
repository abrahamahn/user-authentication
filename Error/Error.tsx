import { useState } from 'react';
import styles from '@/styles/Pages/Accounts/Error/Error.module.css';

interface ErrorProps {
  message: string;
  onClose: () => void;
}

const Error: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modalContainer}>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <p className={styles.message}>Username or password is incorrect.</p>
              <button className={styles.closeButton} onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Error;
