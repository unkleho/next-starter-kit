import Link from '../Link';
import './Header.css';

export default ({ pathname }) => {
	const menuItems = [
		{ name: 'Home', url: '/' },
		{ name: 'Example Page', url: '/example-page' },
	];

	return (
		<header className="header">
			{menuItems.map((item) => {
				return (
					<Link to={item.url} key={item.url}>
						{/* eslint-disable jsx-a11y/anchor-is-valid */}
						<a className={pathname === item.url ? 'is-active' : undefined}>
							{item.name}
						</a>
					</Link>
				);
			})}
		</header>
	);
};
