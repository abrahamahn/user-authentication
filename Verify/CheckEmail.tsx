// pages/auth/verify.js
import { getSession } from 'next-auth/client';

export default function VerifyRequest() {
  return (
    <div>
      <h1>Email Verification</h1>
      <p>Check your inbox for the verification link.</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
