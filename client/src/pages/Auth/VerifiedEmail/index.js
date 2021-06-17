import React from 'react';
import { Redirect } from 'react-router-dom';

function VerifiedEmail(props) {
  const isVerified = props.location.state;

  if (!isVerified) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="110"
        height="110"
        fill="#4CAF50"
        className="bi bi-check2-circle"
        viewBox="0 0 16 16">
        <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
        <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
      </svg>
      <h2>Xác thực email thành công</h2>
      <a type="button" href="/" className="btn btn-danger">
        Tiếp tục
      </a>
    </div>
  );
}

export default VerifiedEmail;
