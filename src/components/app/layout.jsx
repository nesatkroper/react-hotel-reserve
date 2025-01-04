import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import NotificationPopover from "./notification-popover";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { BellRing, Search } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import { useState } from "react";

export default function Layout({ children }) {
  const [date, setDate] = useState(
    new Date().toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "medium",
    })
  );

  setInterval(() => {
    setDate(
      new Date().toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "medium",
      })
    );
  }, 1000);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 justify-between ">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Label>{date}</Label>
          </div>
          <div className="me-4 flex gap-3">
            <form className="ml-auto flex-1 sm:flex-initial flex gap-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
              <Button type="submit" variant="outline" className="p-2">
                <Search />
              </Button>
            </form>
            <ModeToggle />
            <Popover className="me-2 rounded-lg">
              <PopoverTrigger>
                <Button variant="icon" className="p-2">
                  <BellRing size={28} />
                </Button>
              </PopoverTrigger>
              <NotificationPopover />
            </Popover>
          </div>
        </header>
        <Separator />
        {/* // ! THIS  IS SLOT FOR CHILDREN */}
        <div className="flex flex-1 flex-col gap-4 p-3">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
