import React, { useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { forgotPasswordAction } from '../../../redux/actions/authActions';

function ForgotPassword() {
  const { register, handleSubmit } = useForm();
  const email = useSelector((state) => state.auth.email);
  const user = useSelector((state) => state.auth.user);
  const isForgotPassword = true;
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(forgotPasswordAction(data));
  };

  useEffect(() => {
    if (email) {
      history.push('/enter-code', [email, isForgotPassword]);
    }
  }, [history, email, isForgotPassword]);

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <div className="row align-items-center g-lg-5">
        <div className="col-lg-7 text-start">
          <img className="w-75" alt="cgvcinemas-logo" src="https://i.imgur.com/Lo5FKd6.png"></img>
          <p className="text-lg-start mt-3 fw-bold">
            Trải nghiệm điện ảnh chất lượng nhất tại cụm rạp CGV trên toàn quốc. <br></br>Trang
            thông tin tổng hợp lịch chiếu, trailers phim mới nhất tại CGV Cinemas Việt Nam.
          </p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 p-md-5 border rounded-3 bg-light">
            <h3>Phục hồi mật khẩu của bạn</h3>
            <p>Nhập địa chỉ email được liên kết với tài khoản CGV Cinemas của bạn.</p>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                {...register('email')}
                placeholder="name@example.com"
                required
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary color-primary" type="submit">
              Tiếp theo
            </button>
            <hr className="my-4" />
            <div className="d-flex justify-content-center">
              <Link className="text-link color-link-primary" to="/login">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  fill="currentColor"
                  className="bi bi-arrow-left-square"
                  viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                  />
                </svg>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
