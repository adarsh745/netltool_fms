import Navbar, { NavItem, } from "../components/Home/Navbar";

import Blogs from "../assets/Navbar/Blogs.svg";
import Calender from "../assets/Navbar/Calender.svg";
import Hardware from "../assets/Navbar/Hardware.svg";
import Home from "../assets/Navbar/Home.svg";
import Projects from "../assets/Navbar/Projects.svg";
import Setting from "../assets/Navbar/Setting.svg";
import Task from "../assets/Navbar/Task.svg";
import Transcript from "../assets/Navbar/Transcript.svg";
import VideoRecorder from "../assets/Navbar/Video-recorder.svg";
import Video from "../assets/Navbar/Video.svg";

const navItems: NavItem[] = [
  {
    id: 1,
    title: "Dashboard",
    icon: Home,
    path: "/",
  },

  {
    id: 2,
    title: "Video Recorder",
    icon: VideoRecorder,
    path: "/video-recorder",
  },

  {
    id: 3,
    title: "Videos",
    icon: Video,
    path: "/videos",
  },

  {
    id: 4,
    title: "Transcripts",
    icon: Transcript,
    path: "/transcripts",
  },

  {
    id: 5,
    title: "Blogs / Notes",
    icon: Blogs,
    path: "/blogs",
  },

  {
    id: 6,
    title: "Hardware Components",
    icon: Hardware,
    path: "/hardwarecomponents"
  },
  {
    id: 7,
     title: "Projects",
        icon: Projects,
        path: "/projects",
  },
  
  {
    id: 8,
    title: "Tasks",
        icon: Task,
        path: "/tasks",
  },
  {
    id: 9,
    title: "Calendar",
        icon: Calender,
        path: "/calendar",
  },


  {
    id: 10,
    title: "Setting",
    icon: Setting,
    path: "/settings",
  },
];

const Homepage = () => {
  return (
    <div className="flex">
      <Navbar
        title="Netltool_FMS"
        options={navItems}
      />
    </div>
  );
};

export default Homepage;