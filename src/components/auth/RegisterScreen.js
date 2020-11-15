import React from 'react';
import validator from 'validator';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {
    const [values, handleChange] = useForm({
        name: 'Juan',
        email: 'juan@gmail.com',
        password: '123456',
        confirmPassword: '123456',
    });

    const { name, email, password, confirmPassword } = values;

    const dispatch = useDispatch();

    const ui = useSelector((state) => state.ui);

    const handleRegister = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isValidForm()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }
    };

    const isValidForm = () => {
        if (/^\s*$/.test(name)) {
            dispatch(setError('Name cannot be empty'));
            return false;
        }
        if (!validator.isEmail(email)) {
            dispatch(setError('Email must be valid'));
            return false;
        }
        if (password.trim().length <= 5) {
            dispatch(setError('Password must be at least 6 characters'));
            return false;
        }
        if (password !== confirmPassword) {
            dispatch(setError("Passwords don't match"));
            return false;
        }
        dispatch(removeError());
        return true;
    };

    const handleRedirect = () => {
        dispatch(removeError());
    };

    return (
        <>
            <h1 className="auth__title">Register</h1>
            {ui.msgError && (
                <Alert severity="error" style={{ marginBottom: '1rem' }}>
                    {ui.msgError}
                </Alert>
            )}
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    autoComplete="off"
                    className="auth__input"
                    value={name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    autoComplete="off"
                    className="auth__input"
                    value={email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="auth__input"
                    value={password}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    className="auth__input"
                    value={confirmPassword}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={ui.loading}
                >
                    Create account
                </button>
                <div className="mt-1">
                    <Link
                        to="/auth/login"
                        className="link"
                        onClick={handleRedirect}
                    >
                        Already have an account?
                    </Link>
                </div>
            </form>
        </>
    );
};
