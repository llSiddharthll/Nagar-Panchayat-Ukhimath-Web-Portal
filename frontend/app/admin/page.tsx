"use client";
import { useState, useEffect } from 'react';
import {
  FaUsers,
  FaBullhorn,
  FaGavel,
  FaNewspaper,
  FaComments,
  FaHeadset,
  FaChartLine,
  FaProjectDiagram,
} from 'react-icons/fa';
import { IconType } from 'react-icons';
import { 
  usersAPI, 
  noticesAPI, 
  tendersAPI, 
  newsEventsAPI, 
  feedbackAPI, 
  helplineQueriesAPI,
  schemesProjectsAPI 
} from '@/utils/api';

interface DashboardStats {
  users: number;
  notices: number;
  tenders: number;
  newsEvents: number;
  feedback: number;
  helplineQueries: number;
  schemesProjects: number;
}

interface StatCard {
  icon: IconType;
  label: string;
  value: number;
  color: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    users: 0,
    notices: 0,
    tenders: 0,
    newsEvents: 0,
    feedback: 0,
    helplineQueries: 0,
    schemesProjects: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async (): Promise<void> => {
    try {
      const [
        usersRes,
        noticesRes,
        tendersRes,
        newsEventsRes,
        feedbackRes,
        helplineQueriesRes,
        schemesProjectsRes,
      ] = await Promise.all([
        usersAPI.getAll(),
        noticesAPI.getAll(),
        tendersAPI.getAll(),
        newsEventsAPI.getAll(),
        feedbackAPI.getAll(),
        helplineQueriesAPI.getAll(),
        schemesProjectsAPI.getAll(),
      ]);

      setStats({
        users: usersRes.data.length,
        notices: noticesRes.data.length,
        tenders: tendersRes.data.length,
        newsEvents: newsEventsRes.data.length,
        feedback: feedbackRes.data.length,
        helplineQueries: helplineQueriesRes.data.length,
        schemesProjects: schemesProjectsRes.data.length,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards: StatCard[] = [
    { icon: FaUsers, label: 'Total Users', value: stats.users, color: 'blue' },
    { icon: FaBullhorn, label: 'Notices', value: stats.notices, color: 'green' },
    { icon: FaGavel, label: 'Tenders', value: stats.tenders, color: 'orange' },
    { icon: FaNewspaper, label: 'News & Events', value: stats.newsEvents, color: 'purple' },
    { icon: FaProjectDiagram, label: 'Schemes & Projects', value: stats.schemesProjects, color: 'indigo' },
    { icon: FaComments, label: 'Feedback', value: stats.feedback, color: 'pink' },
    { icon: FaHeadset, label: 'Helpline Queries', value: stats.helplineQueries, color: 'red' },
  ];

  const getColorClasses = (color: string): string => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      orange: 'bg-orange-500',
      purple: 'bg-purple-500',
      indigo: 'bg-indigo-500',
      pink: 'bg-pink-500',
      red: 'bg-red-500',
    };
    return colors[color] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Overview of Nagar Panchayat Ukhimath Administration
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
            <FaChartLine className="text-blue-600" />
            <span className="text-blue-800 font-medium">Real-time Data</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${getColorClasses(stat.color)}`}>
                  <Icon className="text-white text-xl" />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getColorClasses(stat.color)}`}
                    style={{ width: `${Math.min((stat.value / 100) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaUsers className="text-blue-600 text-sm" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">New user registered</p>
                  <p className="text-xs text-gray-600">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors duration-200">
              <FaBullhorn className="text-blue-600 text-xl mb-2" />
              <p className="text-sm font-medium text-blue-800">Create Notice</p>
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors duration-200">
              <FaNewspaper className="text-green-600 text-xl mb-2" />
              <p className="text-sm font-medium text-green-800">Add News</p>
            </button>
            <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 transition-colors duration-200">
              <FaGavel className="text-orange-600 text-xl mb-2" />
              <p className="text-sm font-medium text-orange-800">New Tender</p>
            </button>
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors duration-200">
              <FaProjectDiagram className="text-purple-600 text-xl mb-2" />
              <p className="text-sm font-medium text-purple-800">Add Scheme</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}