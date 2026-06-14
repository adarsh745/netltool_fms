import { useNavigate } from "react-router-dom";
import { MoreVertical, Calendar } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAppData } from "../../context/AppDate";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
    date: string;
    visibility: string;
    status: string;
  };
  viewMode: "grid" | "list";
  onDelete: (project: any) => void;
}

export default function ProjectCard({ project, viewMode, onDelete }: ProjectCardProps) {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { permissions } = useAppData();
  const allowedPermissionNames = new Set<string>(
    permissions?.map((p: { name: string }) => p.name) ?? []
  );
  const canDelete = allowedPermissionNames.has("projects:delete");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    navigate(`/project-updates/${project.id}`);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const isPublic = project.visibility === "PUBLIC";
  const isActive = project.status === "ACTIVE";

  if (viewMode === "list") {
    return (
      <div
        onClick={handleClick}
        className="border border-gray-250/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-pointer select-none group w-full font-sans"
      >
        <div className="flex gap-4 items-center w-full min-w-0">
          <div className="w-24 h-16 rounded-lg overflow-hidden shrink-0 border border-gray-200 bg-neutral-50">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4";
              }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-bold text-gray-900 text-base group-hover:text-indigo-650 transition-colors truncate max-w-[200px] sm:max-w-md">
                {project.title}
              </h3>
              <span
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide shrink-0 ${
                  isPublic
                    ? "bg-[#E6F4EA] text-[#137333]"
                    : "bg-[#F3E8FF] text-[#6B21A8]"
                }`}
              >
                {isPublic ? "Public" : "Private"}
              </span>
            </div>

            <p className="text-gray-500 text-xs sm:text-sm truncate">
              {project.description}
            </p>

            <div className="flex items-center gap-1.5 text-gray-400 mt-2 font-medium text-xs">
              <Calendar size={12} className="stroke-[2.5]" />
              <span>Created {project.date}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto shrink-0 self-end sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 mt-2 sm:mt-0">
          <span
            className={`px-2.5 py-0.5 rounded-md text-xs font-semibold ${
              isActive
                ? "bg-[#E6F4EA] text-[#137333]"
                : "bg-[#FCE8E6] text-[#C5221F]"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>

          {canDelete && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={handleMenuClick}
                className="text-gray-400 hover:text-gray-600 hover:bg-neutral-100 p-1.5 rounded-md transition cursor-pointer"
                aria-label="Options"
              >
                <MoreVertical size={16} className="stroke-[2.25]" />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden font-sans">
                  <button
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMenuOpen(false);
                      onDelete(project);
                    }}
                  >
                    Delete Project
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Grid view (Standard)
  return (
    <div
      onClick={handleClick}
      className="relative border border-gray-250/85 rounded-xl bg-white overflow-hidden shadow-xs hover:shadow-md hover:border-gray-350 transition-all duration-300 cursor-pointer select-none flex flex-col h-full group font-sans"
    >
      {/* Banner / Image section */}
      <div className="relative w-full h-40 overflow-hidden shrink-0 bg-neutral-100 border-b border-neutral-200/50">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4";
          }}
        />

        {/* Overlays */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
              isPublic
                ? "bg-[#E6F4EA] text-[#137333]"
                : "bg-[#F3E8FF] text-[#6B21A8]"
            }`}
          >
            {isPublic ? "Public" : "Private"}
          </span>
        </div>
      </div>

      {canDelete && (
        <div className="absolute top-2 right-2 z-10" ref={menuRef}>
          <button
            onClick={handleMenuClick}
            className="text-white hover:bg-black/25 bg-black/10 backdrop-blur-xs p-1.5 rounded-md transition cursor-pointer"
            aria-label="Options"
          >
            <MoreVertical size={16} className="stroke-[2.5]" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden font-sans">
              <button
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(false);
                  onDelete(project);
                }}
              >
                Delete Project
              </button>
            </div>
          )}
        </div>
      )}

      {/* Body content */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
        <div className="space-y-2 mb-4">
          <h3 className="font-bold text-gray-900 text-base sm:text-lg group-hover:text-indigo-650 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-gray-400 font-medium text-xs sm:text-sm">
            <Calendar size={14} className="stroke-[2.25] text-gray-400" />
            <span>{project.date}</span>
          </div>

          <span
            className={`px-2 py-0.5 rounded-sm text-xs font-semibold ${
              isActive
                ? "bg-[#E6F4EA] text-[#137333]"
                : "bg-[#FCE8E6] text-[#C5221F]"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
    </div>
  );
}