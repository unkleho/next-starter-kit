import styles from '../styles/base.css';

export default ({ children }) => (
  <main>

    {children}

    <style jsx global>{styles}</style>
  </main>
)
