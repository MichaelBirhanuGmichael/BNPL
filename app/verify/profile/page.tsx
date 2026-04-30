"use client";

import { ChangeEvent, FormEvent, ReactNode, useMemo, useState } from "react";
import { ChevronLeft, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { mockDashboardData } from "@/data/mockDashboardData";

type ProfileFormState = {
  fullName: string;
  gender: string;
  phoneNumber: string;
  dateOfBirth: string;
  region: string;
  city: string;
  subcity: string;
  addressLine: string;
};

export default function VerifyProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState<ProfileFormState>({
    fullName: `${mockDashboardData.user.firstName} Kebede`,
    gender: "Male",
    phoneNumber: "+251 900 000 000",
    dateOfBirth: "",
    region: "Addis Ababa",
    city: "Addis Ababa",
    subcity: "",
    addressLine: "",
  });

  const handleInputChange =
    (field: keyof ProfileFormState) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const requiredCompleted = useMemo(
    () =>
      Boolean(
        form.fullName.trim() &&
          form.gender.trim() &&
          form.phoneNumber.trim() &&
          form.dateOfBirth.trim() &&
          form.region.trim() &&
          form.city.trim() &&
          form.subcity.trim() &&
          form.addressLine.trim()
      ),
    [form]
  );

  const handleContinue = (event: FormEvent) => {
    event.preventDefault();
    router.push("/discover");
  };

  return (
    <div className="min-h-screen max-w-[400px] mx-auto bg-white flex flex-col">
      <div className="px-6 pt-8 pb-6">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <form onSubmit={handleContinue} className="flex-1 px-6 pb-32 overflow-y-auto">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Complete your profile</h1>
        <p className="mt-3 text-gray-500">
          We prefilled what we can. Confirm your details to finish onboarding and unlock MEREQ.
        </p>

        <div className="mt-7 space-y-4">
          <Field label="Full Name">
            <input
              type="text"
              value={form.fullName}
              onChange={handleInputChange("fullName")}
              className="w-full h-14 rounded-2xl bg-gray-50 px-4 text-base font-medium text-gray-900 outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder="Enter full name"
            />
          </Field>

          <Field label="Gender">
            <select
              value={form.gender}
              onChange={handleInputChange("gender")}
              className="w-full h-14 rounded-2xl bg-gray-50 px-4 text-base font-medium text-gray-900 outline-none focus:ring-2 focus:ring-emerald-200 appearance-none"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Prefer not to say</option>
            </select>
          </Field>

          <Field label="Phone Number">
            <input
              type="text"
              value={form.phoneNumber}
              onChange={handleInputChange("phoneNumber")}
              className="w-full h-14 rounded-2xl bg-gray-50 px-4 text-base font-medium text-gray-900 outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder="+251 9XX XXX XXX"
            />
          </Field>

          <Field label="Date of Birth">
            <input
              type="date"
              value={form.dateOfBirth}
              onChange={handleInputChange("dateOfBirth")}
              className="w-full h-14 rounded-2xl bg-gray-50 px-4 text-base font-medium text-gray-900 outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Region">
              <input
                type="text"
                value={form.region}
                onChange={handleInputChange("region")}
                className="w-full h-14 rounded-2xl bg-gray-50 px-4 text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="Region"
              />
            </Field>
            <Field label="City">
              <input
                type="text"
                value={form.city}
                onChange={handleInputChange("city")}
                className="w-full h-14 rounded-2xl bg-gray-50 px-4 text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="City"
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Subcity">
              <input
                type="text"
                value={form.subcity}
                onChange={handleInputChange("subcity")}
                className="w-full h-14 rounded-2xl bg-gray-50 px-4 text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="Subcity"
              />
            </Field>
            <Field label="Address Line">
              <input
                type="text"
                value={form.addressLine}
                onChange={handleInputChange("addressLine")}
                className="w-full h-14 rounded-2xl bg-gray-50 px-4 text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder="House / Street"
              />
            </Field>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          <Lock className="w-4 h-4 text-emerald-500" />
          <span className="text-xs text-gray-500">Your profile data is encrypted and stored securely.</span>
        </div>
      </form>

      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
        <div className="max-w-[400px] mx-auto">
          <button
            type="submit"
            onClick={handleContinue}
            className="w-full h-14 rounded-full bg-emerald-500 text-white font-semibold text-base disabled:bg-gray-300 disabled:text-gray-500 hover:bg-emerald-600 transition-colors"
            disabled={!requiredCompleted}
          >
            Save and Continue
          </button>
        </div>
      </footer>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
