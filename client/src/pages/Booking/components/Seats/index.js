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
      let seat = e.target.innerText;
      let price = data.price;
      dispatch(updateBookingAction(seat, price, e));
    }
  };

  const onAlertExistSeat = (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
      alert('Không thể chọn ghế này!');
    }
  };

  useEffect(() => {
    dispatch(getShowtimeSeatsAction(data.id));

    return () => {
      dispatch({
        type: 'REMOVE_SEATS',
      });
    };
  }, [dispatch, data]);

  return (
    <>
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
                    onClick={code.isReserved ? onAlertExistSeat : onClickSeat}>
                    {code.seat}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="d-flex justify-content-center mt-3">
        <div className="d-flex justify-content-center align-items-center">
          <div className="seat normal-occupied"></div>
          <label>Ghế</label>
        </div>
        <div className="d-flex justify-content-center align-items-center mx-4">
          <div className="seat selected-occupied"></div>
          <label>Đang chọn</label>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <div className="seat occupied"></div>
          <label>Không thể chọn</label>
        </div>
      </div>
    </>
  );
}

export default Seats;
