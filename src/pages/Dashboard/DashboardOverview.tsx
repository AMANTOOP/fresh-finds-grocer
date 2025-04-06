
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { ShoppingBag, AlertTriangle, Activity, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from '@/contexts/LanguageContext';

const DashboardOverview = () => {
  const { user } = useAuth();
  const { translate } = useLanguage();
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', user?.storeId],
    queryFn: () => getProducts(user?.storeId),
    enabled: !!user?.storeId
  });
  
  const lowStockCount = products.filter(product => product.quantity < 20).length;
  const totalRevenue = products.reduce((sum, product) => sum + (product.price * product.quantity * 0.2), 0);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {translate('dashboard.welcome')}, {user?.name}
        </h1>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {translate('dashboard.totalProducts')}
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 since last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {translate('dashboard.lowStock')}
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockCount}</div>
            <p className="text-xs text-muted-foreground">
              {lowStockCount > 0 ? 'Needs attention' : 'All stock levels are good'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {translate('dashboard.revenue')}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Activity
            </CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
            <Progress value={82} className="h-2" />
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activity */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{translate('dashboard.recentActivity')}</CardTitle>
          <CardDescription>Recent inventory changes and sales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  New stock added
                </p>
                <p className="text-sm text-muted-foreground">
                  50kg of Rice added to inventory
                </p>
                <p className="text-xs text-muted-foreground">
                  2 hours ago
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-yellow-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Low stock alert
                </p>
                <p className="text-sm text-muted-foreground">
                  Milk is running low (5 liters remaining)
                </p>
                <p className="text-xs text-muted-foreground">
                  5 hours ago
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-green-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Sale completed
                </p>
                <p className="text-sm text-muted-foreground">
                  10kg of Tomatoes sold
                </p>
                <p className="text-xs text-muted-foreground">
                  Yesterday at 3:12 PM
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
