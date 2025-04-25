export class User {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly createdAt: Date
    ) {}

    toJSON(){
        return {
            id: this.id,
            email: this.email,
            createAt: this.createdAt.toISOString()
        };
    }
}