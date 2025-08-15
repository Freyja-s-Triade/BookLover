import axios from "axios";
import { Form } from "react-router";
import { colors } from "~/colors";
import { Button } from "../components/button";
import type { Route } from "./+types/addList";

const apiUrl = "http://localhost:3000";

export async function action(params: Route.ActionArgs) {
    // récupération des données envoyées par le formulaire
    const formData = await params.request.formData();

    //extraction des champs du formulaire
    const tagName = formData.get("tagName");
    const tagColor = formData.get("tagColor");
    const listName = formData.get("listName");
    const listPosition = formData.get("listPosition");

    // 1. Créer le tag
    const tagRes = await axios.post(`${apiUrl}/api/tags`, {
        name: tagName,
        color: tagColor,
    });
    const tagId = tagRes.data.id;

    // 2. Créer la liste
    const listRes = await axios.post(`${apiUrl}/api/lists`, {
        name: listName,
        position: listPosition,
    });
    const listId = listRes.data.id;

    // 3. Créer l'association dans list_tag
    await axios.post(`${apiUrl}/api/list-tags`, {
        list_id: listId,
        tag_id: tagId,
    });

    return { listId, tagId };
}

// correspondance entre le nom de couleur et la classe CSS
const tagColors: Record<string, string> = {
    warning: "radio-warning",
    error: "radio-error",
    success: "radio-success",
    info: "radio-info",
    primary: "radio-primary",
};

export default function AddList() {
    return (
        <div className="m-auto w-4/5 mt-4">
            <h1 className="h1">Créer une liste</h1>

            <Form method="POST" className="flex flex-col gap-y-4">
                {/* Champ : Nom de la liste */}
                <div className="fieldset">
                    <label htmlFor="listName">Titre</label>
                    <input type="text" className="input input-md" name="listName" />
                </div>

                {/* Champ : Position de la liste */}
                <div className="fieldset">
                    <label htmlFor="listPosition">Position:</label>
                    <input type="number" className="input input-md" name="listPosition" />
                </div>

                <div className="fieldset">
                    <h2 className="h2">Tag</h2>

                    {/* Champ : Nom du tag */}
                    <div className="fieldset">
                        <label htmlFor="tagName">Nom tag</label>
                        <input type="text" className="input input-md" name="tagName" />
                    </div>

                    {/* Champ : Couleur du tag */}
                    <div className="fieldset">
                        <label htmlFor="tagColor" className="block mb-2">
                            Couleur tag
                        </label>
                        <div className="flex gap-2">
                            {colors.map((color) => (
                                <input
                                    className={`radio ${tagColors[color]}`}
                                    key={color}
                                    type="radio"
                                    name="tagColor"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button className="btn-success">Sauvegarder</Button>
                </div>
            </Form>
        </div>
    );
}
