import api from "../../http/http.service";
import { IAuth } from "../domain/interface";
import AuthGateway from "../domain/gateway";
import { IGeneric } from "../../Commons/IGeneric";

const ApiUrl = "/login";

export class AuthGatewayImpl implements AuthGateway {
    async login(body: IAuth.login): Promise<IGeneric.Response<string>> {
        const response = await api.post(ApiUrl, body);
        return response?.data ?? "";
    }
}