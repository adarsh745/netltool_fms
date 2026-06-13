import ProjectCard from "./projectcard";

function ProjectList({ projects }: any) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-4 bg-white">
      {projects.map((project: any) => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}
    </div>
  );
}

export default ProjectList;