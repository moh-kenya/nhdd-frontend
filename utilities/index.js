let debug = process.env.APP_ENV || false;
let api_url = process.env.NEXT_PUBLIC_API_URL
console.log("api url", api_url)
let cookie_suffix = '';

export const sendPasswordResetLink = async (email, rtr) => {
    if (typeof window !== 'undefined') {
        return fetch(api_url + '/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        }).then(res => res.json()).then(data => {
            if (debug) console.log('/auth/forgot-password data::', data)
            if (data.status === false) {
                if (debug) console.log('/auth/forgot-password error::', data)
            }
            return data
        }).catch(err => {
            if (debug) console.error('/auth/forgot-password exception::', err)
            return err
        })
    }
}

export const sendPasswordResetSMSCode = async (phone, code, password, password_confirmation, rtr) => {
    if (typeof window !== 'undefined') {
        return fetch(api_url + '/auth/forgot-password-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phone, code, password, password_confirmation })
        }).then(res => res.json()).then(data => {
            if (debug) console.log('/auth/forgot-password-code data::', data)
            if (data.status === false) {
                if (debug) console.log('/auth/forgot-password-code error::', data)
            }
            return data
        }).catch(err => {
            if (debug) console.error('/auth/forgot-password-code exception::', err)
            return err
        })
    }
}

export const doPasswordReset = async (email, password, password_confirmation, token, rtr) => {
    if (typeof window !== 'undefined') {
        return fetch(api_url + '/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, password_confirmation, token })
        }).then(res => res.json()).then(data => {
            if (debug) console.log('/auth/reset-password data::', data)
            if (data.status === false) {
                if (debug) console.log('/auth/reset-password error::', data)
                return data
            } else {
                // rtr.push('/login', undefined, { unstable_skipClientCache: true })
                return data
            }
        }).catch(err => {
            if (debug) console.error('/auth/reset-password error::', err)
            return err
        })
    }
}

export const doSignup = async (first_name, last_name, company, username, email, password) => {
    if (typeof window !== 'undefined') {
        // clear session storage
        // window.sessionStorage.removeItem('user');
        // window.sessionStorage.removeItem('isLoggedIn');
        document.cookie = `isLoggedIn=false; path=/;${cookie_suffix}`
        document.cookie = `user=; path=/;${cookie_suffix}`
        document.cookie = `token=; path=/;${cookie_suffix}`
        console.log('pppp',JSON.stringify({ first_name, last_name,  company, username, email, password }))
        let signup_api_url = api_url + '/users/signup'
        return fetch(signup_api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 891b4b17feab99f3ff7e5b5d04ccc5da7aa96da6'
            },
            body: JSON.stringify({ first_name, last_name,  company, username, email, password })
        }).then(res => res.json()).then(data => {
            if (data.status === false) {
                if (debug) console.log('success', data)
                return data
            } else {
                if (debug) console.log('data error', data)
                return data
            }
        }).catch(err => {
            if (debug) console.error('catch error', err)
            return err
        })
    }
}

// helper functions to get and set cookies
export const getCookie = (name) => {
    if (!name) return null;
    let value = "; " + document.cookie;
    if (debug) console.log("Getting cookie: ", name);
    let parts = value.split("; " + name + "=");
    if (parts.length == 2) {
        let val = parts.pop().split(";").shift();
        if (debug) console.log("Cookie value: ", name, val);
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
    if (debug) console.log("Setting cookie: ", name, value, expires);
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