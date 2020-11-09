import React from 'react';
import { Link } from 'react-router-dom';

export const LoginScreen = () => {
    return (
        <>
            <h1 className="auth__title">Login</h1>
            <form>
                <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="auth__input"
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="auth__input"
                />
                <button type="submit" className="btn btn-primary btn-block">
                    Login
                </button>
                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div className="google-btn">
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
                <Link to="/auth/register" className="link">
                    Create new account
                </Link>
            </form>
        </>
    );
};
