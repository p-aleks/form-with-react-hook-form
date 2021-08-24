import React from 'react';
import { useForm } from 'react-hook-form';
import { Col, Form, Row } from 'react-bootstrap';
import './style.scss';
import MyRadioLabelCard from '../UI/label/MyRadioLabelCard';
import { EyeIcon, FemaleIcon, MaleIcon, OtherIcon } from '../../assets';

const SignupForm = () => {
    const { formState: { errors }, handleSubmit, register, watch } = useForm();
    const [passwordVisible, setPasswordVisible] = React.useState({create: false, confirm: false});
    const password = React.useRef({});
    password.current = watch('password.create', '');

    const togglePasswordVisible = (e, field) => {
        e.stopPropagation();
        e.preventDefault();
        setPasswordVisible(state => {
            return {...state, [field]: !state[field]};
        });
    };

    const validateEmail = (value) => {
        const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return EMAIL_REGEX.test(value.toLowerCase()) || "Please, enter valid email address.";
    };

    const validatePassword = (value) => {
        return value === password.current || "Passwords do not match!";
    };

    const onSubmit = (data) => {
        alert(`
            Gender: ${data.gender || 'not specified'}\n
            Email: ${data.email}\n
            Password: ${data.password.create}
        `);
    };

    return (
        <div className="form">
            <div className="form_wrapper">
                <div className="form_heading">
                    <img src="/img/logo.png" alt="logo"/>
                    <h3>Sign Up with email</h3>
                </div>

                <Form className="form_body" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="form-group form_gender">
                        <Form.Label>
                            Gender
                        </Form.Label>
                        <fieldset className="form_gender_cardsWrapper">
                            <Form.Check
                                className="p-0"
                                type="radio"
                                label={
                                    <MyRadioLabelCard
                                        text="Male"
                                        Icon={MaleIcon}
                                    />
                                }
                                id="male"
                                name="gender"
                                value="male"
                                {...register("gender")}
                            />
                            <Form.Check
                                className="p-0"
                                type="radio"
                                label={
                                    <MyRadioLabelCard
                                        text="Female"
                                        Icon={FemaleIcon}
                                    />
                                }
                                id="female"
                                name="gender"
                                value="female"
                                {...register("gender")}
                            />
                            <Form.Check
                                className="p-0"
                                type="radio"
                                label={
                                    <MyRadioLabelCard
                                        text="Other"
                                        Icon={OtherIcon}
                                    />
                                }
                                id="other"
                                name="gender"
                                value="other"
                                {...register("gender")}
                            />
                        </fieldset>
                    </Form.Group>

                    <Form.Group className="form-group form_email" controlId="email">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="johnsmith@mail.com"
                            {...register("email", { required: "E-mail is required.", validate: validateEmail })}
                            isInvalid={errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email && errors.email.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <fieldset className="form_password">
                        <Form.Group className="form-group form_password-create" controlId="createPassword">
                            <Form.Label>Create Password</Form.Label>
                            <div className="form_password-inputWrapper">
                                <Form.Control
                                    type={passwordVisible.create ? 'text' : 'password'}
                                    placeholder="∗∗∗∗∗∗∗∗∗∗∗"
                                    {...register(
                                        "password.create",
                                        {
                                            required: "Password is required.",
                                            minLength: {
                                                value: 6,
                                                message: "Password should be 6 characters or longer."
                                            }
                                        }
                                    )}
                                    isInvalid={errors.password?.create}
                                />
                                <button onClick={(e) => togglePasswordVisible(e, 'create')}
                                        className={`form_password-showIcon ${passwordVisible.create ? 'active' : ''}`}>
                                    <EyeIcon/>
                                </button>
                                <Form.Control.Feedback type="invalid">
                                    {errors.password?.create && errors.password.create.message}
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>
                        <Form.Group className="form-group form_password-confirm" controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <div className="form_password-inputWrapper">
                                <Form.Control
                                    type={passwordVisible.confirm ? 'text' : 'password'}
                                    placeholder="∗∗∗∗∗∗∗∗∗∗∗"
                                    {...register(
                                        "password.confirm",
                                        {
                                            required: "Password confirmation is required.",
                                            validate: validatePassword
                                        }
                                    )}
                                    isInvalid={errors.password?.confirm || errors.password?.create}
                                />
                                <button onClick={(e) => togglePasswordVisible(e, 'confirm')}
                                        className={`form_password-showIcon ${passwordVisible.confirm ? 'active' : ''}`}>
                                    <EyeIcon/>
                                </button>
                                <Form.Control.Feedback type="invalid">
                                    {
                                        errors.password?.confirm
                                            ? errors.password.confirm.message
                                            : errors.password?.create && errors.password.create.message
                                    }
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>
                    </fieldset>

                    <Form.Group as={Row} className="form-group submit-group">
                        <Col>
                            <button className="form_submit_btn" type="submit">Sign up</button>
                        </Col>
                    </Form.Group>
                </Form>

                <div className="form_footer">
                    <p>Already have an account? <a href="#">Log in</a></p>
                    <p>Review privacy and disclosures <a href="#">here</a></p>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
