import { jwtDecode } from 'jwt-decode';
import { reactive, provide } from 'vue';

const token = localStorage.getItem('token');

const initialState = {
    user: null
};

if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken, 'decodedToken.....')
    if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
        initialState.user = decodedToken;
    } else {
        localStorage.removeItem('token');
    }
}

const authService = reactive(initialState);

export function provideAuthService() {
    provide('auth', authService);
}
