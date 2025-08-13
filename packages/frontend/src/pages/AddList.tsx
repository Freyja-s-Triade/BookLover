import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "../components/button";

export default function AddList() {
    // Mutation pour créer une liste avec un tag
    const createListMutation = useMutation({
        mutationFn: async (value: {
            listName: string;
            listPosition: number;
            tagName: string;
            tagColor: string;
        }) => {
            // 1. Créer le tag
            const tagRes = await axios.post("/api/tags", {
                name: value.tagName,
                color: value.tagColor,
            });
            const tagId = tagRes.data.id;

            // 2. Créer la liste
            const listRes = await axios.post("/api/lists", {
                name: value.listName,
                position: value.listPosition,
            });
            const listId = listRes.data.id;

            // 3. Créer l'association dans list_tag
            await axios.post("/api/list-tags", {
                list_id: listId,
                tag_id: tagId,
            });

            return { listId, tagId };
        },
        onSuccess: () => {
            alert("Liste créée avec succès !");
        },
    });

    const form = useForm({
        defaultValues: {
            listName: "",
            listPosition: 0,
            tagName: "",
            tagColor: "success",
        },
        onSubmit: ({ value }) => {
            createListMutation.mutate(value);
        },
    });

    return (
        <div className="m-auto w-4/5 mt-4">
            <h1 className="h1">Créer une liste</h1>

            <form className="flex flex-col gap-y-4" onSubmit={form.handleSubmit}>
                {/* Champ : Nom de la liste */}
                <form.Field
                    name="listName"
                    children={(field) => (
                        <>
                            <label htmlFor={field.name}>Titre</label>
                            <input
                                type="text"
                                className="input input-md"
                                name={field.name}
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                        </>
                    )}
                />

                {/* Champ : Position de la liste */}
                <form.Field
                    name="listPosition"
                    children={(field) => (
                        <>
                            <label htmlFor={field.name}>Position:</label>
                            <input
                                type="number"
                                className="input input-md"
                                name={field.name}
                                value={field.state.value}
                                onChange={(e) => field.handleChange(Number.parseInt(e.target.value, 10))}
                            />
                        </>
                    )}
                />

                <div className="flex flex-col gap-y-2">
                    <h2 className="h2">Tag</h2>

                    {/* Champ : Nom du tag */}
                    <form.Field
                        name="tagName"
                        children={(field) => (
                            <>
                                <label htmlFor={field.name}>Nom tag</label>
                                <input
                                    type="text"
                                    className="input input-md"
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                            </>
                        )}
                    />

                    {/* Champ : Couleur du tag */}
                    <form.Field
                        name="tagColor"
                        children={(field) => {
                            const colors = ["warning", "error", "success", "info", "primary"];
                            const selected = field.state.value;

                            return (
                                <>
                                    <label htmlFor={field.name} className="block mb-2">
                                        Couleur tag
                                    </label>
                                    <div className="flex gap-2">
                                        {colors.map((color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() => field.handleChange(color)}
                                                className={`
                                                    w-8 h-8 rounded cursor-pointer border-2
                                                    bg-${color}
                                                    ${
                                                        selected === color
                                                            ? "border-black scale-110"
                                                            : "border-transparent"
                                                    }`}
                                                aria-label={`Choisir la couleur ${color}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            );
                        }}
                    />
                </div>

                <div className="flex justify-end">
                    <Button className="btn-success">Sauvegarder</Button>
                </div>
            </form>
        </div>
    );
}
