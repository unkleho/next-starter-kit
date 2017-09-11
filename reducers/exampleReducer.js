export default (state = {}, { type, payload }) => {
  switch (type) {
    case 'EXAMPLE_ACTION':
      console.log('EXAMPLE_ACTION', payload);

      return {
        ...state,
      };
    default:
      return state;
  }
};
