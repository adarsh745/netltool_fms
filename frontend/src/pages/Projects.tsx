import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchProjects, createProject, clearProjectError, deleteProject } from "../services/api/projectSlice";
import toast from "react-hot-toast";
import ConfirmationModal from "../components/UI/ConfirmationModal";
import { 
  LayoutGrid, 
  List as ListIcon, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

import OptionsContainer from "../components/UI/OptionsContainer";
import AddProjectModal from "../components/Project/AddProjectModal";
import ProjectList from "../components/Project/ProjectList";
import restaurantThumbnail from "../assets/restaurant_thumbnail.png";

const Projects = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<any | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  
  const { projects, loading, error } = useSelector(
    (state: RootState) => state.projects
  );

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearProjectError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsStatusDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSaveProject = async (projectDataRaw: any) => {
    if (!projectDataRaw.title || projectDataRaw.title.trim().length < 2) {
      toast.error("Project name must be at least 2 characters long.");
      return;
    }

    const payload = {
      name: projectDataRaw.title.trim(),
      summary: projectDataRaw.description || "",
      thumbnail: projectDataRaw.image || "",
      isActive: projectDataRaw.status === "ACTIVE",
      visibility: projectDataRaw.visibility || "PUBLIC",
      companyId: 1,
    };

    try {
      const resultAction = await dispatch(createProject(payload));
      if (createProject.fulfilled.match(resultAction)) {
        toast.success("Project created successfully!");
        setIsOpen(false);
        dispatch(fetchProjects());
      } else {
        const errDetail = resultAction.payload as string || "Failed to create project.";
        toast.error(errDetail);
      }
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred.");
    }
  };
  const handleDeleteProject = (project: any) => {
    setProjectToDelete(project);
    setIsDeleteOpen(true);
  };

  const mappedProjects = (projects || []).map((p: any) => ({
    id: p.id,
    title: p.name,
    description: p.summary || "",
    image: p.thumbnail || restaurantThumbnail,
    date: p.created_at
      ? new Date(p.created_at).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "17 May 2026",
    visibility: p.visibility || "PUBLIC",
    status: p.isActive ? "ACTIVE" : "INACTIVE",
    createdByName: "John Doe",
    createdTime: p.created_at
      ? new Date(p.created_at).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "10:30 PM",
    summary: p.summary || "",
    progress: p.progress || 0,
    updates: p.updates || [],
  }));

  const filteredProjects = mappedProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase());
      
    const matchesStatus =
      statusFilter === "ALL" || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  return (
    <>
      <OptionsContainer>
        <div className="p-4 sm:p-6 md:p-8 font-sans max-w-7xl mx-auto space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Projects</h1>
              <p className="text-gray-500 text-sm mt-1">Manage and track all your projects in one place.</p>
            </div>
            
            <button
              onClick={() => setIsOpen(true)}
              className="bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium text-sm px-4.5 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition shrink-0 shadow-sm cursor-pointer select-none active:scale-98"
            >
              <span className="text-lg font-semibold leading-none">+</span> Add Project
            </button>
          </div>

          <div className="bg-white border border-gray-200/90 rounded-xl p-5 md:p-6 shadow-xs">
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
              
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search projects by name or description..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-white border border-gray-300 rounded-lg pl-10.5 pr-4 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                />
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 w-full md:w-auto">
                
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition cursor-pointer select-none"
                  >
                    <Filter size={16} className="text-gray-400 stroke-[2.25]" />
                    <span>
                      {statusFilter === "ALL"
                        ? "All Status"
                        : statusFilter === "ACTIVE"
                        ? "Active"
                        : "Inactive"}
                    </span>
                    <ChevronDown 
                      size={14} 
                      className="text-gray-400 transition-transform duration-200" 
                      style={{ transform: isStatusDropdownOpen ? 'rotate(180deg)' : 'none' }}
                    />
                  </button>
                  
                  {isStatusDropdownOpen && (
                    <div className="absolute right-0 mt-1.5 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 font-sans">
                      <button
                        onClick={() => {
                          setStatusFilter("ALL");
                          setIsStatusDropdownOpen(false);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          statusFilter === "ALL" 
                            ? "bg-indigo-50 text-indigo-700 font-semibold" 
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        All Status
                      </button>
                      <button
                        onClick={() => {
                          setStatusFilter("ACTIVE");
                          setIsStatusDropdownOpen(false);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          statusFilter === "ACTIVE" 
                            ? "bg-indigo-50 text-indigo-700 font-semibold" 
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        Active
                      </button>
                      <button
                        onClick={() => {
                          setStatusFilter("INACTIVE");
                          setIsStatusDropdownOpen(false);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          statusFilter === "INACTIVE" 
                            ? "bg-indigo-50 text-indigo-700 font-semibold" 
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        Inactive
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shrink-0 bg-white">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors cursor-pointer border-r border-gray-300 ${
                      viewMode === "grid"
                        ? "bg-[#EEF2FF] text-[#4F46E5]"
                        : "text-gray-400 hover:text-gray-650 hover:bg-gray-50"
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid size={18} className="stroke-[2.25]" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors cursor-pointer ${
                      viewMode === "list"
                        ? "bg-[#EEF2FF] text-[#4F46E5]"
                        : "text-gray-400 hover:text-gray-650 hover:bg-gray-50"
                    }`}
                    title="List View"
                  >
                    <ListIcon size={18} className="stroke-[2.25]" />
                  </button>
                </div>

              </div>

            </div>

            {loading && projects.length === 0 ? (
              <div className="text-center py-16 text-gray-500 font-medium select-none">
                Loading projects...
              </div>
            ) : (
              <ProjectList
                projects={paginatedProjects}
                viewMode={viewMode}
                onDelete={handleDeleteProject}
              />
            )}

            {totalPages > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-8 border-t border-gray-150 font-sans text-sm text-gray-500">
                <div>
                  Showing <span className="font-semibold text-gray-800">{startIndex + 1}</span> to{" "}
                  <span className="font-semibold text-gray-800">
                    {Math.min(endIndex, filteredProjects.length)}
                  </span>{" "}
                  of <span className="font-semibold text-gray-800">{filteredProjects.length}</span> projects
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-1.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-500 disabled:opacity-50 disabled:hover:bg-white transition cursor-pointer disabled:cursor-not-allowed select-none"
                    >
                      <ChevronLeft size={16} className="stroke-[2.25]" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3.5 py-1.5 border rounded-lg text-sm font-semibold transition cursor-pointer select-none ${
                          currentPage === page
                            ? "bg-[#4F46E5] border-[#4F46E5] text-white"
                            : "bg-white border-gray-300 text-gray-750 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-1.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-500 disabled:opacity-50 disabled:hover:bg-white transition cursor-pointer disabled:cursor-not-allowed select-none"
                    >
                      <ChevronRight size={16} className="stroke-[2.25]" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg overflow-hidden px-2.5 py-1.5 font-medium text-gray-700 text-sm select-none">
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(parseInt(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="outline-none bg-transparent cursor-pointer pr-1 text-gray-800 font-semibold"
                    >
                      <option value="6">6 / page</option>
                      <option value="12">12 / page</option>
                      <option value="24">24 / page</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </OptionsContainer>

      <AddProjectModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSaveProject}
      />

      <ConfirmationModal
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Confirm Delete"
        heading="Delete Project"
        description={`Are you sure you want to delete "${projectToDelete?.title}"? This will permanently delete the project and all of its updates.`}
        onConfirm={async () => {
          if (projectToDelete) {
            try {
              const resultAction = await dispatch(deleteProject(projectToDelete.id));
              if (deleteProject.fulfilled.match(resultAction)) {
                toast.success("Project deleted successfully!");
                setIsDeleteOpen(false);
                setProjectToDelete(null);
                dispatch(fetchProjects());
              } else {
                const errDetail = resultAction.payload as string || "Failed to delete project.";
                toast.error(errDetail);
              }
            } catch (err: any) {
              toast.error(err.message || "An unexpected error occurred.");
            }
          }
        }}
        onCancle={() => {
          setIsDeleteOpen(false);
          setProjectToDelete(null);
        }}
      />
    </>
  );
};

export default Projects;