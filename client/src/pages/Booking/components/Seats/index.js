import React, { useEffect } from 'react';
import './styles.scss';

function Seats() {
  useEffect(() => {
    const container = document.querySelector('#seats-container');
    //const seats = document.querySelectorAll('.row-seat .seat:not(.occupied)');

    container.addEventListener('click', (e) => {
      if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        let seat = e.target.innerText;
        if (array_seats.includes(e.target.innerText)) {
          array_seats = array_seats.filter((item) => item !== seat);
        } else {
          array_seats.push(seat);
        }

        console.log(array_seats);
      }
    });

    let array_seats = [];
  });

  return (
    <div className="container w-75" id="seats-container">
      <img className="screen mb-3" alt="screen" src="https://i.imgur.com/VDoCPqg.png" />
      <div className="d-flex justify-content-center row-seat">
        <div className="seat">A1</div>
        <div className="seat">A2</div>
        <div className="seat">A3</div>
        <div className="seat">A4</div>
        <div className="seat">A5</div>
        <div className="seat">A6</div>
        <div className="seat">A7</div>
        <div className="seat">A8</div>
        <div className="seat">A9</div>
        <div className="seat">A10</div>
        <div className="seat">A11</div>
        <div className="seat">A12</div>
        <div className="seat">A13</div>
        <div className="seat">A14</div>
      </div>

      <div className="d-flex justify-content-center row-seat">
        <div className="seat">B1</div>
        <div className="seat">B2</div>
        <div className="seat occupied">X</div>
        <div className="seat">B4</div>
        <div className="seat">B5</div>
        <div className="seat">B6</div>
        <div className="seat">B7</div>
        <div className="seat">B8</div>
        <div className="seat">B9</div>
        <div className="seat">B10</div>
        <div className="seat">B11</div>
        <div className="seat">B12</div>
        <div className="seat">B13</div>
        <div className="seat occupied">X</div>
      </div>

      <div className="d-flex justify-content-center row-seat">
        <div className="seat">C1</div>
        <div className="seat">C2</div>
        <div className="seat">C3</div>
        <div className="seat">C4</div>
        <div className="seat">C5</div>
        <div className="seat">C6</div>
        <div className="seat">C7</div>
        <div className="seat occupied">X</div>
        <div className="seat">C9</div>
        <div className="seat">C10</div>
        <div className="seat">C11</div>
        <div className="seat">C12</div>
        <div className="seat">C13</div>
        <div className="seat">C14</div>
      </div>

      <div className="d-flex justify-content-center row-seat">
        <div className="seat">D1</div>
        <div className="seat">D2</div>
        <div className="seat">D3</div>
        <div className="seat">D4</div>
        <div className="seat">D5</div>
        <div className="seat">D6</div>
        <div className="seat">D7</div>
        <div className="seat">D8</div>
        <div className="seat">D9</div>
        <div className="seat">D10</div>
        <div className="seat">D11</div>
        <div className="seat">D12</div>
        <div className="seat">D13</div>
        <div className="seat">D14</div>
      </div>
    </div>
  );
}

export default Seats;
