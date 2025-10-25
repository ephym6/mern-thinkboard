import React, { useEffect, useState } from "react";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = ({ noteId, onClose }) => {
    const [note, setNote] = useState(null);
    const [originalNote, setOriginalNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUnsavedModal, setShowUnsavedModal] = useState(false);
    const [originalTitle, setOriginalTitle] = useState("");
    const [originalContent, setOriginalContent] = useState("");

    // ✅ Fetch the note details
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes/${noteId}`);
                console.log("Fetched note:", res.data);
                setNote(res.data.note);
                setOriginalTitle(res.data.note.title);
                setOriginalContent(res.data.note.content);
                setOriginalNote(res.data);
            } catch (error) {
                console.error("Error fetching note:", error);
                toast.error("Failed to load note details.");
                onClose();
            } finally {
                setLoading(false);
            }
        };
        console.log("Fetching note for id:", noteId)
        if (noteId) fetchNote();
    }, [noteId, onClose]);

    // ✅ Handle save
    const handleSave = async () => {
        if (!note.title.trim() || !note.content.trim()) {
            toast.error("Please add a title or content");
            return;
        }

        setSaving(true);
        try {
            await api.put(`/notes/${noteId}`, note);
            toast.success("Note updated successfully");
            setOriginalNote(note);
            onClose();
        } catch (error) {
            console.error("Error saving note:", error);
            toast.error("Failed to update note");
        } finally {
            setSaving(false);
        }
    };

    // ✅ Handle delete
    const handleDelete = async () => {
        try {
            await api.delete(`/notes/${noteId}`);
            toast.success("Note deleted");
            setShowDeleteModal(false);
            onClose();
        } catch (error) {
            console.error("Error deleting note:", error);
            toast.error("Failed to delete note");
        }
    };

    const hasUnsavedChanges =
        note &&
        originalNote &&
        (note.title !== originalTitle ||
            note.content !== originalContent);

    const handleClose = () => {
        if (hasUnsavedChanges) {
            setShowUnsavedModal(true);
        } else {
            onClose();
        }
    };

    if (loading)
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                <div className="bg-base-200 p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <LoaderIcon className="animate-spin size-10 mb-2" />
                    <p>Loading note...</p>
                </div>
            </div>
        );

    if (!note) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
                onClick={handleClose}
            >
                <div
                    className="bg-base-100 rounded-xl shadow-xl w-full max-w-2xl p-6 relative"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                >

                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        {/* Left: Back button */}
                        <button onClick={handleClose} className="btn btn-ghost flex items-center gap-2">
                            <ArrowLeftIcon className="h-5 w-5" /> Back
                        </button>

                        {/* Right: Delete + Close buttons with spacing */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="btn btn-error btn-outline flex items-center gap-2"
                            >
                                <Trash2Icon className="h-5 w-5" />
                                Delete
                            </button>

                            <button
                                onClick={handleClose}
                                className="btn btn-ghost text-base-content/60 hover:text-base-content text-lg font-bold"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* Note Details */}
                    <div className="space-y-4">
                        <div className="form-control">
                            <label className="label-text mb-1 font-semibold text-base-content">
                                Title
                            </label>
                            <input
                                type="text"
                                placeholder="Note title"
                                className="input input-bordered w-full"
                                value={note.title}
                                onChange={(e) => setNote({ ...note, title: e.target.value })}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label-text mb-1 font-semibold text-base-content">
                                Content
                            </label>
                            <textarea
                                placeholder="Write your note here..."
                                className="textarea textarea-bordered w-full h-40 resize-none"
                                value={note.content}
                                onChange={(e) => setNote({ ...note, content: e.target.value })}
                            />
                        </div>

                        {/* Save Button appears only when changes exist */}
                        {hasUnsavedChanges && (
                            <div className="flex justify-end mt-4">
                                <button
                                    className="btn btn-primary"
                                    disabled={saving}
                                    onClick={handleSave}
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[60]">
                    <div className="bg-base-100 p-6 rounded-lg shadow-lg text-center max-w-sm">
                        <h3 className="text-lg font-semibold mb-4">
                            Are you sure you want to delete this note?
                        </h3>
                        <div className="flex justify-center gap-3">
                            <button className="btn btn-error" onClick={handleDelete}>
                                Delete
                            </button>
                            <button
                                className="btn btn-ghost"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Unsaved Changes Modal */}
            {showUnsavedModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[60]">
                    <div className="bg-base-100 p-6 rounded-lg shadow-lg text-center max-w-sm">
                        <h3 className="text-lg font-semibold mb-4">
                            You have unsaved changes.
                        </h3>
                        <p className="mb-4">Would you like to save them before leaving?</p>
                        <div className="flex justify-center gap-3">
                            <button className="btn btn-primary" onClick={handleSave}>
                                Save
                            </button>
                            <button
                                className="btn btn-ghost"
                                onClick={() => {
                                    setShowUnsavedModal(false);
                                    onClose();
                                }}
                            >
                                Discard
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NoteDetailPage;