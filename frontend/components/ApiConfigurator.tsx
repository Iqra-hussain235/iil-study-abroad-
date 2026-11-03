
"use client";

import axios from "axios";

const backendApiUrl = (
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.iilstudyabroad.com/api"
)
  .trim()
  .replace(/\/+$/, "");

function getUpdatedUrl(url: string) {
  if (url.startsWith("/api/")) {
    return url.replace(/^\/api/, backendApiUrl);
  }

  if (url.startsWith("http://localhost:5000/api/")) {
    return url.replace(
      /^http:\/\/localhost:5000\/api/,
      backendApiUrl
    );
  }

  return url;
}

if (typeof window !== "undefined") {
  axios.interceptors.request.use((config) => {
    if (config.url) {
      config.url = getUpdatedUrl(config.url);
    }
    return config;
  });

  if (!(window as any).__fetch_intercepted__) {
    (window as any).__fetch_intercepted__ = true;

    const originalFetch = window.fetch.bind(window);

    window.fetch = async (input, init) => {
      if (typeof input === "string") {
        return originalFetch(getUpdatedUrl(input), init);
      }

      if (input instanceof URL) {
        return originalFetch(getUpdatedUrl(input.toString()), init);
      }

      if (input instanceof Request) {
        const updatedUrl = getUpdatedUrl(input.url);

        if (updatedUrl !== input.url) {
          return originalFetch(
            new Request(updatedUrl, input),
            init
          );
        }
      }

      return originalFetch(input, init);
    };
  }
}

export default function ApiConfigurator() {
  return null;
}
