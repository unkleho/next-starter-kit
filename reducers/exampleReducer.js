const exampleInitialState = {
	count: 0,
};

// REDUCERS
export default (state = exampleInitialState, action) => {
	switch (action.type) {
		case 'EXAMPLE_ACTION':
			console.log('EXAMPLE_ACTION');
			return state;
		case 'ADD':
			return {
				...state,
				count: state.count + 1,
			};
		default:
			return state;
	}
};
