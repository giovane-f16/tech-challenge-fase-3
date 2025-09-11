const Footer = () => {
    let anoAtual = new Date().getFullYear();

    return(
        <footer className="w-full bg-gray-900 text-white p-4 text-center">
            <p>© {anoAtual} Tech Challenge Fase 3. Todos os direitos reservados.</p>
        </footer>
    )
}

export default Footer;