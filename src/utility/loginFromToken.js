export function loginFromToken() {
    let token = JSON.parse(localStorage.getItem('user'));
    console.log(token);

    if (token) {
        user.token = token.token;
        return true;
    }
    return false;
}

export const user = {
    token: ''
};

