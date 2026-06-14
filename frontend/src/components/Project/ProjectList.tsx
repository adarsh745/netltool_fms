import ProjectCard from "./projectcard";

interface ProjectListProps {
  projects: any[];
  viewMode: "grid" | "list";
  onDelete: (project: any) => void;
}

function ProjectList({ projects, viewMode, onDelete }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-16 bg-[#ebebeb]/30 border border-dashed border-neutral-300 rounded-xl">
        <p className="text-sm text-gray-500 font-medium font-sans select-none">
          No projects found matching the criteria.
        </p>
      </div>
    );
  }

  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : "flex flex-col gap-4"
      }
    >
      {projects.map((project: any) => (
        <ProjectCard
          key={project.id}
          project={project}
          viewMode={viewMode}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ProjectList;