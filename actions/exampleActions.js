export const exampleAction = (payload) => {
	return {
		type: 'EXAMPLE_ACTION',
		payload,
	};
};

export const addCount = () => (dispatch) => {
	return dispatch({ type: 'ADD' });
};
