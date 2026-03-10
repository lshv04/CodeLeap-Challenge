import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    redirect("/");
  }

  const user = await getUser();

  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <p className="text-gray-700 text-lg">
        Welcome, {user?.given_name ?? user?.email}!
      </p>
    </div>
  );
}
