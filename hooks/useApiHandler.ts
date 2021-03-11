import { useState } from 'react';

export const useApiHandler = apiCall => {
  const [reqState, setReqState] = useState({
    error: null,
    data: null,
    loading: false,
  });

  const handler = async (...data) => {
    // Initialize the state
    setReqState({ error: null, data: null, loading: true });

    // Make the req to apiCall
    try {
      const json = await apiCall(...data);

      setReqState({ error: null, data: json.data?.data, loading: false });
      // data is can be a success message or the submitted json data
    } catch (err) {
      // console.log(err);
      // Manage error
      const message =
        (err.response && err.response.data) || `Something went wrong...`;
      setReqState({ error: message, data: null, loading: false });
    }
  };

  return [handler, { ...reqState }];
};
