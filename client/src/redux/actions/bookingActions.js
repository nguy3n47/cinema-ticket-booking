export const updateBookingAction = (seat, price) => async (dispatch, getState) => {
  let { seats, total } = getState().booking;

  if (seats.includes(seat)) {
    seats = seats.filter((item) => item !== seat);
    total -= price;
  } else {
    seats.push(seat);
    total += price;
  }

  dispatch({
    type: 'UPDATE_BOOKING',
    payload: { total, seats },
  });
};
