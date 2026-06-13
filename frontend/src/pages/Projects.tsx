// import { useState } from "react";


// import Button from "../components/UI/Button";
// import CustomTable from "../components/UI/CustomTable";
// import Modal from "../components/UI/Modal";
// import OptionsContainer from "../components/UI/OptionsContainer";
// import CustomInput from "../components/Login/CustomInput";
// import CustomRadio from "../components/UI/CustomRadio";
// import CustomTextarea from "../components/UI/CustomTextarea";

// const visibilityOptions = [
//   { id: 1, value: "public", label: "Public" },
//   { id: 2, value: "private", label: "Private" },
// ];

// const activeOptions = [
//   { id: 1, value: "false", label: "Active" },
//   { id: 2, value: "true", label: "Inactive" },
// ];

// const Projects: React.FC = () => {
//   const columns = [
//      {key: "thumbnail", label: "Thumbnail"},
//     { key: "name", label: "Name" },
//     { key: "description", label: "Description" },
//     { key: "status", label: "Status" },
//     { key: "createdDate", label: "Created Date" },
   
//   ];

//   const data = [
//     {
//       name: "Website Redesign",
//       description: "Redesign the corporate website for better UX.",
//       status: "In Progress",
//       createdDate: "2026-01-15",
//     },
//     {
//       name: "Mobile App",
//       description: "Develop a cross-platform mobile application.",
//       status: "Planned",
//       createdDate: "2026-03-02",
//     },
//     {
//       name: "Data Migration",
//       description: "Migrate legacy data to new DB.",
//       status: "Completed",
//       createdDate: "2025-11-20",
//     },
//   ];

//   const [isOpen, setIsOpen] = useState(false);

//   const [projectName, setProjectName] = useState("");
//   const [projectSummary, setProjectSummary] = useState("");
//   const [visibility, setVisibility] = useState(
//     visibilityOptions[0].value
//   );
//   const [active, setActive] = useState(
//     activeOptions[0].value
//   );

//   return (
//     <div className="flex h-screen bg-[#F5F5F7]">

    

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">

//         {/* Top Header */}
       

//         {/* Page Content */}
//         <div className="flex-1 overflow-y-auto">

//           <OptionsContainer>

//             <div className="p-6">

//               <div className="flex flex-row justify-between items-start mb-6">

//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-900 mb-1">
//                     Project Management
//                   </h1>

//                   <p className="text-sm text-gray-500">
//                     Record, edit, and manage your projects.
//                   </p>
//                 </div>

//                 <Button
//                   text="Create New Project +"
//                   onClick={() => setIsOpen(true)}
//                   variant="primary"
//                 />

//               </div>

//               <CustomTable
//                 columns={columns}
//                 data={data}
//               />

//             </div>

//           </OptionsContainer>

//         </div>

//       </div>

//       {/* Create Project Modal */}
//       <Modal
//         isOpen={isOpen}
//         onClose={() => setIsOpen(false)}
//         title="Create New Project"
//         description=""
//         size="sm"
//       >
//         <div className="flex gap-3">

//           <form className="w-full space-y-3">

//             <CustomInput
//               label="Project Name"
//               placeholder="Enter project name"
//               value={projectName}
//               onChange={(e) =>
//                 setProjectName(e.target.value)
//               }
//             />

//             <CustomTextarea
//               label="Summary"
//               placeholder="Enter project summary"
//               value={projectSummary}
//               onChange={(e) =>
//                 setProjectSummary(e)
//               }
//             />

//             <CustomRadio
//               options={visibilityOptions}
//               value={
//                 visibilityOptions.find(
//                   (option) =>
//                     option.value === visibility
//                 ) || null
//               }
//               onChange={(option) =>
//                 setVisibility(option.value)
//               }
//               label="Visibility"
//               orientation="horizontal"
//               variant="card"
//             />

//             <CustomRadio
//               options={activeOptions}
//               value={
//                 activeOptions.find(
//                   (option) =>
//                     option.value === active
//                 ) || null
//               }
//               onChange={(option) =>
//                 setActive(option.value)
//               }
//               label="Active"
//               orientation="horizontal"
//               variant="card"
//             />

//             <div className="flex justify-end gap-2 pt-2">

//               <Button
//                 variant="outline"
//                 text="Cancel"
//                 onClick={() => setIsOpen(false)}
//               />

//               <Button
//                 variant="primary"
//                 text="Create Project"
//                 onClick={() => {
//                   console.log({
//                     projectName,
//                     projectSummary,
//                     visibility,
//                     active,
//                   });

//                   setIsOpen(false);
//                 }}
//               />

//             </div>

//           </form>

//         </div>
//       </Modal>

//     </div>
//   );
// };

// export default Projects;



import { useState } from "react";

import OptionsContainer from "../components/UI/OptionsContainer";
import CustomInput from "../components/Login/CustomInput";
import Button from "../components/UI/Button";

import AddProjectModal from "../components/Project/AddProjectModal";
import ProjectList from "../components/Project/ProjectList";

const Projects = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Restaurant R1 V1",
      description:
        "Restaurant management system first version.",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      date: "17 May 2026",
      visibility: "PUBLIC",
    },
    {
      id: 2,
      title: "Restaurant R1 V2",
      description:
        "Restaurant management system second version.",
      image:
        "https://images.unsplash.com/photo-1552566626-52f8b828add9",
      date: "20 May 2027",
      visibility: "PRIVATE",
    },
  ]);

  const [search, setSearch] = useState("");

  const handleSaveProject = (project: any) => {
    setProjects((prev) => [project, ...prev]);
  };

  const filteredProjects = projects.filter((project) =>
    project.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <OptionsContainer>
        <div className="p-6">

          {/* Heading */}
          <h1 className="text-3xl font-bold mb-6">
            Projects
          </h1>

          {/* Search + Button */}
          <div className="flex justify-between items-center gap-4 mb-6">

            <div className="w-full max-w-md">
              <CustomInput
                placeholder="Search projects..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

            <Button
              text="Add Project"
              variant="primary"
              onClick={() => setIsOpen(true)}
            />

          </div>

          {/* Project List */}
          <ProjectList
            projects={filteredProjects}
          />

        </div>
      </OptionsContainer>

      <AddProjectModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSaveProject}
      />
    </>
  );
};

export default Projects;