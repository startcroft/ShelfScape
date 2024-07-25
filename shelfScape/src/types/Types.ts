export interface AuthResponse {
  body: {
    user: User;
  }
}

export interface InterestResponse {
  body: {
    interes: interest
  }
}

export interface ItemsResponse {
  body: {
    item: [item]
  }
}

export interface AuthResponseError {
    body: {
        error: string
    };
}

export interface SelectedInterest {
  _id: string;
  nombre: string;
  imagenURL: string;
  userId: string
  contenidos: item[];
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

export interface item {
  id: string;
  name: string;
  link: string;
  date: string;
}

export interface CreateInterestProps {
  modalState: () => void;
  interestModified: interest | null
  editReset: () => void
}