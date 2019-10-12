import React from 'react';
import Link from 'next/link';

import App from '../components/App';

import pkg from '../package.json';

import css from './index.scss';

const Home = () => (
	<App title="Home" className={css.home}>
		<h1>Next Starter Kit</h1>

		<p>v{pkg.version}</p>

		<p>
			<Link href="/example">
				<a>Example Page</a>
			</Link>
		</p>

		<p>
			Opinionated starter kit for the Next.js React framework. This starter kit
			includes all my go-to tech for new projects.
		</p>
		<ul>
			<li>Next.js</li>
			<li>React</li>
			<li>Typescript</li>
			<li>dotenv</li>
			<li>next-css</li>
			<li>next-scss</li>
			<li>ESLint</li>
			<li>Prettier</li>
			<li>Stylelint</li>
			<li>Husky</li>
			<li>Lint Staged</li>
			<li>Jest</li>
			<li>React Testing Library</li>
		</ul>

		<p>
			<a href="https://github.com/unkleho/next-starter-kit">
				https://github.com/unkleho/next-starter-kit
			</a>
		</p>

		<p>
			By <a href="https://twitter.com/unkleho">@unkleho</a>
		</p>
	</App>
);

export default Home;
