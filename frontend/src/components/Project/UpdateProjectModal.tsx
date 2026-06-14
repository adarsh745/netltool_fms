import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface UpdateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    content: string;
    percentage: number;
    link: string;
  }) => void;
  initialData?: {
    title: string;
    content: string;
    percentage: number;
    link: string;
  };
}

export const UpdateProjectModal: React.FC<UpdateProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [percentage, setPercentage] = useState<string>("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setPercentage(String(initialData.percentage));
      setLink(initialData.link);
    } else {
      setTitle("");
      setContent("");
      setPercentage("");
      setLink("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      content,
      percentage: parseInt(percentage) || 0,
      link,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      {/* Modal Container */}
      <div 
        className="bg-[#ebebeb] w-full max-w-[480px] rounded-lg shadow-xl relative p-6 border border-neutral-300 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900 font-bold text-lg select-none">Update Project</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black hover:bg-neutral-200/50 p-1.5 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} className="stroke-[2.5]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-800 font-semibold text-sm mb-1.5 select-none">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Authentication System Added"
              required
              className="w-full bg-[#f2f2f2] border border-neutral-300 rounded-md px-3.5 py-2 text-sm text-gray-900 outline-none focus:border-neutral-500 focus:bg-white transition"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-gray-800 font-semibold text-sm mb-1.5 select-none">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Added login, register and forgot password functionality."
              rows={3}
              required
              className="w-full bg-[#f2f2f2] border border-neutral-300 rounded-md px-3.5 py-2 text-sm text-gray-900 outline-none focus:border-neutral-500 focus:bg-white resize-none transition"
            />
          </div>

          <div>
            <label htmlFor="percentage" className="block text-gray-800 font-semibold text-sm mb-1.5 select-none">
              Percentage
            </label>
            <input
              type="number"
              id="percentage"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              placeholder="75"
              min="0"
              max="100"
              required
              className="w-full bg-[#f2f2f2] border border-neutral-300 rounded-md px-3.5 py-2 text-sm text-gray-900 outline-none focus:border-neutral-500 focus:bg-white transition"
            />
          </div>

          <div>
            <label htmlFor="link" className="block text-gray-800 font-semibold text-sm mb-1.5 select-none">
              Blog / Git Link
            </label>
            <input
              type="url"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://github.com/project/dashboard-ui"
              required
              className="w-full bg-[#f2f2f2] border border-neutral-300 rounded-md px-3.5 py-2 text-sm text-gray-900 outline-none focus:border-neutral-500 focus:bg-white transition"
            />
          </div>

          {/* Footer Submit Button */}
          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="bg-black hover:bg-neutral-800 text-white text-sm font-semibold px-8 py-2 rounded-md transition-colors shadow-sm active:scale-98 cursor-pointer"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
