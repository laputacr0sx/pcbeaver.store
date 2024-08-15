import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Image from "next/image";

export default function MyNavBar() {
  return (
    <NavigationMenu className="w-full flex-row items-center justify-between px-4">
      <Link href="/">
        <Image
          alt="Computer Assemble"
          src={"/Project-ICON.png"}
          width={128}
          height={40}
        />
      </Link>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/signin" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Sign-in
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
