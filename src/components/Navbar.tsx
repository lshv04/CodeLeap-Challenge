import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default async function Navbar() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const authenticated = await isAuthenticated();
  const user = authenticated ? await getUser() : null;

  return (
    <nav className="w-full bg-[#7695EC] h-16 flex items-center justify-between px-8">
      <span className="text-white text-xl font-bold">CodeLeap Network</span>
      {authenticated && user && (
        <div className="flex items-center gap-4">
          <span className="text-white text-sm font-medium">
            {user.given_name ?? user.email}
          </span>
          <LogoutLink className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#7695EC] hover:bg-gray-100 transition-colors">
            Logout
          </LogoutLink>
        </div>
      )}
    </nav>
  );
}
