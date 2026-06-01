import React, { SetStateAction, useState } from "react";
import Modal from "../UI/Modal";
import CustomInput from "./CustomInput";
import Button from "../UI/Button";
import { useCreateRolesMutation } from "../../services/api/userSlice";

interface IRoleCreationModal {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  title: string;
}

function RoleCreationModal({ isOpen, setIsOpen, title }: IRoleCreationModal) {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const [createRole, { isLoading }] = useCreateRolesMutation();

  function handleChange(setter: (v: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormError(null); // clear error on any input
      setter(e.target.value);
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (!roleName.trim()) {
      setFormError("Role name is required.");
      return;
    }

    try {
      await createRole({ name: roleName.trim(), description: description.trim() }).unwrap();
      setRoleName("");
      setDescription("");
      setIsOpen(false);
    } catch (err: any) {
      const msg = err?.data?.detail ?? "Failed to create role. Please try again.";
      setFormError(typeof msg === "string" ? msg : JSON.stringify(msg));
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={() => !isLoading && setIsOpen(false)} title={title}>
      <div className="px-4 pb-6 pt-2 flex flex-col gap-5">

        {/* Error banner */}
        {formError && (
          <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 5v3.5M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <CustomInput
            type="text"
            label="Role name"
            name="role"
            placeholder="e.g. Editor, Moderator"
            value={roleName}
            onChange={handleChange(setRoleName)}
            
          />
          <CustomInput
            type="text"
            label="Description"
            name="description"
            placeholder="What can this role do?"
            value={description}
            onChange={handleChange(setDescription)}
            
          />

          <div className="flex gap-3 pt-1">
            <Button
              variant="longOutline"
              text="Cancel"
              wide
              disabled={isLoading}
              onClick={() => setIsOpen(false)}
            />
            <Button
              type="submit"
              variant="long"
              text="Create Role"
              loadingText="Creating…"
              isLoading={isLoading}
              wide
            />
          </div>
        </form>

      </div>
    </Modal>
  );
}

export default RoleCreationModal;