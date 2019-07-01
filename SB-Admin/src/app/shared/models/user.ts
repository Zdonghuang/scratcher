export interface LoginInfo {
    userId: number;
    userName: string;
    accessToken: string;
    tokenType: string;
    refreshToken: string;
    expiresIn: number;
    scope: string;
    jti: string;
}

export interface TokenRefreshInfo {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    jti: string;
}

export interface UserInfo {
    id: number;
    username: string;
    mobile: string;
    email: string;
    source: string;
    type: string;
    emailValid: number;
}
