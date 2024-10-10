export class Signup {
    public name: string;
    public email: string;
    public mobile: string;
    public password: string;

    constructor(name: string = '', email: string = '', mobile: string = '', password: string = '') {
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.password = password;
    }
}