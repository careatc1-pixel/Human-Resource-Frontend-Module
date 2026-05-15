import { refreshAccessToken } from '@/services/users';
import axios, { AxiosHeaders, AxiosInstance } from 'axios';
const BASE_URL = '/api';
const clientCache: Record<string, AxiosInstance> = {};

export const SESSION_TIMEOUT = 30 * 60 * 1000;
let sessionTimer: ReturnType<typeof setTimeout> | null = null;

export function startSessionTimer() {
  if (sessionTimer) clearTimeout(sessionTimer);
  sessionTimer = setTimeout(() => {
    logoutUser();
  }, SESSION_TIMEOUT);
}

export function logoutUser() {
  if (typeof window !== 'undefined') {
    sessionStorage.clear();

    document.cookie = 'accessToken=; path=/; max-age=0;';
    document.cookie = 'refreshToken=; path=/; max-age=0;';

    if (window.location.pathname !== '/en/login') {
      window.location.href = '/en/login';
    }
  }
}

export function setAuthTokens(accessToken: string, refreshToken: string) {
  if (typeof window === 'undefined') return;

  sessionStorage.setItem('accessToken', accessToken);
  sessionStorage.setItem('refreshToken', refreshToken);

  document.cookie = `accessToken=${accessToken}; path=/; max-age=${60 * 60};`;
  document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${60 * 60 * 24 * 7};`;

  startSessionTimer();
}

if (typeof window !== 'undefined' && sessionStorage.getItem('accessToken')) {
  startSessionTimer();
}
function attachSharedInterceptors(client: AxiosInstance) {
  let isRefreshing = false;

  let failedQueue: {
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
  }[] = [];

  const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((promise) => {
      if (error) {
        promise.reject(error);
      } else if (token) {
        promise.resolve(token);
      }
    });

    failedQueue = [];
  };


  client.interceptors.request.use(
    (config) => {
      if (typeof window !== 'undefined') {
        const token = sessionStorage.getItem('accessToken');
        if (token) {
          const headers = new AxiosHeaders(config.headers);
          headers.set('Authorization', `Bearer ${token}`);
          config.headers = headers;
          startSessionTimer();
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );


  client.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config;

      if (error?.response?.status === 401 && !originalRequest?._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve,
              reject,
            });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;

              return client(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;

        isRefreshing = true;

        try {
          const refreshToken = sessionStorage.getItem('refreshToken');

          if (!refreshToken) {
            logoutUser();

            return Promise.reject(error);
          }

          const response = await refreshAccessToken();

          const newAccessToken = response.access_token;

          const newRefreshToken = response.refresh_token;

          setAuthTokens(newAccessToken, newRefreshToken);

          processQueue(null, newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return client(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);

          logoutUser();

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      if (
        typeof error?.response?.data === 'string' &&
        error.response.data.includes('<!DOCTYPE html>')
      ) {
        const matches = error.response.data.match(/<pre>Error: ([^<]+)<br>/);

        if (matches && matches[1]) {
          error.message = matches[1].trim();
        }
      }

      return Promise.reject(error);
    }
  );
}
function createClient(service: string, attachInterceptors = true) {
  const client = axios.create({
    baseURL: `${BASE_URL}/${service}`,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });

  if (attachInterceptors) attachSharedInterceptors(client);
  return client;
}

export function getAPI(service: string, withInterceptors = true): AxiosInstance {
  const key = service.toLowerCase();
  const cacheKey = `${key}|${withInterceptors ? 'with' : 'without'}`;

  if (clientCache[cacheKey]) return clientCache[cacheKey];

  const client = createClient(key, withInterceptors);
  clientCache[cacheKey] = client;
  return client;
}

export let baseAPI: AxiosInstance = getAPI('alarms');
clientCache['DEFAULT'] = baseAPI;

export function setBaseAPI(service: string) {
  const client = getAPI(service);
  baseAPI = client;
  clientCache['DEFAULT'] = client;
}

export function getBaseAPI(): AxiosInstance {
  return baseAPI;
}

export default baseAPI;