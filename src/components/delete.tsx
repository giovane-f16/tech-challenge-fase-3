const DeleteButton = ({ id }: { id: string }) => {
    const handleDelete = async () => {
        if (!id) return;

        if (!confirm("Tem certeza que deseja excluir este post?")) return;

        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Erro ao excluir o post");

            alert("Post excluído com sucesso!");
            window.location.href = "/posts/edit";
        } catch (err) {
            alert("Erro ao excluir o post");
            console.error(err);
        }
    }

    return (
        <button type="button" id="deleteBtn" onClick={handleDelete} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer">
            Excluir
        </button>
    );
}

export default DeleteButton;