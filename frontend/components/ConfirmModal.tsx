"use client";

import { motion, AnimatePresence } from "motion/react";

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
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="bg-white p-6 rounded-[20px] shadow-2xl border-4 border-black text-center w-96 relative"
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full shadow-md border-2 border-black text-lg font-bold">
              Alert!
            </div>
            <h2 className="text-2xl font-extrabold text-red-600 drop-shadow-md">
              {title}
            </h2>
            <p className="text-gray-700 mt-3 text-lg font-medium">{message}</p>
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={onClose}
                className="px-5 py-2 bg-gray-300 text-black border-2 border-black rounded-full shadow-md hover:bg-gray-400 transition transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-5 py-2 bg-red-500 text-white border-2 border-black rounded-full shadow-md hover:bg-red-600 transition transform hover:scale-105"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
