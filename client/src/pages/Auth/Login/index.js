import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { loginAction } from '../../../redux/actions/authActions';

function Login() {
  const { register, handleSubmit } = useForm();
  const isLogined = useSelector((state) => state.auth.isLogined);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(loginAction(data));
  };

  useEffect(() => {
    if (isLogined) {
      history.push('/');
    }
  }, [history, isLogined]);

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
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                autoComplete="password"
                id="floatingPassword"
                {...register('password')}
                placeholder="Password"
                required
              />
              <label htmlFor="floatingPassword">Mật khẩu</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary color-primary" type="submit">
              Đăng nhập
            </button>
            <hr className="my-4" />
            <p className="d-flex justify-content-between">
              <button type="button" className="btn btn-primary button-icon-size">
                <i className="bi bi-facebook icon-size"></i>
              </button>
              <button type="button" className="btn btn-dark button-icon-size">
                <i className="bi bi-github icon-size"></i>
              </button>
              <button type="button" className="btn btn-danger button-icon-size">
                <i className="bi bi-google icon-size"></i>
              </button>
            </p>
            <div className="d-flex justify-content-between">
              <Link className="text-link color-link" to="/forgot-password">
                <span>Quên mật khẩu?</span>
              </Link>
              <Link className="text-link color-link-primary" to="/register">
                <span>Đăng ký</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
