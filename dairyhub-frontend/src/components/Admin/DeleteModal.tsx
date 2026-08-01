import { AlertTriangle } from "lucide-react";

interface DeleteModalProps {
  open: boolean;
  title: string;
  loading?: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteModal = ({
  open,
  title,
  loading = false,
  onClose,
  onDelete,
}: DeleteModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        <div className="flex justify-center">

          <div className="rounded-full bg-red-100 p-4">
            <AlertTriangle
              size={40}
              className="text-red-600"
            />
          </div>

        </div>

        <h2 className="mt-4 text-center text-2xl font-bold">
          Delete Product
        </h2>

        <p className="mt-3 text-center text-gray-500">
          Are you sure you want to delete
        </p>

        <p className="mt-2 text-center font-semibold">
          "{title}"
        </p>

        <p className="mt-3 text-center text-sm text-red-500">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={onDelete}
            className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteModal;