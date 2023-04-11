import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { signUpWithEmail } from "@/services/signup";
import styles from "@/styles/pages/accounts/signup.module.css";

import * as Icon from "@/components/icons";

const SignUp: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
  });

  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isPasswordValid = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber
    );
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const res = await signUpWithEmail(userInfo.email, userInfo.password);
      if (res?.message === "User created!") {
        router.push('/accounts/verify');
      } else if (res?.message === "User already exists") {
        setError("A user with this email already exists");
      } else {
        setError("Error creating user");
      }
    } catch (error) {
      console.error(error);
      setError("Error creating user");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = () => {
    router.push('/accounts/signin');
  };

  const handleForgotPassword = () => {
    router.push('/accounts/reset-password');
  };
  
  return (
    <div className={styles.signup_container}>
      <div className={styles.signup}>
        <div className={styles.logo_container}>
          <p className={styles.logo}>BLEND</p>
        </div>
        <div className={styles.heading_container}>
          <h1 className={styles.heading}>
            Create your free account
          </h1>
          <p className={styles.subheading}>
            You are two steps away to unleash your creativity in music.
          </p>
        </div>
        <form className={styles.inputs_container} onSubmit={handleSignUp}>
          <div className={styles.email_container}>
            <input
              name="email"
              type="email"
              placeholder="Username"
              value={userInfo.username}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.email_container}>
            <input
              name="email"
              type="email"
              placeholder="Username"
              value={userInfo.username}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>

        <button name="continue" type="button" className={styles.continue_button} onClick={handleSignUp}>Continue</button>
        </form>
      </div>
      <div className={styles.signup2}>
        <div className={styles.signin_container}>
          <p className={styles.signin_text}>Already have an account?</p>
          <a onClick={handleSignIn} className={styles.signin_link}>
            Login
          </a>
        </div>
      </div>
      <div className={styles.terms_and_policy}>
        <p className={styles.terms_and_policy_text}>
          By continuing, you agree to Blend's{' '}<a href="#">Terms of Service{' '}</a>
          and{' '}<a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default SignUp;
