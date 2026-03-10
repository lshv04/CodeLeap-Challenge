import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <div className="flex flex-col items-center gap-6 rounded-md border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col items-start gap-10 text-left">
          <h1 className="font-sans font-bold text-[22px] leading-none tracking-normal text-black ">
            Welcome to CodeLeap network!
          </h1>
          <p className="font-sans font-normal text-[16px] leading-none tracking-normal text-black">Login or register</p>
        </div>
        <div className="flex flex-row gap-4">
          <LoginLink className="w-36 rounded-lg bg-[#7695EC] px-3 py-2 text-center text-white font-sans font-bold text-[16px] leading-none tracking-normal hover:bg-[#5a7de8] transition-colors">
            Login
          </LoginLink>
          <RegisterLink className="w-36 rounded-lg border border-[#7695EC] px-3 py-2 text-center text-[#7695EC] font-sans font-bold text-[16px] leading-none tracking-normal hover:bg-[#7695EC] hover:text-white transition-colors">
            Register
          </RegisterLink>
        </div>
      </div>
    </div>
  );
}
