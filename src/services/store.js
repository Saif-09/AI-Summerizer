import { configureStore } from '@reduxjs/toolkit';
import { articleApi } from './article'; // Import API definition

// Configure and create the Redux store
export const store = configureStore({
    reducer: {
        // Set up a reducer using the API reducer and its associated reducer path
        [articleApi.reducerPath]: articleApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        // Extend the default middleware with the API middleware
        getDefaultMiddleware().concat(articleApi.middleware)
});
