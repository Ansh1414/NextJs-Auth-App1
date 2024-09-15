// store/store.js
import { configureStore } from '@reduxjs/toolkit';
//import { createWrapper } from 'next-redux-wrapper';
import userReducer from './userSlice'; // Import the user slice

// Create the Redux store
const store = configureStore({
    reducer: {
      user: userReducer, // Add the user reducer here
    },
  });

// Export an instance of the wrapper to be used in _app.js
export {store}// createWrapper(makeStore); support both ssr and csr
