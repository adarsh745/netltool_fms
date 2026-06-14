import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchProjects } from "../services/api/projectSlice";
import { useGetStatsQuery } from "../services/api/blogSlice";
import { useGetUsersQuery, useGetRolesQuery } from "../services/api/userSlice";
import OptionsContainer from "../components/UI/OptionsContainer";
import HomepageSkeleton from "../components/Loading/HomepageSkeleton";
import { useAppData } from "../context/AppDate";
import {
  Folder,
  CheckCircle2,
  FileText,
  Clock,
  TrendingUp
} from "lucide-react";

export function Homepage() {
  const { user } = useAppData();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Fetch Stats (Blogs count)
  const { data: statsData, isLoading: statsLoading } = useGetStatsQuery("stats");

  // Fetch Projects (Redux store)
  const { projects, loading: projectsLoading } = useSelector(
    (state: RootState) => state.projects
  );

  // Fetch Employees (Users list)
  const { data: usersData, isLoading: usersLoading } = useGetUsersQuery(undefined);

  // Fetch Roles
  const { data: rolesData, isLoading: rolesLoading } = useGetRolesQuery(undefined);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const isLoading = statsLoading || projectsLoading || usersLoading || rolesLoading;

  if (isLoading) {
    return (
      <OptionsContainer>
        <HomepageSkeleton />
      </OptionsContainer>
    );
  }

  // Calculate counts dynamically from APIs
  const totalProjects = projects?.length || 0;
  const blogCount = statsData?.blog_count || 0;

  const kpis = [
    {
      title: "Projects",
      value: String(totalProjects),
      icon: <Folder className="text-blue-600 stroke-[2.25]" size={22} />,
      bgIcon: "bg-blue-50",
      growth: "20% from last month",
    },
    {
      title: "Tasks",
      value: "8",
      icon: <CheckCircle2 className="text-emerald-600 stroke-[2.25]" size={22} />,
      bgIcon: "bg-emerald-50",
      growth: "100% from last month",
    },
    {
      title: "Blogs / Notes",
      value: String(blogCount),
      icon: <FileText className="text-purple-600 stroke-[2.25]" size={22} />,
      bgIcon: "bg-purple-50",
      growth: "100% from last month",
    },
    {
      title: "Hours Recorded",
      value: "5h 30m",
      icon: <Clock className="text-[#A76F32] stroke-[2.25]" size={22} />,
      bgIcon: "bg-[#FDF6ED]",
      growth: "25% from last month",
    },
  ];

  return (
    <OptionsContainer>
      <div className="p-4 sm:p-6 md:p-8 flex flex-col bg-[#F2F2F7] w-full min-h-screen gap-6 sm:gap-8 font-sans max-w-7xl mx-auto">

        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              Good Morning, {user?.first_name || "Founder"}! 👋
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Here's what's happening in your organization today.
            </p>
          </div>

        </div>

        {/* Overview Section Label */}
        <div className="space-y-4">
          <p className="text-xs font-bold text-gray-400 tracking-wider uppercase select-none">
            Organization Overview
          </p>

          {/* Grid of KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {kpis.map((kpi, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200/90 rounded-xl p-4 sm:p-5 flex flex-col gap-3 sm:gap-4 shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-350 cursor-default select-none group"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                    {kpi.title}
                  </span>
                  <div className={`p-2.5 rounded-lg ${kpi.bgIcon} transition group-hover:scale-105`}>
                    {kpi.icon}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    {kpi.value.toLocaleString()}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                    <TrendingUp size={12} className="stroke-[2.5]" />
                    <span>{kpi.growth}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </OptionsContainer>
  );
}

export default Homepage;