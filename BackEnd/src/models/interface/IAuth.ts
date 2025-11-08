interface IAuth {
    login(username: string, password: string): Promise<string>;
    // logout(): Promise<void>;
}