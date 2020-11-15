import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import Alert from '@material-ui/lab/Alert';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const ui = useSelector((state) => state.ui);

    const [formValues, handleInputChange] = useForm({
        email: 'juan@gmail.com',
        password: '123456',
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isValidForm()) {
            dispatch(startLoginEmailPassword(email, password));
        }
    };

    const handleGoogleLogin = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(startGoogleLogin());
    };

    const isValidForm = () => {
        if (!validator.isEmail(email)) {
            dispatch(setError('Email must be valid'));
            return false;
        }
        if (/^\s*$/.test(password)) {
            dispatch(setError('Password must be entered'));
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
            <h1 className="auth__title">Login</h1>
            {ui.msgError && (
                <Alert severity="error" style={{ marginBottom: '1rem' }}>
                    {ui.msgError}
                </Alert>
            )}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="auth__input"
                    value={email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={ui.loading}
                >
                    Login
                </button>
                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div
                        className={
                            ui.loading ? 'google-btn disabled' : 'google-btn'
                        }
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img
                                className="google-icon"
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                alt="google button"
                            />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with Google</b>
                        </p>
                    </div>
                </div>
                <Link
                    to="/auth/register"
                    className="link"
                    onClick={handleRedirect}
                >
                    Create new account
                </Link>
            </form>
        </>
    );
};
