// Import necessary dependencies from Redux Toolkit for API handling
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const rapidApiKey = import.meta.env.VITE_RAPID_ARTICLE_KEY;

// Create an API client using createApi from Redux Toolkit
export const articleApi = createApi({
    // Set a unique reducer path for the API
    reducerPath: 'articleApi',
    // Configure base query settings
    baseQuery: fetchBaseQuery({
        // Define the base URL for the RapidAPI service
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        // Prepare headers for the request
        prepareHeaders: (headers) => {
            // Set the RapidAPI key and host headers
            headers.set('X-RapidAPI-Key', rapidApiKey);
            headers.set('X-RapiAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');
        }
    }),
    // Define API endpoints
    endpoints: (builder) => ({
        // Create the getSummary endpoint using builder.query
        getSummary: builder.query({
            // Define the query function that constructs the URL for summarization
            query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
        })
    })
});

// Export the useLazyGetSummaryQuery hook from the articleApi
export const { useLazyGetSummaryQuery } = articleApi;
