import React, { useEffect } from 'react';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getShowtimeSeatsSelector } from '../../../../redux/selectors/showtimeSelector';
import { getShowtimeSeatsAction } from '../../../../redux/actions/showtimeActions';
import { updateBookingAction } from '../../../../redux/actions/bookingActions';

function Seats(props) {
  const { data } = props;
  const seats = useSelector(getShowtimeSeatsSelector);
  const dispatch = useDispatch();

  const onClickSeat = (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
      e.target.classList.toggle('selected');

      let seat = e.target.innerText;
      let price = data.price;

      dispatch(updateBookingAction(seat, price));
    }
  };

  useEffect(() => {
    dispatch(getShowtimeSeatsAction(data.id));
  }, [dispatch, data]);

  return (
    <div className="mt-3" id="seats-container">
      <img className="screen mb-4" alt="screen" src="https://i.imgur.com/VDoCPqg.png" />

      {seats.map((row, i) => {
        return (
          <div key={i} className="row-seat justify-content-center">
            {row.array.map((code, r) => {
              return (
                <div
                  key={r}
                  className={code.isReserved ? 'seat occupied' : 'seat'}
                  onClick={onClickSeat}>
                  {code.isReserved ? 'X' : code.seat}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Seats;
