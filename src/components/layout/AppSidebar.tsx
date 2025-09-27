import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Heart,
  Home,
  FileText,
  Brain,
  Stethoscope,
  ShieldCheck,
  FolderOpen,
  Lightbulb,
  Pill,
  Apple,
  Droplets,
  Zap,
  HelpCircle,
  Settings
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Medical History", url: "/medical-history", icon: FileText },
  { title: "Health Quiz", url: "/health-quiz", icon: HelpCircle },
  { title: "AI Insights", url: "/ai-insights", icon: Brain },
  { title: "Find Doctors", url: "/doctors", icon: Stethoscope },
  { title: "Authorization", url: "/authorization", icon: ShieldCheck },
  { title: "Documents", url: "/documents", icon: FolderOpen },
  { title: "Health Awareness", url: "/awareness", icon: Lightbulb },
  { title: "Medication", url: "/medication", icon: Pill },
  { title: "Diet Tracker", url: "/diet", icon: Apple },
  { title: "Wellness Reminders", url: "/wellness", icon: Droplets },
  { title: "Health Classifier", url: "/classifier", icon: Zap },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-semibold text-lg gradient-text">MedCare</h1>
              <p className="text-xs text-muted-foreground">Pro Health</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Health Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-soft"
                            : "hover:bg-accent hover:text-accent-foreground"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Preferences</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                  >
                    <Settings className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span className="font-medium">Settings</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}