import './ExampleComponent.css';

export default ({ children, title }) => (
	<div>
		<h1 data-testid="title">{title}</h1>
		<p>Example Component</p>

		{children}
	</div>
);
