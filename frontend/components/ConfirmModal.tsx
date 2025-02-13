"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-md text-center w-96">
            <h2 className="text-xl font-bold text-red-600">{title}</h2>
            <p className="text-gray-600 mt-2">{message}</p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
