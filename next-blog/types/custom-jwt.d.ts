export interface JWTPaylod {
    id: number;
    email: string;
    name: string;
    roles: string[];
    permissions: string[];
}

export interface JWTDecode extends JWTPaylod {
    id: number;
    email: string;
    name: string;
    roles: string[];
    permissions: string[];
    iat: number;
    exp: number;
    access_token: string;
    refresh_token: string;
}