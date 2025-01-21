import {
  BookOpen,
  Bot,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  ClipboardPen,
  BedDouble,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Suon Phanun",
    email: "phanunsuon@gmail.com",
    avatar:
      "https://scontent.fpnh10-1.fna.fbcdn.net/v/t39.30808-6/469352317_1283607016000100_1286030378446066601_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_aid=0&_nc_eui2=AeG79Rk1zvUWghTCrIv12dogzDtT2mYYYOfMO1PaZhhg55m2Jw2hyLLaQl2d54ScWrnwyYcYK1ZJTNwaDUc489nj&_nc_ohc=MjkikLn8jJEQ7kNvgF5FGim&_nc_zt=23&_nc_ht=scontent.fpnh10-1.fna&_nc_gid=ARjDN7e99KRauDSBwxKBQAP&oh=00_AYCY4rRIR_QocASnwlA9XZYsT9ADiY_DzCvGq91CWY-Qfg&oe=677ECBA7",
  },
  teams: [
    {
      name: "Hotel Reservation",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Room",
      url: "#",
      icon: BedDouble,
      isActive: true,
      items: [
        {
          title: "All Rooms",
          url: "room",
        },
        {
          title: "Room Picture",
          url: "rpicture",
        },
      ],
    },
    {
      title: "Product",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "All Product",
          url: "product",
        },
        {
          title: "Product Category",
          url: "pcategory",
        },
      ],
    },
    {
      title: "Category",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Customer",
          url: "/customer",
        },
        {
          title: "Supplier",
          url: "/supplier",
        },
        {
          title: "Customer",
          url: "/customer",
        },
      ],
    },
    {
      title: "Human Resource",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Employee",
          url: "/employee",
        },
        {
          title: "Department",
          url: "/department",
        },
        {
          title: "Position",
          url: "/position",
        },
        {
          title: "Authentication",
          url: "/authentication",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Home",
      url: "/",
      icon: Frame,
    },
    {
      name: "POS",
      url: "/pos",
      icon: ClipboardPen,
    },
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: PieChart,
    },
    {
      name: "Reservation",
      url: "/reservation",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
