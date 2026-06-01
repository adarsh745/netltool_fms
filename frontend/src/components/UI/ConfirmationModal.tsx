  import React, { SetStateAction } from 'react';
  import Modal from './Modal';
  import Button from './Button';

  interface IConfirmationModel {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
    title: string;
    onConfirm: () => void;
    onCancle: () => void;
    heading: string;
    description: string;
    isLoading?:boolean
  }

  function ConfirmationModal({
    isOpen,
    setIsOpen,
    title,
    onConfirm,
    onCancle,
    heading,
    description,
    isLoading
  }: IConfirmationModel) {
    return (
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title}>
        <div className="px-6 pb-6 pt-2 flex flex-col gap-6">

          {/* Icon + text */}
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                />
              </svg>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-base font-semibold text-gray-900">{heading}</h2>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{description}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100" />

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="longOutline" text="Cancel" onClick={onCancle} wide />
            <Button variant="long" text="Confirm" onClick={onConfirm} isLoading={isLoading} wide />
          </div>

        </div>
      </Modal>
    );
  }

  export default ConfirmationModal;