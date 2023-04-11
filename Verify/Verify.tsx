import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@/styles/pages/accounts/verify.module.css';

const Verify = () => {
  const router = useRouter();
  const [message, setMessage] = useState('Verifying your account...');

  useEffect(() => {
    const verifyAccount = async () => {
      if (!router.query.token) {
        setMessage('Invalid verification link');
        return;
      }

      try {
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: router.query.token }),
        });

        if (response.ok) {
          setMessage('Your account has been verified! Redirecting to the login page...');
          setTimeout(() => {
            router.push('/accounts/signin');
          }, 3000);
        } else {
          const data = await response.json();
          setMessage(data.message || 'Verification failed');
        }
      } catch (error) {
        setMessage('Verification failed');
      }
    };

    verifyAccount();
  }, [router]);

  return (
    <div className={styles.verify_container}>
      <div className={styles.verify}>
        <div className={styles.logo_container}>
          <p className={styles.logo}>BLEND</p>
        </div>
        <div className={styles.heading_container}>
          <h1 className={styles.heading}>{message}</h1>
        </div>
      </div>
    </div>
  );
};

export default Verify;
