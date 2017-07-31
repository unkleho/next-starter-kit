import baseStyles from '../../styles/base.css';
import helpersStyles from '../../styles/helpers.css';

export default ({ children }) => (
  <main>

    {children}

    <style jsx global>{baseStyles}</style>
    <style jsx global>{helpersStyles}</style>
  </main>
)
