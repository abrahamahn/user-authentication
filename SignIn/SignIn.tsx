import React, { useState } from 'react';
import Link from 'next/link';
import { Image } from 'next/image';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import styles from '@/styles/pages/accounts/signin.module.css';

const SignIn: NextPage = (): TSX.Element => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const [userInfo, setUserInfo] = useState({
    email: router?.query?.email || "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(userInfo);
  const handleSignIn: FormEventHandle<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn('credentials', {
        email: userInfo.email,
        password: userInfo.password,
        callbackUrl: '/app',
      });

      if (res.error) {
        setError(res.error);
      } else if (res.okay && res.status === 200) {
        // User exists and was authenticated
        router.push('/accounts/signin');
      } else if (res.okay && res.status === 201) {
        // User is new and needs to sign up with password
        router.push('/accounts/signup', { email: userInfo.email });
      }
    } catch (error) {
      console.error('Authentication error: ', error);
      setError('Username or password is incorrect.');
    }
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    signIn('google', {
      callbackUrl: '/app',
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = () => {
    router.push('/accounts/signup');
  };

  const handleForgotPassword = () => {
    router.push('/accounts/reset-password');
  };

  const handleBackToSignin = () => {
  router.push('/accounts/signin');
};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (session) {
    router.push('/app');
  }
  
  return (
    <div className={styles.signin_container}>
      <div className={styles.signin}>
        <div className={styles.logo_container}>
          <p className={styles.logo}>BLEND</p>
        </div>
        <div className={styles.heading_container}>
          <h1 className={styles.heading}>Log into your account</h1>
        </div>
        <form className={styles.inputs_container}>
          <div className={styles.email_container}>
            <div>
              <p>{userInfo.email}</p>
            </div>
            <div className={styles.close_icon} onClick={handleBackToSignin}>
              <p>X</p>
            </div>
          </div>
          <div className={styles.password_container}>
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={userInfo.password}
              onChange={handleInputChange}
              className={styles.input}
            />
            <div className={styles.eye_icon} onClick={togglePasswordVisibility}>
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </div>
          </div>
          <a className={styles.forgot_password} onClick={handleForgotPassword}>Forgot password?</a>
          <button
            name="submit"
            type="button"
            className={styles.continue_button}
            onClick={handleSignIn}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;