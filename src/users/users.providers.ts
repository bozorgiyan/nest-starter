import { Inject } from "@nestjs/common";
import { Connection } from "mongoose";
import { UserSchema } from "src/schemas/user.schema";

export const UsersProviders = [
    {
        provide: 'USER_MODEL',
        useFactory: (connection: Connection) => connection.model('users', UserSchema),
        inject: ['DATABASE_CONNECTION']
    }
];