import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import PostsSection from "@/components/PostsSection";

export default async function Dashboard() {
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    redirect("/");
  }

  const user = await getUser();

  return (
    <PostsSection
      userId={user!.id}
      userName={user!.given_name ?? user!.email ?? "User"}
    />
  );
}
