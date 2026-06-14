import { useState, useRef } from "react";
import Modal from "../UI/Modal";
import CustomInput from "../Login/CustomInput";
import CustomRadio from "../UI/CustomRadio";
import CustomTextarea from "../UI/CustomTextarea";

const visibilityOptions = [
  {
    id: 1,
    value: "PUBLIC",
    label: "Public",
  },
  {
    id: 2,
    value: "PRIVATE",
    label: "Private",
  },
];

const activeOptions = [
  {
    id: 1,
    value: "ACTIVE",
    label: "Active",
  },
  {
    id: 2,
    value: "INACTIVE",
    label: "Inactive",
  },
];

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: any) => void;
}

function AddProjectModal({ isOpen, onClose, onSave }: AddProjectModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    visibility: "PUBLIC",
    status: "ACTIVE",
  });

  const handleSubmit = () => {
    const newProject = {
      id: Date.now(),
      title: formData.name,
      description: formData.description,
      image:
        formData.image ||
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      date: new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      visibility: formData.visibility,
      status: formData.status,
    };

    onSave(newProject);

    setFormData({
      name: "",
      description: "",
      image: "",
      visibility: "PUBLIC",
      status: "ACTIVE",
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Project"
      size="xl"
    >
      <div className="space-y-6 py-4 font-sans select-none max-h-[70vh] overflow-y-auto pr-1">
        {/* Responsive Layout: 2 Columns on Desktop, 1 on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left Column: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-1.5 mb-2">
              Basic Information
            </h3>

            <CustomInput
              label="Project Name"
              placeholder="e.g. Website Redesign"
              value={formData.name}
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />

            <CustomTextarea
              label="Description"
              placeholder="Describe the goals, modules, and scope of this project..."
              value={formData.description}
              onChange={(value: string) =>
                setFormData({
                  ...formData,
                  description: value,
                })
              }
            />
          </div>

          {/* Right Column: Thumbnail Media */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-1.5 mb-2">
              Media & Preview
            </h3>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFormData({
                      ...formData,
                      image: reader.result as string,
                    });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
            />

            <CustomInput
              label="Thumbnail URL"
              placeholder="Enter URL of the thumbnail image"
              value={formData.image.startsWith("data:") ? "Uploaded Image File" : formData.image}
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  image: e.target.value,
                })
              }
              disabled={formData.image.startsWith("data:")}
            />

            {/* Live Preview Block */}
            <div>
              <span className="text-xs font-medium text-gray-600 block mb-1.5">
                Thumbnail Image Preview
              </span>
              <div className="w-full h-36 rounded-lg border border-dashed border-gray-300 bg-neutral-50 flex items-center justify-center overflow-hidden relative shadow-inner">
                {formData.image ? (
                  <div className="relative w-full h-full group">
                    <img
                      src={formData.image}
                      alt="Project preview"
                      className="w-full h-full object-cover transition-opacity duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4";
                      }}
                    />
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200 cursor-pointer"
                    >
                      <span className="text-white text-xs font-semibold bg-black/60 px-3 py-1.5 rounded-md backdrop-blur-xs select-none">
                        Change Image
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData({ ...formData, image: "" });
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition-colors cursor-pointer z-10"
                      title="Clear Image"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="text-center p-4 cursor-pointer hover:bg-neutral-100/70 w-full h-full flex flex-col items-center justify-center transition-colors duration-250 select-none"
                  >
                    <svg
                      className="w-8 h-8 text-gray-400 mx-auto mb-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                    <span className="text-[11px] text-gray-400 font-medium">
                      No Image Selected
                    </span>
                    <span className="text-[10px] text-gray-300 font-normal mt-0.5">
                      Click to Upload or enter URL above
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section: Visibility & Status Controls */}
        <div className="border-t border-gray-100 pt-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-1.5 mb-3">
            Settings & Control
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <CustomRadio
              label="Visibility"
              options={visibilityOptions}
              value={
                visibilityOptions.find(
                  (option) =>
                    option.value === formData.visibility
                ) || null
              }
              onChange={(option: any) =>
                setFormData({
                  ...formData,
                  visibility: option.value,
                })
              }
              orientation="horizontal"
              variant="card"
            />

            <CustomRadio
              label="Status"
              options={activeOptions}
              value={
                activeOptions.find(
                  (option) =>
                    option.value === formData.status
                ) || null
              }
              onChange={(option: any) =>
                setFormData({
                  ...formData,
                  status: option.value,
                })
              }
              orientation="horizontal"
              variant="card"
            />
          </div>
        </div>
      </div>

      {/* Sticky Action Footer */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6 shrink-0 bg-white">
        <button
          onClick={onClose}
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-black transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="rounded-lg bg-black hover:bg-neutral-800 px-6 py-2.5 text-xs font-bold text-white shadow-sm transition-colors cursor-pointer"
        >
          Create Project
        </button>
      </div>
    </Modal>
  );
}

export default AddProjectModal;