// @flow

/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import type { Element } from 'React';
import './ExampleComponent.css';

type Props = {
	children?: Element<any>,
	title?: string,
};

export default ({ children, title }: Props) => (
	<div>
		<h1>{title}</h1>
		<p>Example Component</p>

		{children}
	</div>
);
