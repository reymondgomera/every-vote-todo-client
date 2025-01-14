import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/utils";
import { User } from "@/types";
import { LogOut } from "lucide-react";
import { forwardRef } from "react";

//* User button component
//* show user avatar and sign out button
const UserButton = ({ user, signOut }: { user: User | null; signOut: () => void }) => {
  if (!user) return null;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <UserAvatar username={user.username} />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={15}>
        <div className="flex items-center gap-x-3 px-2 py-1.5">
          <UserAvatar username={user.username} />

          <div className="flex-col">
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          <LogOut />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const UserAvatar = forwardRef<
  HTMLButtonElement,
  { username: string } & React.ComponentPropsWithRef<"button">
>((props, ref) => (
  <button
    data-testid="user-avatar-button"
    ref={ref}
    {...props}
    className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-blue-500/30 font-semibold capitalize text-blue-500"
  >
    {getInitials(props.username)}
  </button>
));

export default UserButton;
