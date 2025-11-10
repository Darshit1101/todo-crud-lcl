import { useState, useEffect } from "react";

const cg = () => {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({ name: "", description: "", category: "", tags: "" });
    const [editingId, setEditingId] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load items from localStorage on first render
    useEffect(() => {
        const savedItems = localStorage.getItem("items");
        if (savedItems) {
            try {
                setItems(JSON.parse(savedItems));
            } catch (error) {
                console.error("Error parsing localStorage data", error);
                localStorage.removeItem("items");
            }
        }
        setIsLoaded(true);
    }, []);

    // Save items to localStorage whenever items change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("items", JSON.stringify(items));
        }
    }, [items, isLoaded]);

    // Add or Update item
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.description.trim() || !formData.category.trim() || !formData.tags.trim()) {
            alert("Please fill all fields");
            return;
        }

        if (editingId) {
            setItems(
                items.map((item) =>
                    item.id === editingId ? { ...item, ...formData } : item
                )
            );
            setEditingId(null);
        } else {
            const newItem = { id: Date.now(), ...formData };
            setItems([...items, newItem]);
        }

        setFormData({ name: "", description: "", category: "", tags: "" });
    };

    // Edit item
    const handleEdit = (item) => {
        setFormData({ name: item.name, description: item.description, category: item.category, tags: item.tags });
        setEditingId(item.id);
    };

    // Delete item
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            setItems(items.filter((item) => item.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">CRUD with LocalStorage</h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-4 rounded shadow mb-6 space-y-3"
            >
                <input
                    type="text"
                    placeholder="Item Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={formData.category}
                    onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Tags (e.g., urgent, work, personal)"
                    value={formData.tags}
                    onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded"
                />

                <button
                    type="submit"
                    className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded"
                >
                    {editingId ? "Update Item" : "Add Item"}
                </button>
            </form>

            {/* Items List */}
            {items.length === 0 ? (
                <p className="text-gray-500">No items available</p>
            ) : (
                <ul className="space-y-3">
                    {items.map((item) => (
                        <li
                            key={item.id}
                            className="bg-white p-4 rounded shadow flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-sm text-gray-600">{item.description}</p>
                                <div className="flex gap-4 mt-1">
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                        {item.category}
                                    </span>
                                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                        {item.tags}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default cg