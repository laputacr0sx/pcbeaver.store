import Link from "next/link";

function AuthenticationButton() {
  return (
    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
      <Link
        href="/signin"
        className="text-sm font-medium text-gray-700 hover:text-gray-800"
      >
        Sign In
      </Link>
      <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
    </div>
  );
}

export default AuthenticationButton;
