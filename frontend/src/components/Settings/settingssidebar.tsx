import Button from "../UI/Button";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function SettingsSidebar({ activeTab, setActiveTab }: Props) {
  return (
    <div className="w-full md:w-[200px] border border-gray-200 rounded-md p-4 flex flex-row md:flex-col items-center md:items-stretch justify-between md:justify-start gap-4 md:gap-5 flex-wrap md:flex-nowrap font-sans">
      <h3 className="font-bold text-lg md:text-xl text-black mb-0 md:mb-5 shrink-0 select-none">
        Settings
      </h3>

      <div className="flex flex-row md:flex-col gap-2 md:gap-3 flex-1 md:flex-initial">
        <button
          onClick={() => setActiveTab("general")}
          className={`flex-1 md:flex-none border border-gray-400 py-1 md:py-1.5 px-4 rounded-md text-sm md:text-lg font-medium transition-all cursor-pointer
            ${
              activeTab === "general"
                ? "bg-black text-white"
                : "bg-white text-gray-800 hover:bg-neutral-50"
            }
          `}
        >
          General
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`flex-1 md:flex-none border border-gray-400 py-1 md:py-1.5 px-4 rounded-md text-sm md:text-lg font-medium transition-all cursor-pointer
            ${
              activeTab === "profile"
                ? "bg-black text-white"
                : "bg-white text-gray-800 hover:bg-neutral-50"
            }
          `}
        >
          Profile
        </button>
      </div>

      <div className="mt-0 md:mt-auto pt-0 md:pt-6 shrink-0">
        <Button
          text="Logout"
          variant="primary"
          wide
        />
      </div>
    </div>
  );
}

export default SettingsSidebar;