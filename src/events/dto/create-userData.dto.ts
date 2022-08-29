export class CreateUserDataDto {
    userId: number;
    fields: {
        firstName: string;
        lastName: string;
        email: string;
        message: string;
    }
}
