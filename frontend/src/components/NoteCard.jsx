import React, { useState } from "react";
import { useNavigate } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/utils.js";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async (id) => {
        setDeleting(true);
        try {
            await api.delete(`/notes/${id}`);
            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
            toast.success("Note deleted successfully!");
        } catch (error) {
            console.log("Error in handleDelete:", error);
            toast.error("Failed to delete note. Please try again.");
        } finally {
            setDeleting(false);
            setShowConfirm(false);
        }
    };

    return (
        <>
            {/* Main card */}
            <div
                onClick={() => navigate(`/note/${note._id}`)}
                className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
            >
                <div className="card-body">
                    <h3 className="card-title text-base-content">{note.title}</h3>
                    <p className="text-base-content/70 line-clamp-3">{note.content}</p>

                    <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">
              {formatDate(note.createdAt)}
            </span>

                        <div className="flex items-center gap-1">
                            <PenSquareIcon className="size-4" />
                            <button
                                type="button"
                                className="btn btn-ghost btn-xs text-error"
                                onClick={(e) => {
                                    e.preventDefault(); // prevent Link navigation
                                    e.stopPropagation(); // stop click from triggering parent Link
                                    setShowConfirm(true); // open modal
                                }}
                            >
                                <Trash2Icon className="size-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🧱 Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-base-100 p-6 rounded-2xl shadow-lg w-80 text-center">
                        <h3 className="text-lg font-semibold mb-3">
                            Delete this note?
                        </h3>
                        <p className="text-base-content/70 mb-6">
                            This action cannot be undone.
                        </p>

                        <div className="flex justify-center gap-3">
                            <button
                                className="btn btn-ghost"
                                onClick={(e) => {
                                    e.stopPropagation(); // ✅ Prevent triggering the card click
                                    setShowConfirm(false)
                                }}
                                disabled={deleting}
                            >
                                Cancel
                            </button>
                            <button
                                className={`btn btn-error ${deleting ? "btn-disabled" : ""}`}
                                onClick={(e) => {
                                    e.stopPropagation(); // ✅ Prevent triggering the card click
                                    handleDelete(note._id)
                                }}
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NoteCard;