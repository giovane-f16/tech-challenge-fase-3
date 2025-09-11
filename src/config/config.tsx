class Config {
    private apiUrl: string;
    private token: string;

    constructor() {
        this.apiUrl = process.env.API_URL   || "";
        this.token  = process.env.JWT_TOKEN || "";
    }

    public getApiUrl(): string
    {
        return this.apiUrl;
    }

    public getToken(): string
    {
        return this.token;
    }
}

export default new Config;