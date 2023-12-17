import bcrypt from "bcrypt";
export class AuthServices {
    static async hashPassword(password: string) {
        return bcrypt.hash(password, 1);
    }
}