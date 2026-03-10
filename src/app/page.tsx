import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <div className="flex flex-col items-center gap-6 rounded-md border border-gray-200 bg-white p-10 shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Welcome to CodeLeap network!</h1>
          <p className="text-gray-500">Login or register</p>
        </div>
        <div className="flex flex-row gap-4">
          <LoginLink className="w-36 rounded-lg bg-[#7695EC] px-6 py-3 text-center text-white font-semibold hover:bg-[#5a7de8] transition-colors">
            Login
          </LoginLink>
          <RegisterLink className="w-36 rounded-lg border border-[#7695EC] px-6 py-3 text-center text-[#7695EC] font-semibold hover:bg-[#7695EC] hover:text-white transition-colors">
            Register
          </RegisterLink>
        </div>
      </div>
    </div>
  );
}
