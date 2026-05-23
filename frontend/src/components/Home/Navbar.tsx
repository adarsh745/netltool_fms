import { NavLink } from "react-router-dom";

export interface NavItem {
  id: number;
  title: string;
  icon: string;
  path?: string;
  type?: "heading";
}

interface NavbarProps {
  options: NavItem[];
  title: string;
}

const Navbar = ({
  options,
  title,
}: NavbarProps) => {
  return (
    <aside
      className=" fixed top-0 left-0 z-50 h-screen  w-[270px]  bg-[#0B0B0B] text-white overflow-y-auto " >
       
      <div className="p-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[#7A7676] flex items-center justify-center  text-white font-bold text-xl " >
            N
          </div>

          <div>
            <h1  className="font-bold text-[16px] leading-none  " >
              {title}
            </h1>

            <p className=" text-[12px] text-[#D1D1D6]  mt-1 " >
              Founder Management System
            </p>
          </div>
        </div>
      </div>

      <div className="px-3 pb-3 flex flex-col gap-3">
        {options.map((item) => (
          <div key={item.id}>
            {item.type === "heading" ? (
              <div  className="px-2 pt-2 pb-1 text-[12px] uppercase tracking-wider text-[#B0B0B0]  font-bold " >
                {item.title}
              </div>
            ) : (
              <NavLink
                to={item.path || ""}
                className={({ isActive }) =>
                  `
                  flex items-center gap-4 px-4 py-[8px] rounded-md transition-all duration-200 text-[15px] font-medium
                  ${
                    isActive
                      ? "bg-[#7A7676]"
                      : "bg-black hover:bg-[#1B1B1B]"
                  }
                `
                }
              >
                <img  src={item.icon} alt={item.title}  className="w-6 h-6"/>
                <span>{item.title}</span>
              </NavLink>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Navbar;