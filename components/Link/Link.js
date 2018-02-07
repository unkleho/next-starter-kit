import { Link } from '../../routes';

export default (props) => {
	return <Link {...props}>{props.children}</Link>;
};
