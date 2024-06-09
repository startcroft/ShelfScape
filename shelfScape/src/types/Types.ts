export interface AuthResponse {
  body: {
    user: User;
  }
}

export interface AuthResponseError {
    body: {
        error: string
    };
}

export interface User {
    _id: string;
    name: string;
    username: string;
    intereses: interest[]
}

export interface interest {
  _id: string;
  nombre: string;
 imagenURL: string
}