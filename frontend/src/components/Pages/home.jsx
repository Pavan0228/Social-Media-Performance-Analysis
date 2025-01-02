import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Home = () => {
  // Temporary default data for the graph
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'User Engagement',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.3)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
      },
    },
  };

  // Updated buttons data with modern color schemes
  const buttons = [
    { 
      name: 'Analyzer', 
      link: '/analyzer', 
      bgColor: 'bg-gradient-to-r from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      span: 'col-span-2' 
    },
    { 
      name: 'Insights', 
      link: '/insights', 
      bgColor: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      hoverColor: 'hover:from-emerald-600 hover:to-emerald-700',
      span: 'col-span-1' 
    },
    { 
      name: 'Settings', 
      link: '/settings', 
      bgColor: 'bg-gradient-to-r from-amber-500 to-amber-600',
      hoverColor: 'hover:from-amber-600 hover:to-amber-700',
      span: 'col-span-1' 
    },
    { 
      name: 'Reports', 
      link: '/reports', 
      bgColor: 'bg-gradient-to-r from-rose-500 to-rose-600',
      hoverColor: 'hover:from-rose-600 hover:to-rose-700',
      span: 'col-span-2' 
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-8">
      <div className="bg-slate-800/30 p-12 rounded-3xl shadow-2xl backdrop-blur-sm border border-slate-700/50 w-full max-w-4xl min-h-[80vh]">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 text-center mb-12 animate-fade-in">
          Social Media Analyzer
        </h1>

        {/* Updated button grid layout with new colors and subtle animations */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {buttons.map((button) => (
            <Link
              key={button.name}
              to={button.link}
              className={`
                ${button.span} 
                ${button.bgColor} 
                ${button.hoverColor}
                block py-4 px-6 
                text-white font-medium text-center 
                rounded-xl shadow-lg
                transition-all duration-200 ease-in-out
                hover:shadow-xl hover:scale-[1.02] 
                active:scale-[0.98]
                focus:outline-none focus:ring-2 focus:ring-opacity-50
              `}
            >
              {button.name}
            </Link>
          ))}
        </div>

        <div className="mt-8 transform transition-all duration-300 hover:scale-[1.01]">
          <h2 className="text-lg font-medium text-blue-100 text-center mb-4">User Engagement Graph</h2>
          <div className="bg-slate-700/40 rounded-lg p-4 border border-slate-600/50 shadow-lg">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-medium text-blue-100 text-center">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
              Refresh Data
            </button>
            <button className="py-2 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium rounded-lg shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
              Export Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
