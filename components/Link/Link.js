import { Link } from '../../routes';
// import Link from 'next/link';

export default (props) => {
	return <Link {...props}>{props.children}</Link>;
};
