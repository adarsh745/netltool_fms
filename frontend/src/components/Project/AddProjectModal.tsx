// import { useState } from "react";
// import Modal from "../UI/Modal";
// import CustomInput from "../Login/CustomInput";
// import CustomButton from "../UI/CustomButton";

// function AddProjectModal({
//   isOpen,
//   onClose,
//   onSave,
// }: any) {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     image: "",
//     visibility: "PUBLIC",
//   });

//   const handleSubmit = () => {
//     const newProject = {
//       id: Date.now(),
//       title: formData.name,
//       description: formData.description,
//       image:
//         formData.image ||
//         "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
//       date: new Date().toLocaleDateString(),
//       visibility: formData.visibility,
//     };

//     onSave(newProject);

//     setFormData({
//       name: "",
//       description: "",
//       image: "",
//       visibility: "PUBLIC",
//     });

//     onClose();
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title="Add Project"
//       size="md"
//     >
//       <div className="space-y-4">

//         <CustomInput
//           label="Project Name"
//           placeholder="Enter project name"
//           value={formData.name}
//           onChange={(e: any) =>
//             setFormData({
//               ...formData,
//               name: e.target.value,
//             })
//           }
//         />

//         <CustomInput
//           label="Description"
//           placeholder="Enter project description"
//           value={formData.description}
//           onChange={(e: any) =>
//             setFormData({
//               ...formData,
//               description: e.target.value,
//             })
//           }
//         />

//         <CustomInput
//           label="Thumbnail URL"
//           placeholder="Enter image url"
//           value={formData.image}
//           onChange={(e: any) =>
//             setFormData({
//               ...formData,
//               image: e.target.value,
//             })
//           }
//         />

//         <div>
//           <label className="font-medium">
//             Visibility
//           </label>

//           <div className="flex gap-6 mt-2">
//             <label>
//               <input
//                 type="radio"
//                 checked={
//                   formData.visibility === "PUBLIC"
//                 }
//                 onChange={() =>
//                   setFormData({
//                     ...formData,
//                     visibility: "PUBLIC",
//                   })
//                 }
//               />
//               <span className="ml-2">
//                 Public
//               </span>
//             </label>

//             <label>
//               <input
//                 type="radio"
//                 checked={
//                   formData.visibility === "PRIVATE"
//                 }
//                 onChange={() =>
//                   setFormData({
//                     ...formData,
//                     visibility: "PRIVATE",
//                   })
//                 }
//               />
//               <span className="ml-2">
//                 Private
//               </span>
//             </label>
//           </div>
//         </div>

//         <CustomButton
//           text="Create Project"
//           onClick={handleSubmit}
//         />

//       </div>
//     </Modal>
//   );
// }

// export default AddProjectModal;

import { useState } from "react";

import Modal from "../UI/Modal";
import CustomInput from "../Login/CustomInput";
import CustomButton from "../UI/CustomButton";
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

function AddProjectModal({
  isOpen,
  onClose,
  onSave,
}: any) {
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
      date: new Date().toLocaleDateString(),
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
      title="Add Project"
      size="md"
    >
      <div className="space-y-2">

        <CustomInput
          label="Project Name"
          placeholder="Enter project name"
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
          placeholder="Enter project description"
          value={formData.description}
          onChange={(value: string) =>
            setFormData({
              ...formData,
              description: value,
            })
          }
        />

        <CustomInput
          label="Thumbnail URL"
          placeholder="Enter image URL"
          value={formData.image}
          onChange={(e: any) =>
            setFormData({
              ...formData,
              image: e.target.value,
            })
          }
        />

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

        <div className="flex justify-end">
          <CustomButton
            text="Create Project"
            onClick={handleSubmit}
          />
        </div>

      </div>
    </Modal>
  );
}

export default AddProjectModal;