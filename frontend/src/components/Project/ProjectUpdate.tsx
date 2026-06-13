// export interface ProjectUpdate {
//   id: string;
//   title: string;
//   content: string;
//   date: string;
//   progress: number;
//   link?: string;
// }

// function ProjectUpdate({
//   update,
// }: {
//   update: ProjectUpdate;
// }) {
//   return (
//     <div className="border rounded-lg p-4">

//       <div className="flex justify-between">

//         <h3 className="font-semibold">
//           {update.title}
//         </h3>

//         <span className="text-xs text-gray-500">
//           {update.date}
//         </span>

//       </div>

//       <p className="text-sm mt-2">
//         {update.content}
//       </p>

//       <p className="mt-2">
//         {update.progress}%
//       </p>

//       {update.link && (
//         <a
//           href={update.link}
//           className="text-blue-500 text-sm"
//         >
//           {update.link}
//         </a>
//       )}
//     </div>
//   );
// }

// export default ProjectUpdate;