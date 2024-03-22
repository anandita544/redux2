// SignupPage.js
import React, { useReducer } from 'react';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
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

const SignupPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'updateField', field: name, value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName, email, contact, password, confirmPassword } = state;

        // Validate form fields
        if (!firstName || !lastName || !email || !contact || !password || !confirmPassword) {
            dispatch({ type: 'setError', error: 'All fields are required' });
            return;
        }

        if (password !== confirmPassword) {
            dispatch({ type: 'setError', error: 'Passwords do not match' });
            return;
        }

        // Store data in local storage or send to backend
        const user = {
            firstName,
            lastName,
            email,
            contact,
            password
        };
        localStorage.setItem('user', JSON.stringify(user));

        // Optionally, you can send the data to the backend here

        console.log('User signed up:', user);
        // Reset the form fields
        dispatch({ type: 'updateField', field: 'firstName', value: '' });
        dispatch({ type: 'updateField', field: 'lastName', value: '' });
        dispatch({ type: 'updateField', field: 'email', value: '' });
        dispatch({ type: 'updateField', field: 'contact', value: '' });
        dispatch({ type: 'updateField', field: 'password', value: '' });
        dispatch({ type: 'updateField', field: 'confirmPassword', value: '' });
        dispatch({ type: 'setError', error: '' });
    };

    return (
        <div>
            <h2>Signup Page</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="First Name" value={state.firstName} onChange={handleChange} />
                <input type="text" name="lastName" placeholder="Last Name" value={state.lastName} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" value={state.email} onChange={handleChange} />
                <input type="text" name="contact" placeholder="Contact" value={state.contact} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={state.password} onChange={handleChange} />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={state.confirmPassword} onChange={handleChange} />
                <button type="submit">Submit</button>
                {state.error && <p>{state.error}</p>}
            </form>
        </div>
    );
};

export default SignupPage;
