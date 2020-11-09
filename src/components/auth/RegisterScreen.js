import React from 'react';
import { Link } from 'react-router-dom';

export const RegisterScreen = () => {
    return (
        <>
            <h1 className="auth__title">Register</h1>
            <form>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    autoComplete="off"
                    className="auth__input"
                />
                <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    autoComplete="off"
                    className="auth__input"
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="auth__input"
                />
                <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="Confirm Password"
                    className="auth__input"
                />
                <button type="submit" className="btn btn-primary btn-block">
                    Create account
                </button>
                <div className="mt-1">
                    <Link to="/auth/login" className="link">
                        Already have an account?
                    </Link>
                </div>
            </form>
        </>
    );
};
