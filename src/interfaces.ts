
export interface UserData {
    $id: string,
    [key: string]: any
}

export interface AuthState {
    auth: {
        userData: UserData,
    }
}
