import axios, { AxiosError } from "axios";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Extracts a user-friendly error message from an unknown error,
 * prioritizing Axios response error payloads.
 */
export const getApiErrorMessage = (
  error: unknown,
  fallback = "An unexpected error occurred"
): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { error?: string; message?: string }
      | undefined;
    if (data?.error) return data.error;
    if (data?.message) return data.message;
    if (error.message) return error.message;
  } else if (error instanceof Error) {
    return error.message;
  }
  return fallback;
};

export default api;
export { axios };
