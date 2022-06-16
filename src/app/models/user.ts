export class User {
    constructor(
        public pseudo?: string,
        public firstName?: string,
        public lastName?: string,
        public role?: string,
        public id?: string,
        public isAuth?: boolean
    ) {}
}
