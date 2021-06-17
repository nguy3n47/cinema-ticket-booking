import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { resetPasswordAction } from './../../../redux/actions/authActions';

function ResetPassword(props) {
  const isVerifyCodeResetPassword = props.location.state;
  const { register, handleSubmit } = useForm();
  const isReset = useSelector((state) => state.auth.isReset);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (isReset) {
      toast.success('Phục hồi mật khẩu thành công!');
      history.push('/');
    }
  }, [history, isReset]);

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Mật khẩu không khớp!');
    } else {
      console.log('Call API');
      dispatch(resetPasswordAction(data));
    }
  };

  if (!isVerifyCodeResetPassword) {
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
            <h3 className="text-center">Nhập mật khẩu mới</h3>
            <input type="text" autoComplete="username" hidden></input>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                autoComplete="new-password"
                {...register('password')}
                placeholder="password"
              />
              <label htmlFor="passwordInput">Mật khẩu mới</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                autoComplete="confirm-new-password"
                {...register('confirmPassword')}
                placeholder="confirmPassword"
              />
              <label htmlFor="newpasswordInput">Xác nhận mật khẩu mới</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary color-primary" type="submit">
              Đồng ý
            </button>
            <hr className="my-4" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
