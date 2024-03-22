// LoginPage.js
import React, { useReducer } from 'react';

const initialState = {
    email: '',
    password: '',
    error: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'updateField':
            return { ...state, [action.field]: action.value };
        case 'setError':
            return { ...state, error: action.error };
        default:
            return state;
    }
};

const LoginPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'updateField', field: name, value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = state;

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.email === email && parsedUser.password === password) {

                console.log('Login successful');
            } else {

                dispatch({ type: 'setError', error: 'Invalid email or password' });
            }
        } else {
            dispatch({ type: 'setError', error: 'User not found' });
        }
    };

    return (
        <div>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={state.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={state.password} onChange={handleChange} />
                <button type="submit">Submit</button>
                {state.error && <p>{state.error}</p>}
            </form>
        </div>
    );
};

export default LoginPage;
