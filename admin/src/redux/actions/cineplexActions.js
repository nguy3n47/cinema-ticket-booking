import cineplexApi from '../../api/cineplexApi';

export const getAllCineplexs = () => async (dispatch) => {
  try {
    const response = await cineplexApi.getAll();
    dispatch({
      type: 'GET_CINEPLEX_SUCCESS',
      payload: response.cineplexs,
    });
  } catch (error) {
    dispatch({
      type: 'GET_CINEPLEX_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCineplex = (data) => async (dispatch) => {
  try {
    await cineplexApi.create(data);
    dispatch({
      type: 'CREATE_CINEPLEX_SUCCESS',
    });

    const response = await cineplexApi.getAll();
    dispatch({
      type: 'GET_CINEPLEX_SUCCESS',
      payload: response.cineplexs,
    });
  } catch (error) {
    dispatch({
      type: 'CREATE_CINEPLEX_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCineplex = (data, id) => async (dispatch) => {
  try {
    await cineplexApi.update(data, id);
    dispatch({
      type: 'UPDATE_CINEPLEX_SUCCESS',
    });

    const response = await cineplexApi.getAll();
    dispatch({
      type: 'GET_CINEPLEX_SUCCESS',
      payload: response.cineplexs,
    });
  } catch (error) {
    dispatch({
      type: 'UPDATE_CINEPLEX_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeCineplex = (id) => async (dispatch) => {
  try {
    await cineplexApi.delete(id);
    dispatch({
      type: 'DELETE_CINEPLEX_SUCCESS',
      payload: { cineplexId: id },
    });
  } catch (error) {
    dispatch({
      type: 'DELETE_CINEPLEX_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
