// @flow

import type { Element } from 'React';
import styles from './ExampleComponent.css';

type Props = {
  children?: Element<any>,
  title?: string
}

export default ({ children, title }: Props) => (
  <div>
    <h1>{title}</h1>
    Example Component

    {children}

    <style jsx>{styles}</style>
  </div>
)
