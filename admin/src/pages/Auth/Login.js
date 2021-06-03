import React from 'react';
import { useForm } from 'react-hook-form';
import './styles.scss';
import { Container, Form, Button, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import { getUserSelector } from '../../redux/selectors/authSelector';
import { Redirect, useHistory } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function Login() {
  const currentUser = useSelector(getUserSelector);

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(login(data));
    history.push('/');
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <section id="cover" className="min-vh-100">
      <div>
        <Toaster />
      </div>
      <Container>
        <Row>
          <Col className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
            <Image
              className="mb-3"
              width={90}
              height={90}
              src="https://play-lh.googleusercontent.com/dVQ6d8I7XDOkr72-jcAUHsCfQ_ih9p9HUaca82obM6LlmJOKAA8BuY776Xns40Nifg"
              roundedCircle
            />

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Control
                  size="lg"
                  {...register('email')}
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  size="lg"
                  {...register('password')}
                  type="password"
                  placeholder="Password"
                  autoComplete="password"
                  required
                />
              </Form.Group>

              <Button id="button-default" type="submit">
                SIGN IN
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Login;
