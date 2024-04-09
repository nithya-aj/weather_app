import { reactive, provide, inject } from 'vue';
import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'token';

const authServiceSymbol = Symbol();

export function createAuthService() {
    const token = localStorage.getItem(TOKEN_KEY);


    const initialState = {
        user: null,
        isAuthenticated: false,
    };

    if (token) {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken, 'decodedToken.....')
        if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
            initialState.user = decodedToken;
            initialState.isAuthenticated = true;
        } else {
            localStorage.removeItem(TOKEN_KEY);
        }
    }

    const state = reactive(initialState);

    function logout() {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem(TOKEN_KEY);
    }

    return {
        state,
        logout,
    };
}

export function provideAuthService() {
    provide(authServiceSymbol, createAuthService());
}

export function useAuthService() {
    const authService = inject(authServiceSymbol);
    if (!authService) {
        throw new Error('AuthService is not provided.');
    }
    return authService;
}
