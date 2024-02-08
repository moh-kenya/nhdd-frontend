let debug = process.env.APP_ENV || false;
let api_url = process.env.NEXT_PUBLIC_API_URL
let cookie_suffix = '';

export const doPasswordReset = async (email, password, password_confirmation, token, rtr) => {
    if (typeof window !== 'undefined') {
        return fetch(api_url + '/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, password_confirmation, token })
        }).then(res => res.json()).then(data => {
            if (data.status === false) {
                return data
            } else {
                // rtr.push('/login', undefined, { unstable_skipClientCache: true })
                return data
            }
        }).catch(err => {
            return err
        })
    }
}


export const doLogin = async (username, password, rtr) => {
    if (typeof window !== 'undefined') {
        // clear session storage
        document.cookie = `isLoggedIn=false; path=/;${cookie_suffix}`
        document.cookie = `user=; path=/;${cookie_suffix}`
        document.cookie = `token=; path=/;${cookie_suffix}`

        return fetch(api_url + '/users/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        }).then(res => res.json()).then(data => {
                // store isLoggedin in cookie
                document.cookie = `isLoggedIn=true; path=/;${cookie_suffix}`
                // store token in cookie
                document.cookie = `token=${data.token}; path=/;${cookie_suffix}`
                // get user details
                return fetch(api_url + '/user/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${data.token}`
                    }
                }).then(res => res.json()).then(data => {
                    if (data?.username) {
                        // store user in cookie
                        document.cookie = `user=${JSON.stringify({ ...data })}; path=/;${cookie_suffix}`
                        // redirect to admin or user dashboard
                        // TODO: check user role and redirect accordingly
                        if(rtr){
                            rtr.push('/user', undefined, { unstable_skipClientCache: true })
                        } else {
                            window.location.pathname = '/user'
                        }
                        window.location.reload()
                    } else {
                        // show error
                        // remove isLoggedIn cookie
                        document.cookie = `isLoggedIn=false; path=/;${cookie_suffix}`
                        // remove user cookie
                        document.cookie = `user=; path=/;${cookie_suffix}`
                        // remove token cookie
                        document.cookie = `token=; path=/;${cookie_suffix}`
                        rtr.push('/auth/login', undefined, { unstable_skipClientCache: true })
                    }
                    return data
                }).catch(error => {
                    return error
                })
        }).catch(err => {
            return err
        })
    } else {
        console.error('window is undefined')
    }
}



export const doLogout = async (rtr) => {
    if (typeof window !== 'undefined') {
        // clear session storage
        const tkn = getCookie('token')
        document.cookie = `isLoggedIn=false; path=/;${cookie_suffix}`
        document.cookie = `user=; path=/;${cookie_suffix}`
        document.cookie = `token=; path=/;${cookie_suffix}`

        fetch(api_url + '/users/logout/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${tkn}`
            }
        }).then(res => res.json()).then(data => {
            if (data) {
                window.location.reload()
            } else {
                // show error
            }
            if (rtr) {
                rtr.push('/', undefined, { unstable_skipClientCache: true })
            } else {
                window.location.pathname = '/'
            }
            // return data
        }).catch(err => {
            if (rtr) {
                rtr.push('/auth/login', undefined, { unstable_skipClientCache: true })
                rtr.reload()
            } else {
                window.location.href = '/auth/login'
            }
            // return err
        })
    }
}

export const doGetSession = async () => {
    if (typeof window !== 'undefined') {
        let isLoggedIn = getCookie('isLoggedIn') == 'true' ? true : false;
        if (!isLoggedIn || isLoggedIn == 'false') {
            return null;
        }
        const tkn = getCookie('token');
        if (!tkn) return null;
        return fetch(api_url + '/user/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tkn
            }
        }).then(res => res.json()).then(data => {
            // if (data) {
            if (data?.username) {
                // return user info
                let session = {
                    user: data,
                    isLoggedIn: true,
                    token: tkn,
                }
                return session
            }
            // }
        }).catch(error => {
        })
    } else {
    }
    return null;
}





export const doSignup = async (first_name, last_name, company, username, email, password) => {
    if (typeof window !== 'undefined') {
        // clear session storage
        document.cookie = `isLoggedIn=false; path=/;${cookie_suffix}`
        document.cookie = `user=; path=/;${cookie_suffix}`
        document.cookie = `token=; path=/;${cookie_suffix}`
        console.log('pppp', JSON.stringify({ first_name, last_name, company, username, email, password }))
        let signup_api_url = api_url + '/users/signup'
        return fetch(signup_api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ first_name, last_name, company, username, email, password })
        }).then(res => res.json()).then(data => {
            if (data.status === false) {
                return data
            } else {
                return data
            }
        }).catch(err => {
            return err
        })
    }
}

// helper functions to get and set cookies
export const getCookie = (name) => {
    if (!name) return null;
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2) {
        let val = parts.pop().split(";").shift();
        return val;
    } else {
        return null;
    }
};

export const setCookie = (name, value, days) => {
    if (!name) return;
    // expires is in 1 day
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/;" + `${cookie_suffix}`
};

export const getResource = (resource, options) => {
    const tkn = getCookie('token') || '';
    // check if resource is a url
    let url
    if (resource.startsWith("http://") || resource.startsWith("https://")) {
        url = resource
    } else {
        url = api_url + '/' + resource
    }
    let request_options = {};
    request_options.method = options?.method || 'GET';
    request_options.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tkn,
        ...options?.headers || {}
    };
    if (options?.body) request_options.body = JSON.stringify(options?.body);
    return fetch(url, request_options)
        .then((res) => res.json())
}

export const getResourceRaw = (resource, options) => {
    const tkn = getCookie('token') || '';
    // check if resource is a url
    let url
    if (resource.startsWith("http://") || resource.startsWith("https://")) {
        url = resource
    } else {
        url = api_url + '/' + resource
    }
    let request_options = {};
    request_options.method = options?.method || 'GET';
    request_options.headers = {
        'Authorization': 'Bearer ' + tkn,
        ...options?.headers || {}
    };
    if (options?.body) request_options.body = options?.body;
    return fetch(url, request_options)
        .then((res) => res.json())
}