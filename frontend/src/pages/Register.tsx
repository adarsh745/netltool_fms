import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import CustomInput from "../components/Login/CustomInput";
import Button from "../components/UI/Button";
import AlreadyRegistered from "../components/Register/AlreadyRegistered";
import ExpiredInvitation from "../components/Register/ExpiredInvitation";

const Register = () => {

  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    profileImage: File | null;
  }>({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    profileImage: null,
  });

  const [verifiedUser, setVerifiedUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [tokenInvalid, setTokenInvalid] = useState(false);
  // Optionally distinguish "expired" | "invalid" | "used" from your API error response
  const [invalidReason, setInvalidReason] = useState<"expired" | "invalid" | "used">("expired");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "profileImage" && files) {
      setFormData((prev) => ({ ...prev, profileImage: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  async function verifyToken() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("invitation_token");

    if (!token) {
      setInvalidReason("invalid");
      setTokenInvalid(true);
      return;
    }

    try {
      const response = await axios.get(
        `${(import.meta as any).env.VITE_API_BASE_URL}/auth/check-invitation-token`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Token verification successful:", response.data.user);

      setVerifiedUser(response.data.user);

      if (response.data.user.is_register) {
        setIsRegistered(true);
      }
    } catch (err: any) {
      console.error("Error verifying token:", err);
      // Optionally map your API error codes to a reason:
      // const detail = err?.response?.data?.detail ?? "";
      // if (detail.includes("expired")) setInvalidReason("expired");
      // else if (detail.includes("used")) setInvalidReason("used");
      // else setInvalidReason("invalid");
      setTokenInvalid(true);
    }
  }

  useEffect(() => {
    verifyToken();
  }, []);

  // ── Early returns for non-form states ──────────────────────────────────────
  if (tokenInvalid) return <ExpiredInvitation reason={invalidReason} />;
  if (isRegistered) return <AlreadyRegistered user={verifiedUser} />;
  // ──────────────────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("invitation_token");

    if (!token) {
      setError("Invalid invitation link. No token found.");
      setLoading(false);
      return;
    }

    try {
      const formPayload = new FormData();
      formPayload.append("first_name", formData.firstName);
      formPayload.append("last_name", formData.lastName);
      formPayload.append("phone", formData.phone);
      formPayload.append("password", formData.password);
      if (formData.profileImage) {
        formPayload.append("profile_image", formData.profileImage);
      }

      const response = await axios.put(
        `${(import.meta as any).env.VITE_API_BASE_URL}/auth/register-user`,
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Registration successful:", response.data);
      toast.success("Account created successfully! Please log in.");
      window.location.href = "/login";
    } catch (err: any) {
      console.error("Registration error:", err);
      const msg =
        err?.response?.data?.detail ?? "Failed to create account. Please try again.";
      setError(typeof msg === "string" ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  }

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
            {verifiedUser?.role?.name || "Default"} Onboarding
          </p>
          <h1 className="text-5xl font-bold text-white leading-tight mb-5">
            Welcome onboard,
            <span className="text-gray-400 ml-2">{verifiedUser?.first_name}</span>
          </h1>
          <p className="text-gray-500 text-lg">
            We're going to have a wild ride of innovation, creativity, and fun.
            Thrilled to have you on the Core Team.
          </p>

          <div className="mt-10 flex flex-col gap-3">
            {[
              { label: "Platform", value: "Operational", active: true },
              { label: "Team access", value: verifiedUser?.role?.name || "Default", active: true },
              { label: "Fleet nodes", value: "Syncing...", active: false },
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
                  {item.label} <span className="text-gray-400">{item.value}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-gray-700">© 2026 Netltool Robotics</p>
      </div>

      {/* Right Panel */}
      <div className="flex items-center justify-center bg-gray-50 p-10 min-h-screen">
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 p-10">
          <p className="text-[11px] uppercase tracking-[2px] text-gray-400 mb-2">
            Get started
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Create your account
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <CustomInput label="First Name" name="firstName" placeholder="Udai" type="text" onChange={handleChange} />
              <CustomInput label="Last Name" name="lastName" placeholder="Sai" type="text" onChange={handleChange} />
            </div>

            <CustomInput label="Phone Number" name="phone" placeholder="+91 98765 43210" type="tel" onChange={handleChange} />
            <CustomInput label="Password" name="password" placeholder="Min. 8 chars" type="password" onChange={handleChange} />
            <CustomInput label="Profile Photo" name="profileImage" placeholder="" type="file" onChange={handleChange} />

            {error && (
              <p className="text-xs text-red-500 -mt-2">{error}</p>
            )}

            <Button text="Create Account" isLoading={loading} variant="long" type="submit" />

            <p className="text-center text-xs text-gray-400 mt-1">
              Already have an account?{" "}
              <a href="/login" className="text-gray-700 font-medium hover:underline">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>

    </div>
  );
};

export default Register;