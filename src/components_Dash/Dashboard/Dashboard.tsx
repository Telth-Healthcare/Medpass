import React, { useState, useEffect } from 'react';
import { Users, Building2, GraduationCap, TrendingUp } from 'lucide-react';

interface DashboardStats {
  totalStudents: number;
  totalAgencies: number;
  activeUsers: number;
  monthlyRevenue: number;
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  color: string;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        {trend && (
          <p className="text-sm text-green-600 mt-1 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            {trend}
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setTimeout(() => {
        setStats({
          totalStudents: 1247,
          totalAgencies: 45,
          activeUsers: 892,
          monthlyRevenue: 125000
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-200 hover:transform hover:scale-105">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats?.totalStudents.toLocaleString() || '0'}
          icon={GraduationCap}
          color="bg-blue-600"
          trend="+12% this month"
        />
        <StatCard
          title="Partner Agencies"
          value={stats?.totalAgencies.toString() || '0'}
          icon={Building2}
          color="bg-green-600"
          trend="+3 new this month"
        />
        <StatCard
          title="Active Users"
          value={stats?.activeUsers.toLocaleString() || '0'}
          icon={Users}
          color="bg-purple-600"
          trend="+8% this week"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${(stats?.monthlyRevenue || 0).toLocaleString()}`}
          icon={TrendingUp}
          color="bg-orange-600"
          trend="+15% this month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {[
              { action: 'New student registration', time: '2 minutes ago', type: 'student' },
              { action: 'Agency partnership approved', time: '1 hour ago', type: 'agency' },
              { action: 'Fee payment received', time: '3 hours ago', type: 'payment' },
              { action: 'User profile updated', time: '5 hours ago', type: 'user' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  activity.type === 'student' ? 'bg-blue-100 text-blue-800' :
                  activity.type === 'agency' ? 'bg-green-100 text-green-800' :
                  activity.type === 'payment' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {activity.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <GraduationCap className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">Add Student</span>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <Building2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">Add Agency</span>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">Manage Users</span>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">View Reports</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;