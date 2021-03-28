import { signIn, signOut, useSession } from 'next-auth/client';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import styles from './styles.module.scss';

const SignInButton = () => {
  const [session] = useSession();

  return session ? (
    <button
      type="button"
      title="Sign out"
      className={styles.button}
      onClick={() => signOut()}
    >
      <FaGithub color="#04D361" />
      {session.user.name}
      <FiX color="#737380" className={styles.close} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.button}
      onClick={() => signIn('github')}
    >
      <FaGithub color="#EBA417" />
      Sign in with GitHub
    </button>
  );
};

export default SignInButton;
