import cineplexApi from './../../api/cineplexApi';

export const getAllCineplexsAction = () => async (dispatch) => {
  try {
    const response = await cineplexApi.getAll();
    if (!response.error) {
      dispatch({
        type: 'GET_CINEPLEXS_SUCCESS',
        payload: response.cineplexs,
      });
    } else {
      dispatch({
        type: 'GET_CINEPLEXS_FAIL',
        payload: response.error,
      });
    }
  } catch (error) {
    dispatch({
      type: 'GET_CINEPLEXS_FAIL',
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getCineplexItemAction = (id) => async (dispatch, getState) => {
  const cineplexs = getState().cineplex.data;
  const item = cineplexs.find((c) => c.id === id);
  dispatch({
    type: 'GET_CINEPLEX_ITEM',
    payload: item,
  });
};
