import { PopoverContent } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

const NotificationPopover = () => {
  return (
    <>
      <PopoverContent className="p-2">
        <Label className="">Notification and Alert.</Label>
        <Separator />
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-full" />
            <div>
              <p className="font-semibold">John Doe</p>
              <p className="text-muted-foreground">Just now</p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </>
  );
};

export default NotificationPopover;
