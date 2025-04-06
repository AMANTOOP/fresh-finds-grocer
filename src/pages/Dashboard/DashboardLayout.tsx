
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar, SidebarProvider, SidebarTrigger, SidebarContent, 
  SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LayoutDashboard, ShoppingBag, BarChart3, Settings, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const DashboardLayout = () => {
  const { user, isAuthenticated } = useAuth();
  const { translate } = useLanguage();
  
  // Redirect if not authenticated or not an admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" />;
  }
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <div className="px-3 py-2">
              <h2 className="text-lg font-semibold mb-4 px-4 text-sidebar-primary">Store Admin</h2>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/dashboard" className="flex items-center">
                      <LayoutDashboard className="mr-3 h-5 w-5" />
                      <span>Dashboard</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/dashboard/inventory" className="flex items-center">
                      <ShoppingBag className="mr-3 h-5 w-5" />
                      <span>{translate('nav.inventory')}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/dashboard/analytics" className="flex items-center">
                      <BarChart3 className="mr-3 h-5 w-5" />
                      <span>Analytics</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/dashboard/customers" className="flex items-center">
                      <Users className="mr-3 h-5 w-5" />
                      <span>Customers</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/dashboard/settings" className="flex items-center">
                      <Settings className="mr-3 h-5 w-5" />
                      <span>Settings</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>
          </SidebarContent>
        </Sidebar>
        
        <div className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 md:p-8">
            <SidebarTrigger className="mb-4" />
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
