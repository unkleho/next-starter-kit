import Router, { useRouter } from 'next/router';

/* Necessary to mock Next's router */
// https://github.com/zeit/next.js/issues/1827#issuecomment-323721221

const actionWithPromise = (path, route) => {
	// console.log(path, route);

	// we need to return promise because it is needed by Link.linkClicked
	return new Promise((resolve, reject) => reject());
};

const mockedRouter = {
	// This lets us spy on the push() function and get its args.
	push: jest.fn().mockImplementation(() => Promise.resolve()),
	replace: actionWithPromise,
	prefetch: () => {},
	route: '/mock-route',
};

Router.router = mockedRouter;

export { useRouter };

export default Router;
