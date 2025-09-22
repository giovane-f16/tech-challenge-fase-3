import Config from "@/config/config";

class Post {
    private config: typeof Config;

    constructor(config: typeof Config) {
        this.config = config;
    }

    public async getAll() {
        const response = await fetch(`${this.config.getApiUrl()}/posts`);
        const data = await response.json();
        return data;
    }

    public async getById(id: string) {
        const response = await fetch(`${this.config.getApiUrl()}/posts/${id}`);
        const data = await response.json();
        return data;
    }

    public async getByDate(data: string) {
        const response = await fetch(`${this.config.getApiUrl()}/posts/data/${data}`);
        const dados = await response.json();
        return dados;
    }

    public async getBySearch(search: string) {
        const response = await fetch(`${this.config.getApiUrl()}/posts/search?titulo=${search}&conteudo=${search}`);
        const data = await response.json();
        return data;
    }

    public async deleteById(id: string) {
        const response = await fetch(`${this.config.getApiUrl()}/posts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.config.getToken()}`
            }
        });

        const data = await response.json();
        return data;
    }

    public async editById(id: string, titulo?: string, conteudo?: string, autor?: string, thumbnail?: string) {
        if (titulo == undefined) titulo = "";
        if (conteudo == undefined) conteudo = "";
        if (autor == undefined) autor = "";
        if (thumbnail == undefined) thumbnail = "";

        const response = await fetch(`${this.config.getApiUrl()}/posts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.config.getToken()}`
            },
            body: JSON.stringify({ titulo, conteudo, autor, thumbnail })
        });

        const data = await response.json();
        return data;
    }

    public async create(titulo?: string, conteudo?: string, autor?: string, thumbnail?: string) {
        if (titulo == undefined) titulo = "";
        if (conteudo == undefined) conteudo = "";
        if (autor == undefined) autor = "";
        if (thumbnail == undefined) thumbnail = "";

        const response = await fetch(`${this.config.getApiUrl()}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.config.getToken()}`
            },
            body: JSON.stringify({ titulo, conteudo, autor, thumbnail })
        });

        const data = await response.json();
        return data;
    }

    public slugify(text: string) {
        return text
        .toLowerCase()
        .normalize("NFD") // remove acentos
        .replace(/[\u0300-\u036f]/g, "") // remove marcas diacríticas
        .replace(/[^a-z0-9]+/g, "-") // troca espaços e caracteres por "-"
        .replace(/(^-|-$)+/g, ""); // remove traços extras
    }

    public truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + "...";
    };
}

export default new Post(Config);