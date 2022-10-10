import { Strings } from "../resources/strings";

const URL_API = process.env.REACT_APP_API;
const URL_HOST = process.env.HOST_APP_API;

const CommonCall = async (api, header) => {
  const STRINGS = Strings[localStorage.getItem("lang")];
  try {
    //   const accessToken = Auth.getAccessToken();
    let headers;
    // if (accessToken) {
    headers = {
      // Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Request-Headers": "*",
    };
    // } else {
    //   headers = {
    //     Accept: "application/json",
    //   };
    // }
    if (header && (header.method === "POST" || header.method === "PUT")) {
      headers = {
        ...headers,
        "Content-Type": "application/json",
      };
    }
    let head = {
      ...header,
      headers,
    };
    const response = await fetch(api, {
      ...head,
      credentials: "omit",
    });

    if (response.status === 500) {
      return {
        code: response.status,
        message: STRINGS.server_error,
        success: false,
      };
    }
    if (response.status === 200) {
      return await response.json();
    }
    //   if (response.status === 401) {
    //     //refresh token
    //     const resToken = await refreshToken();
    //     console.log("resToken", resToken);
    //     if (resToken.success) {
    //       const newHeaders = {
    //         ...headers,
    //         Authorization: `Bearer ${resToken.access_token}`,
    //         "Content-Type": "application/json",
    //         Accept: "application/json",
    //         "Access-Control-Request-Headers": "*",
    //       };
    //       const newHead = {
    //         ...head,
    //         headers: newHeaders,
    //       };
    //       const responseRefeshToken = await fetch(api, newHead);
    //       const resultRefeshToken = await responseRefeshToken.json();
    //       return resultRefeshToken;
    //     } else {
    //       return {
    //         code: response.code,
    //         success: false,
    //       };
    //     }
    //   } else {
    //     const resJson = await response.json();
    //     return {
    //       code: resJson.status,
    //       message: resJson.message,
    //       success: false,
    //     };
    //   }
  } catch (error) {
    return {
      success: false,
      message: STRINGS.network_error,
    };
  }
};

const FetchApi = {
  login: async (data) => {
    const header = {
      method: "POST",
      body: JSON.stringify(data),
    };
    const api = `${URL_API}/public/login`;
    const result = await CommonCall(api, header);
    return result;
  },
  getUsers: async (size) => {
    const header = {
      method: "GET",
    };
    const api = `${URL_API}?results=${size}`;
    const result = await CommonCall(api, header);
    return result;
  },
};

export { FetchApi };
