import { IGeneric } from "../../Commons/IGeneric";
import AuthGateway from "../domain/gateway";
import { IAuth } from "../domain/interface";

export class AuthUseCase {
    private authGateway: AuthGateway;

    constructor(authGateway: AuthGateway) {
        this.authGateway = authGateway;
    }

    async login(body: IAuth.login): Promise<IGeneric.Response<string>> {
        return this.authGateway.login(body);
    }
}

export default AuthUseCase;