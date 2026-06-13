function ProjectCard({ project }: any) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center bg-white hover:shadow-sm transition">

      <div className="flex gap-4">

        <img
          src={project.image}
          alt={project.title}
          className="w-20 h-16 rounded-md object-cover"
        />

        <div>
          <h3 className="font-semibold text-lg">
            {project.title}
          </h3>

          <p className="text-sm text-gray-500">
            {project.description}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Created at {project.date}
          </p>

          <p
            className={`text-xs font-medium mt-1 ${
              project.status === "ACTIVE"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {project.status}
          </p>
        </div>

      </div>

      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          project.visibility === "PUBLIC"
            ? "bg-green-100 text-green-700"
            : "bg-blue-100 text-blue-700"
        }`}
      >
        {project.visibility}
      </span>

    </div>
  );
}

export default ProjectCard;