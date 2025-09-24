import Config from "@/config/config";

const KeepAlive = () => {
    if (typeof window === "undefined") {
        const pingServer = async () => {
            try {
                const response = await fetch(`${Config.getApiUrl()}`);
                if (response.ok) {
                    console.log("Ping enviado com sucesso");
                } else {
                    console.error("Erro no ping", response.status);
                }
            } catch (error) {
                console.error("Erro ao enviar ping", error);
            }
        };

        pingServer();

        setInterval(pingServer, 50_000);
    }
};

export default KeepAlive;