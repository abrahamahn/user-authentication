import React from 'react';
import styles from '@/styles/pages/accounts/email.module.css';
import * as Icon from '@/components/icons';

const Email: React.FC = () => {  
  return (
    <div className={styles.email_container}>
      <div className={styles.email}>
        <div className={styles.icon_container}>
          <Icon.Email className={styles.icon} />
        </div>
        <div className={styles.heading_container}>
          <h1 className={styles.heading}>Check your Email</h1>
          <p className={styles.subheading}>
            Please check the email address for instructions to reset your password.
          </p>
        </div>
        <button className={styles.resend_email_button}>
          Resend Email
        </button>
      </div>
      <div className={styles.terms_and_policy}>
        <p className={styles.terms_and_policy_text}>
          By continuing, you agree to Blend's{' '}<a className={styles.link}>Terms of Service</a>{' '}and{' '}<a className={styles.link}>Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default Email;