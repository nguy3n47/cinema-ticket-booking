import React from 'react';
import { Col, Container, Form, Image, Row, FloatingLabel, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../redux/actions/authActions';
import { getUserSelector } from '../../redux/selectors/authSelector';
import './styles.scss';

function Login() {
  const currentUser = useSelector(getUserSelector);

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(login(data, history));
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <section id="cover" className="min-vh-100">
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
                <FloatingLabel label="Email">
                  <Form.Control
                    {...register('email')}
                    type="email"
                    autoComplete="email"
                    placeholder="name@example.com"
                    required
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3">
                <FloatingLabel label="Password">
                  <Form.Control
                    {...register('password')}
                    type="password"
                    placeholder="Password"
                    autoComplete="password"
                    required
                  />
                </FloatingLabel>
              </Form.Group>

              <Button className="button-default" type="submit">
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
