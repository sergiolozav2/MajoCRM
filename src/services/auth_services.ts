import bcrypt from "bcrypt";
export class AuthServices {
    static async hashPassword(password: string) {
        return bcrypt.hash(password, 1);
    }

    static async passwordEqual(password: string, hashed: string) {
        return bcrypt.compare(password, hashed)

    }
}