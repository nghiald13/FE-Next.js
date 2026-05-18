import { AuthError } from "next-auth"

export class CustomError extends AuthError {
    static type: string

    constructor(message?: any) {
        super()

        this.type = message
    }
}

export class InactivateAccountError extends AuthError {
    static type = 'InactivateAccountError'
}