import { IGeneric } from "../../Commons/IGeneric";
import { IAuth } from "./interface";


export interface AuthGateway {
    login(body: IAuth.login): Promise<IGeneric.Response<string>>;
}

export default AuthGateway;