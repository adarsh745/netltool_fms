import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import OptionsContainer from "../components/UI/OptionsContainer";
import UpdateCard, { Update } from "../components/Project/UpdateCard";
import { UpdateProjectModal } from "../components/Project/UpdateProjectModal";
import restaurantThumbnail from "../assets/restaurant_thumbnail.png";

const BASE_URL = (import.meta as any).env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

export function ProjectUpdates() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<any>(null);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [projectProgress, setProjectProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!projectId) return;
    setLoading(true);
    try {
      // 1. Fetch all projects to find this specific project details
      const projectsRes = await axios.get(`${BASE_URL}/projects/`);
      const allProjects = projectsRes.data.projects || [];
      const currentProject = allProjects.find(
        (p: any) => String(p.id) === String(projectId)
      );

      if (!currentProject) {
        toast.error("Project not found.");
        navigate("/projects");
        return;
      }

      setProject(currentProject);

      // 2. Fetch updates for this project
      const updatesRes = await axios.get(`${BASE_URL}/projects/${projectId}/updates`);
      const allUpdates = updatesRes.data.updates || [];

      // Sort updates by created_at descending (newest first)
      const sortedUpdates = [...allUpdates].sort((a: any, b: any) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });

      const mapped = sortedUpdates.map((u: any) => ({
        id: String(u.id),
        title: u.title,
        content: u.content || "",
        timestamp: u.created_at
          ? new Date(u.created_at).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }) + " • " + new Date(u.created_at).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "12 May 2026 • 10:30 PM",
        percentage: u.progress || 0,
        link: u.image || "",
      }));

      setUpdates(mapped);

      // Use the progress of the latest update, or default to 0
      const latestProgress = mapped.length > 0 ? mapped[0].percentage : 0;
      setProjectProgress(latestProgress);
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.detail || "Failed to load project details.");
      navigate("/projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [projectId]);

  const handleAddUpdate = async (newUpdateData: {
    title: string;
    content: string;
    percentage: number;
    link: string;
  }) => {
    if (!project || !projectId) return;

    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const payload = {
        title: newUpdateData.title.trim(),
        content: newUpdateData.content.trim(),
        progress: newUpdateData.percentage,
        image: newUpdateData.link || "",
        projectId: parseInt(projectId),
      };

      await axios.post(
        `${BASE_URL}/projects/${projectId}/add-update`,
        payload,
        { headers }
      );

      toast.success("Project update created successfully!");
      // Reload details and updates
      fetchData();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.detail || "Failed to add project update.");
    }
  };

  if (loading) {
    return (
      <OptionsContainer>
        <div className="p-6 text-center text-gray-500 font-medium select-none">
          Loading project details...
        </div>
      </OptionsContainer>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <OptionsContainer>
      <div className="p-4 sm:p-6 md:p-8 font-sans max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/projects")}
          className="flex items-center gap-2 text-gray-900 font-bold hover:opacity-80 transition-opacity mb-6 text-base md:text-lg cursor-pointer"
        >
          <span className="text-xl">←</span> Back to Projects
        </button>

        {/* Project Card */}
        <div className="bg-[#ebebeb] border border-neutral-300 rounded-md p-4 sm:p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            {/* Project Thumbnail */}
            <div className="w-full max-w-[240px] md:w-48 h-36 md:h-32 rounded-md border border-neutral-400 overflow-hidden shrink-0 shadow-sm bg-neutral-200">
              <img
                src={project.thumbnail || restaurantThumbnail}
                alt={project.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = restaurantThumbnail;
                }}
              />
            </div>

            {/* Meta Information */}
            <div className="flex-1 w-full text-center md:text-left">
              <h1 className="text-gray-950 font-bold text-2xl md:text-3xl mb-4">
                {project.name}
              </h1>

              <div className="grid grid-cols-[1fr] sm:grid-cols-[auto_10px_1fr] gap-y-2 gap-x-3 text-sm md:text-base text-gray-800">
                <div className="flex justify-between sm:justify-start">
                  <span className="font-semibold text-gray-900">Created At</span>
                  <span className="sm:hidden font-medium">
                    : {project.created_at
                      ? new Date(project.created_at).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "17 May 2026"}
                  </span>
                </div>
                <span className="hidden sm:inline text-neutral-500">:</span>
                <span className="hidden sm:inline font-medium">
                  {project.created_at
                    ? new Date(project.created_at).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }) + " , " + new Date(project.created_at).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "17 May 2026 , 10:30 PM"}
                </span>

                <div className="flex justify-between sm:justify-start">
                  <span className="font-semibold text-gray-900">Created By</span>
                  <span className="sm:hidden font-medium">: John Doe</span>
                </div>
                <span className="hidden sm:inline text-neutral-500">:</span>
                <span className="hidden sm:inline font-medium">John Doe</span>

                <div className="flex justify-between sm:justify-start items-center">
                  <span className="font-semibold text-gray-900">Progress</span>
                  <span className="sm:hidden font-bold">: {projectProgress}%</span>
                </div>
                <span className="hidden sm:inline text-neutral-500 flex items-center">:</span>
                <div className="flex items-center gap-3 w-full justify-end sm:justify-start">
                  <span className="hidden sm:inline font-bold text-gray-900">
                    {projectProgress}%
                  </span>
                  <div className="flex-1 h-3 bg-neutral-300 rounded-full overflow-hidden max-w-[200px]">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${projectProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Box */}
        <div className="bg-[#ebebeb] border border-neutral-300 rounded-md p-5 mb-6">
          <h2 className="text-gray-950 font-bold text-base md:text-lg mb-2">
            Summary
          </h2>
          <p className="text-gray-800 text-sm md:text-base leading-relaxed">
            {project.summary || "No summary provided for this project."}
          </p>
        </div>

        {/* Create Update Button Row */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-black hover:bg-neutral-800 text-white font-bold text-sm md:text-base px-8 py-2.5 rounded-md transition-all active:scale-98 shadow-sm cursor-pointer"
          >
            Create Update
          </button>
        </div>

        {/* Project Updates List */}
        <div>
          <h2 className="text-gray-950 font-bold text-lg md:text-xl mb-4 border-b border-neutral-300 pb-2">
            Project Updates
          </h2>
          <div className="space-y-4">
            {updates.length > 0 ? (
              updates.map((update) => (
                <UpdateCard key={update.id} update={update} />
              ))
            ) : (
              <div className="text-center py-12 bg-[#ebebeb] border border-dashed border-neutral-300 rounded-md">
                <p className="text-sm text-gray-500">No updates yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Update Modal */}
      <UpdateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddUpdate}
      />
    </OptionsContainer>
  );
}

export default ProjectUpdates;