interface AlreadyRegisteredProps {
  user?: {
    first_name?: string;
    email?: string;
    role?: { name?: string };
  } | null;
}

const AlreadyRegistered = ({ user }: AlreadyRegisteredProps) => {
  const role = user?.role?.name ?? "Member";
  const email = user?.email ?? "";
  const firstName = user?.first_name ?? "";

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* Left Panel */}
      <div className="bg-[#0f0f0f] flex flex-col justify-between p-20 min-h-screen">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-10 w-10 rounded-xl" />
          <span className="text-white text-xl font-semibold tracking-widest uppercase">
            Netltool
          </span>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[3px] text-gray-600 mb-4">
            {role} Onboarding
          </p>
          <h1 className="text-5xl font-bold text-white leading-tight mb-5">
            Welcome back,
            <span className="text-gray-500 ml-2">{firstName}</span>
          </h1>
          <p className="text-gray-500 text-lg">
            Looks like you've already completed your onboarding. Your account is
            active and ready to go.
          </p>

          <div className="mt-10 flex flex-col gap-3">
            {[
              { label: "Platform", value: "Operational", active: true },
              { label: "Team access", value: role, active: true },
              { label: "Account", value: "Active", active: true },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 py-3 border-t border-[#1c1c1c]"
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.active ? "bg-gray-500" : "bg-[#2a2a2a]"
                  }`}
                />
                <span className="text-[12px] text-gray-600">
                  {item.label}{" "}
                  <span className="text-gray-400">{item.value}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-gray-700">© 2026 Netltool Robotics</p>
      </div>

      {/* Right Panel */}
      <div className="flex items-center justify-center bg-gray-50 p-10 min-h-screen">
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 p-10 flex flex-col items-center text-center">

          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-[#111] flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l5 5l10 -10" />
            </svg>
          </div>

          <p className="text-[10px] uppercase tracking-[3px] text-gray-400 mb-2">
            Account status
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Already registered
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Your account has already been set up. No further action is needed —
            you can sign in directly using your existing credentials.
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-gray-100 mb-6" />

          {/* Email pill */}
          {email && (
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              <span className="text-xs text-gray-500">{email} · Active</span>
            </div>
          )}

          <button
            onClick={() => (window.location.href = "/login")}
            className="w-full py-3 bg-[#111] text-white text-sm font-medium rounded-lg hover:bg-[#222] transition-colors mb-3"
          >
            Sign in to your account
          </button>

          <button
            onClick={() => (window.location.href = "mailto:support@netltool.io")}
            className="w-full py-3 bg-transparent text-gray-500 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Contact support
          </button>
        </div>
      </div>

    </div>
  );
};

export default AlreadyRegistered;