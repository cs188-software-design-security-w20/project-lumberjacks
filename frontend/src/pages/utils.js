export const customSetError = (err, setError) => {
  if (Object.keys(err).includes('errorResponse')) {
    setError(err.errorResponse);
  } else {
    setError('Unknown Error');
  }
};
