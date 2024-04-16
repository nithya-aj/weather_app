import { reactive, provide, inject } from 'vue';
import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'token';

export const authServiceSymbol = Symbol();

export function createAuthService() {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log(token, 'token')


    const initialState = {
        user: null,
        isAuthenticated: !!token,
    };

    if (token) {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken, 'decodedToken.....')
        if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
            initialState.user = decodedToken;
        } else {
            localStorage.removeItem(TOKEN_KEY);
        }
    }

    const state = reactive(initialState);

    function login(token) {
        state.user = jwtDecode(token)
        state.isAuthenticated = true
        localStorage.setItem(TOKEN_KEY, token);
    }

    function logout() {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem(TOKEN_KEY);
    }

    return {
        state,
        login,
        logout
    };
}


export function useAuthService() {
    const authService = inject(authServiceSymbol);
    if (!authService) {
        throw new Error('AuthService is not provided.');
    }
    return authService;
}

export function provideAuthService() {
    return {
        setup() {
            const authService = createAuthService();
            provide(authServiceSymbol, authService);
            return { authService };
        },
    };
}