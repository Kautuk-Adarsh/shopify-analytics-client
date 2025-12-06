'use client';

import { useEffect, useState, useCallback } from 'react'; 
import { useRouter } from 'next/navigation'; 
import { fetchDashboardStats, fetchSalesChart, fetchTopCustomers } from '../api';
import StatsGrid from '../components/StatsGrid';
import SalesChart from '../components/SalesChart';
import TopCustomers from '../components/TopCustomers';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); 

  const handleLogout = useCallback(() => {
    sessionStorage.clear(); 
    router.push('/login');
  }, [router]);

  useEffect(() => {
    let inactivityTimer;
    
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(handleLogout, 900000); 
    };
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);
    resetTimer();
    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, [handleLogout]);

  useEffect(() => {
    const user = sessionStorage.getItem('xeno_user');
    const shopId = sessionStorage.getItem('xeno_shop_id');

    if (!user || !shopId) {
      router.push('/login'); 
      return;
    }

    let isMounted = true; 

    const loadData = async () => {
      try {
        const [statsData, chartRes, customersRes] = await Promise.all([
          fetchDashboardStats(),
          fetchSalesChart(),
          fetchTopCustomers()
        ]);

        if (isMounted) {
          setStats(statsData);
          setChartData(chartRes);
          setTopCustomers(customersRes);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        if (error.response && (error.response.status === 401 || error.response.status === 400)) {
           if (isMounted) handleLogout();
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadData();
    const intervalId = setInterval(loadData, 5000); 

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [router, handleLogout]); 

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Verifying Session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Xeno Intern Dashboard</h1>
            <p className="text-gray-500 mt-2">Real-time insights from your Shopify Store</p>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Secure Session Active
             </div>
             
             <button 
               onClick={handleLogout}
               className="text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-red-300"
             >
               Sign Out
             </button>
          </div>
        </header>

        <StatsGrid stats={stats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96">
            <h2 className="text-lg font-semibold mb-6 text-gray-800">Sales Over Time</h2>
            <div className="h-72">
               <SalesChart data={chartData} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96 flex flex-col">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Top Customers</h2>
            <div className="flex-1 overflow-auto pr-2">
              <TopCustomers customers={topCustomers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}