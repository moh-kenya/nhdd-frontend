let debug = process.env.APP_ENV || false;
let api_url = process.env.NEXT_PUBLIC_API_URL;
import Cookies from "js-cookie";

export const doPasswordReset = async (
  email,
  password,
  password_confirmation,
  token,
  rtr
) => {
  if (typeof window !== "undefined") {
    return fetch(api_url + "/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, password_confirmation, token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === false) {
          return data;
        } else {
          // rtr.push('/login', undefined, { unstable_skipClientCache: true })
          return data;
        }
      })
      .catch((err) => {
        return err;
      });
  }
};

export const doLogin = async (username, password, rtr) => {
  if (typeof window !== "undefined") {
    // clear session storage
    Cookies.remove("isLoggedIn", { path: "/" });
    Cookies.remove("user", { path: "/" });
    Cookies.remove("token", { path: "/" });

    return fetch(api_url + "/users/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Set isLoggedIn, token, and user cookies
        Cookies.set("isLoggedIn", "true", {
          path: "/",
          expires: 7 /* additional options */,
        });
        Cookies.set("token", data.token, {
          path: "/",
          expires: 7 /* additional options */,
        });
        // get user details
        return fetch(api_url + "/user/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data?.username) {
              // store user in cookie
              Cookies.set("user", JSON.stringify(userData), {
                path: "/",
                expires: 7 /* additional options */,
              });
              // redirect to admin or user dashboard
              // TODO: check user role and redirect accordingly
              if (rtr) {
                rtr.push("/user", undefined, {
                  unstable_skipClientCache: true,
                });
              } else {
                window.location.pathname = "/user";
              }
              window.location.reload();
            } else {
              handleLoginError();
            }
            return data;
          })
          .catch((error) => {
            return error;
          });
      })
      .catch((err) => {
        return err;
      });
  } else {
    console.error("window is undefined");
    handleLoginError();
  }
};

const handleLoginError = () => {
  // Remove cookies and redirect to login
  Cookies.remove("isLoggedIn", { path: "/" });
  Cookies.remove("user", { path: "/" });
  Cookies.remove("token", { path: "/" });
  rtr.push("/auth/login", undefined, { unstable_skipClientCache: true });
};

export const doLogout = async (rtr) => {
  if (typeof window !== "undefined") {
    // clear session storage
    Cookies.remove("isLoggedIn", { path: "/" });
    Cookies.remove("user", { path: "/" });
    Cookies.remove("token", { path: "/" });

    fetch(api_url + "/users/logout/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${tkn}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          window.location.reload();
        } else {
          // show error
        }
        if (rtr) {
          rtr.push("/", undefined, { unstable_skipClientCache: true });
        } else {
          window.location.pathname = "/";
        }
        // return data
      })
      .catch((err) => {
        if (rtr) {
          rtr.push("/auth/login", undefined, {
            unstable_skipClientCache: true,
          });
          rtr.reload();
        } else {
          window.location.href = "/auth/login";
        }
        // return err
      });
  }
};

export const doGetSession = async () => {
  if (typeof window !== "undefined") {
    let isLoggedIn = Cookies.get("isLoggedIn") == "true" ? true : false;
    if (!isLoggedIn || isLoggedIn == "false") {
      return null;
    }
    const tkn = Cookies.get("token");
    if (!tkn) return null;
    return fetch(api_url + "/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tkn,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // if (data) {
        if (data?.username) {
          // return user info
          let session = {
            user: data,
            isLoggedIn: true,
            token: tkn,
          };
          return session;
        }
        // }
      })
      .catch((error) => {});
  } else {
  }
  return null;
};

export const doSignup = async (
  first_name,
  last_name,
  company,
  username,
  email,
  password
) => {
  if (typeof window !== "undefined") {
    // clear session storage
    Cookies.remove("isLoggedIn", { path: "/" });
    Cookies.remove("user", { path: "/" });
    Cookies.remove("token", { path: "/" });
    console.log(
      "pppp",
      JSON.stringify({
        first_name,
        last_name,
        company,
        username,
        email,
        password,
      })
    );
    let signup_api_url = api_url + "/users/signup";
    return fetch(signup_api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name,
        last_name,
        company,
        username,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === false) {
          return data;
        } else {
          return data;
        }
      })
      .catch((err) => {
        return err;
      });
  }
};

export const getResource = (resource, options) => {
  const tkn = Cookies.get("token") || "";
  // check if resource is a url
  let url;
  if (resource.startsWith("http://") || resource.startsWith("https://")) {
    url = resource;
  } else {
    url = api_url + "/" + resource;
  }
  let request_options = {};
  request_options.method = options?.method || "GET";
  request_options.headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + tkn,
    ...(options?.headers || {}),
  };
  if (options?.body) request_options.body = JSON.stringify(options?.body);
  return fetch(url, request_options).then((res) => res.json());
};

export const getResourceRaw = (resource, options) => {
  const tkn = Cookies.get("token") || "";
  // check if resource is a url
  let url;
  if (resource.startsWith("http://") || resource.startsWith("https://")) {
    url = resource;
  } else {
    url = api_url + "/" + resource;
  }
  let request_options = {};
  request_options.method = options?.method || "GET";
  request_options.headers = {
    Authorization: "Bearer " + tkn,
    ...(options?.headers || {}),
  };
  if (options?.body) request_options.body = options?.body;
  return fetch(url, request_options).then((res) => res.json());
};

export const formatdDate = (dateString) => {
  const dateObject = new Date(dateString);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Africa/Nairobi",
  }).format(dateObject);

  return formattedDate;
};
