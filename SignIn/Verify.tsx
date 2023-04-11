import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';

import styles from '@/styles/Pages/Accounts/SignIn/Verify.module.css';

const Verify: NextPage = (): ReactElement => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [error, setError] = useState('');

  const [ userInfo, setUserInfo ] = useState({
    email: '',
    password: '',
  })
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignIn: FormEventHandle<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // Check if user exists in the database
    const res = await fetch('/api/auth/checkuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userInfo.email }),
    });

    const data = await res.json();

    if (data.exists) {
      // If the user exists, redirect to the second Signin window
      router.push('/accounts/signin', undefined, { state: { email: userInfo.email, user: data.user } });
    } else {
      // If the user doesn't exist, redirect to the Signup window
      router.push('/accounts/signup', undefined, { state: { email: userInfo.email } });
    }
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    signIn('google', {
      callbackUrl: '/app',
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (session) {
    router.push('/app');
  }
  
  return (
    <div className={styles.verify_container}>
      <div className={styles.verify}>
        <div className={styles.logo_container}>
          <p className={styles.logo}>BLEND</p>
        </div>
        <div className={styles.heading_container}>
          <h1 className={styles.heading}>Log into your account</h1>
        </div>
        <form className={styles.inputs_container}>
          <div className={styles.email_container}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={userInfo.email}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <button
            name="submit"
            type="button"
            className={styles.continue_button}
            onClick={handleSignIn}>
            Continue
          </button>
        </form>
      </div>
      <div className={styles.login2}>
        <div className={styles.divider}>
          <span className={styles.span}>OR</span>
        </div>
        <button 
          className={styles.google_button}
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className={styles.google_logo} />
          <p className={styles.google_login_text}>
            Continue with Google
          </p>
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

export default Verify;
