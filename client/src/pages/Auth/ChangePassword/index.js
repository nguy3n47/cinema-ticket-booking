import React from 'react';
import { useSelector } from 'react-redux';
import { getUserSelector } from '../../../redux/selectors/authSelector';
import { Redirect } from 'react-router-dom';
import { Container, Row, Image, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function ChangePassword() {
  const user = useSelector(getUserSelector);
  const { register, handleSubmit } = useForm();

  const onSubmitData = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('Mật khẩu mới không khớp!');
    } else {
      console.log('Call API');
    }
  };

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <main className="flex-shrink-0">
      <Container className="w-60">
        <div className="d-flex flex-column align-items-center mt-2">
          <Image className="img-cover rounded-circle" src={user.avatar} width={180} height={180} />
          <h3>{user.fullname}</h3>
        </div>
        <Form id="form-edit" onSubmit={handleSubmit(onSubmitData)}>
          <Row className="mt-2 form-padding">
            <Form.Group>
              <Form.Label className="form-group required control-label">
                Mật khẩu hiện tại
              </Form.Label>
              <Form.Control
                type="password"
                {...register('currentPassword')}
                autoComplete="current-password"
                required
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label className="form-group required control-label">Mật khẩu mới</Form.Label>
              <Form.Control
                type="password"
                {...register('newPassword')}
                autoComplete="new-password"
                required
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label className="form-group required control-label">
                Xác nhận mật khẩu mới
              </Form.Label>
              <Form.Control
                type="password"
                {...register('confirmPassword')}
                autoComplete="confirm-new-password"
                required
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <button
                type="submit"
                form="form-edit"
                className="btn btn-primary color-primary w-100">
                <div>
                  <span>Đổi mật khẩu</span>
                </div>
              </button>
            </Form.Group>
          </Row>
        </Form>
      </Container>
    </main>
  );
}

export default ChangePassword;
