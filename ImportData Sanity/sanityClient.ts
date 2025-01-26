import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config();
export const client = createClient({
    projectId: process.env.projectId, // Replace with your Sanity project ID
    dataset: process.env.dataset, // Replace with your dataset name
    apiVersion: '2021-08-31',
    useCdn: true,
    token: process.env.token, // Replace with your Sanity API token
  });
  

  