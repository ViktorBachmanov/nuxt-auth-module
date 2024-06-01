import { ofetch } from "ofetch";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const backendFetch = ofetch.create({
  baseURL: backendURL,
  headers: {
    Accept: "application/json",
  },
  // async onRequest({ request, options }) {
  //   console.log("request: ", request);
  //   console.log("headers: ", options.headers);
  //   console.log("query: ", options.query);
  // },
  // async onResponse({ request, response, options }) {
  //   // Log response
  //   console.log("[fetch response]", request, response.status, response);
  // },
});

export const backendFetchXSRF = ofetch.create({
  baseURL: backendURL,
  headers: {
    Accept: "application/json",
    Referer: backendURL as string,
    "X-XSRF-TOKEN": "",
  },
  async onRequest({ request, options }) {
    // Set the request headers
    options.headers = options.headers || {};
    options.headers["X-XSRF-TOKEN"] = getXSRFCookie(
      useRequestHeaders(["cookie"])
    );
    // console.log("headers: ", options.headers);
  },
  // async onResponseError({ request, response, options }) {
  // Log response
  // console.log("[onResponseError]", request, response.status, response);
  // switch (response.status) {
  // case 403:
  // console.log("[response._data.message]", response._data.message);
  // if (response._data.message == "Your email address is not verified.") {
  //   useAuthDialog().value = "emailVerificationDialog";
  // }
  // break;
  // case 401:
  // case 419:
  //   // console.log("[request]", request.toString());
  //   if (
  //     !request.toString().endsWith("/api/login") &&
  //     !request.toString().endsWith("/api/logout")
  //   ) {
  //     // useToast().error(
  //     //   "Время действия сессии истекло. Авторизуйтесь заново.",
  //     //   {
  //     //     duration: 5000,
  //     //     dismissible: true,
  //     //   }
  //     // );
  //     useState("loginDialogOpened").value = true;
  //   }
  //   break;
  // }
  // },
});

function getXSRFCookie(header: any): string {
  const cookies = getCookies(header);

  let xsrfCookie = cookies
    .split("; ")
    .find((row: string) => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];

  if (xsrfCookie) {
    xsrfCookie = decodeURIComponent(xsrfCookie);
  }

  return xsrfCookie || "error";
}

function getCookies(cookieHeader: any) {
  return cookieHeader?.cookie || document?.cookie;
}
