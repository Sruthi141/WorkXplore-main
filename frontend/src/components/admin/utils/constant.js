// src/utils/constant.js

// ✅ Use Vite env if available, fallback to localhost
export const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const USER_API_END_POINT = `${BASE_URL}/api/v1/users`;
export const JOB_API_END_POINT = `${BASE_URL}/api/v1/job`;
export const COMPANY_API_END_POINT = `${BASE_URL}/api/v1/company`;
export const APPLICATION_API_END_POINT = `${BASE_URL}/api/v1/application`;
export const ADMIN_API_END_POINT = `${BASE_URL}/api/v1/admin`;