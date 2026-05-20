
import { AuthError } from "next-auth"

export class CustomError extends AuthError {
    static type: string

    constructor(message?: any) {
        super()

        this.type = message
    }
}

export class InvalidSignInError extends AuthError {
    static type = 'Sai thông tin đăng nhập'
}

export class InactivateAccountError extends AuthError {
    static type = 'Tài khoản chưa được kích hoạt'
}