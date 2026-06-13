// import { useState } from "react";

// import Button from "../components/UI/Button";

// import CreateUpdateModal from "../components/Project/UpdateCard";
// import ProjectUpdateCard from "../components/Projects/ProjectUpdateCard";

// function ProjectDetails() {

//   const [openModal, setOpenModal] =
//     useState(false);

//   return (
//     <>
//       <div className="bg-white rounded-xl p-6">

//         <button className="font-medium">
//           ← Back to Projects
//         </button>

//         <div className="border rounded-lg p-4 mt-5">

//           <div className="flex gap-6">

//             <img
//               src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
//               className="w-28 h-28 rounded"
//             />

//             <div>

//               <h2 className="text-3xl font-bold">
//                 Restaurant R1 V1
//               </h2>

//               <p>
//                 Created At :
//                 17 May 2026
//               </p>

//               <p>
//                 Created By :
//                 John Doe
//               </p>

//               <div className="flex items-center gap-4 mt-3">

//                 <span>65%</span>

//                 <div className="w-[300px] bg-gray-200 h-2 rounded">

//                   <div className="w-[65%] bg-green-500 h-2 rounded" />

//                 </div>

//               </div>

//             </div>
//           </div>

//           <div className="border rounded-lg p-4 mt-5">

//             <h3 className="font-semibold">
//               Summary
//             </h3>

//             <p className="mt-2">
//               Restaurant management
//               system first version.
//             </p>

//           </div>

//           <div className="flex justify-between items-center mt-6 mb-4">

//             <h3 className="font-semibold">
//               Project Updates
//             </h3>

//             <Button
//               text="Create Update"
//               onClick={() =>
//                 setOpenModal(true)
//               }
//             />

//           </div>

//           <div className="space-y-4">

//             <ProjectUpdateCard
//               update={{
//                 id: "1",
//                 title:
//                   "Authentication Added",
//                 content:
//                   "Added login register functionality",
//                 date: "12 May 2026",
//                 progress: 75,
//                 link:
//                   "https://github.com",
//               }}
//             />

//             <ProjectUpdateCard
//               update={{
//                 id: "2",
//                 title:
//                   "Dashboard UI Updated",
//                 content:
//                   "Added analytics widgets",
//                 date: "13 May 2026",
//                 progress: 85,
//                 link:
//                   "https://github.com",
//               }}
//             />

//           </div>
//         </div>
//       </div>

//       <CreateUpdateModal
//         isOpen={openModal}
//         onClose={() =>
//           setOpenModal(false)
//         }
//       />
//     </>
//   );
// }

// export default ProjectDetails;