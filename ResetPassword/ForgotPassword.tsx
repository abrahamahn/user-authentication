import React from 'react';
import styles from '@/styles/pages/accounts/reset-password.module.css';
import { useRouter } from 'next/router';

const ForgotPassword: React.FC = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/accounts/signin');
  };

  const handleCheckEmail = () => {
    router.push('/accounts/email');
  };

  return (
    <div className={styles.reset_container}>
      <div className={styles.reset}>
        <div className={styles.logo_container}>
          <p className={styles.logo}>BLEND</p>
        </div>
        <div className={styles.heading_container}>
          <h1 className={styles.heading}>Forgot Your Password?</h1>
          <p className={styles.subheading}>
            Enter your email address and we will send you instructions to reset your password.
          </p>
        </div>
        <div className={styles.inputs_container}>
          <div className={styles.email_container}>
            <input
              type="email"
              placeholder="Email address"
              className={`${styles.input} ${styles.input_hover}`}
            />
          </div>
        </div>
      </div>
      <div className={styles.reset2}>
        <button className={styles.continue_button} onClick={handleCheckEmail}>
          Continue
        </button>
        <div className={styles.signin_container}>
          <a onClick={handleSignIn} className={styles.signin_link}>
            Back to Sign In
          </a>
        </div>
      </div>
      <div className={styles.terms_and_policy}>
        <p className={styles.terms_and_policy_text}>
          By continuing, you agree to Blend's{' '}<a className={styles.link}>Terms of Service</a>{' '}and{' '}<a className={styles.link}>Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
