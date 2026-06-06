interface ExpiredInvitationProps {
  reason?: "expired" | "invalid" | "used";
}

const reasonMap = {
  expired: {
    label: "Link expired",
    description:
      "This invitation link has expired. Links are time-limited for security. Please request a new one from your admin.",
    pill: "Token expired",
  },
  invalid: {
    label: "Invalid link",
    description:
      "This invitation link is not valid. It may have been tampered with or copied incorrectly. Please request a fresh invite.",
    pill: "Token invalid",
  },
  used: {
    label: "Link already used",
    description:
      "This invitation link has already been used. Each link is single-use only. If you haven't registered yet, contact support.",
    pill: "Token already used",
  },
};

const ExpiredInvitation = ({ reason = "expired" }: ExpiredInvitationProps) => {
  const content = reasonMap[reason];

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
            Onboarding
          </p>
          <h1 className="text-5xl font-bold text-white leading-tight mb-5">
            Link
            <span className="text-gray-600 ml-2 block">expired</span>
          </h1>
          <p className="text-gray-500 text-lg">
            Your invitation link is no longer valid. Please reach out to your
            admin to get a fresh invite sent to your email.
          </p>

          <div className="mt-10 flex flex-col gap-3">
            {[
              { label: "Invitation", value: "Expired", active: false },
              { label: "Token", value: "Invalid", active: false },
              { label: "Access", value: "Denied", active: false },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 py-3 border-t border-[#1c1c1c]"
              >
                <span className="w-2 h-2 rounded-full bg-[#2a2a2a]" />
                <span className="text-[12px] text-gray-700">
                  {item.label}{" "}
                  <span className="text-gray-600">{item.value}</span>
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
          <div className="w-16 h-16 rounded-full bg-[#1c1c1c] flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#777"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5" />
              <path d="M12 16v.01" />
            </svg>
          </div>

          <p className="text-[10px] uppercase tracking-[3px] text-gray-400 mb-2">
            Invitation status
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {content.label}
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            {content.description}
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-gray-100 mb-6" />

          {/* Status pill */}
          <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span className="text-xs text-gray-500">{content.pill}</span>
          </div>

          <button
            onClick={() =>
              (window.location.href = "mailto:support@netltool.io?subject=New Invitation Request")
            }
            className="w-full py-3 bg-[#111] text-white text-sm font-medium rounded-lg hover:bg-[#222] transition-colors mb-3"
          >
            Request a new invite
          </button>

          <button
            onClick={() => (window.location.href = "/login")}
            className="w-full py-3 bg-transparent text-gray-500 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Sign in instead
          </button>
        </div>
      </div>

    </div>
  );
};

export default ExpiredInvitation;