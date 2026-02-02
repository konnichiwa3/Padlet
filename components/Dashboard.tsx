import React, { useRef } from 'react';
import { Place, Category, ThaiDessert } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { 
  Users, MapPin, Star, BookOpen, TrendingUp, ChevronLeft, ChevronRight,
  Building2, School, Lightbulb, Brain, Briefcase, Camera, MoreHorizontal, LayoutGrid, Utensils,
  Cat,
  Share2,
  Landmark,
  Boxes,
  Share,
  HomeIcon,
  Warehouse,
  GraduationCap,
  BookOpenText,
  Tent,
  Store,
  HandPlatter,
  Heater,
  TreePine,
  Fence,
  Atom
} from 'lucide-react';

interface DashboardProps {
  places: Place[];
  desserts: ThaiDessert[];
  onSelectPlace: (place: Place) => void;
  onSelectDessert: (DISTRICT: ThaiDessert) => void;
}

// Formal Government Colors - Expanded Palette
const COLORS = [
    '#6b1e8a', // Blue-900
    '#d97706', // Amber-600
    '#0f766e', // Teal-700
    '#b91c1c', // Red-700
    '#4338ca', // Indigo-700
    '#65a30d', // Lime-600
    '#7c3aed', // Violet-600
    '#64748b'  // Slate-500
];

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; colorClass: string }> = ({ title, value, icon, colorClass }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-l-blue-900 flex items-center space-x-4">
    <div className={`p-3 rounded-md ${colorClass} text-white`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
    </div>
  </div>
);

// Helper to map category to icon
const getCategoryIcon = (category: string) => {
  switch (category) {
    case Category.LIBRARY: return <BookOpen size={16} />;

    case Category.PROVINCE: return <Building2 size={16} />;
    case Category.DISTRICT: return <Utensils size={16} />;
    case Category.SUB_DISTRICT: return <Building2 size={16} />;
    case Category.DISTRICT_LC: return <Building2 size={16} />;
    case Category.COMMUNITY_LC: return <School size={16} />;

    case Category.CO_LEARNING: return <Lightbulb size={16} />;
    case Category.WISDOM: return <Brain size={16} />;
    case Category.OCCUPATION: return <Briefcase size={16} />;
    case Category.TOURISM: return <Camera size={16} />;
    case Category.OTHER: return <LayoutGrid size={16} />;
    default: return <MoreHorizontal size={16} />;
  }
};

const Dashboard: React.FC<DashboardProps> = ({ places, desserts, onSelectPlace, onSelectDessert }) => {
  // Aggregate data
  const totalVisits = places.reduce((sum, p) => sum + p.visits, 0);
  const totalPlaces = places.length;
  const avgRating = (places.reduce((sum, p) => sum + p.rating, 0) / totalPlaces).toFixed(1);     
  const totalDesserts = desserts.length;

  const totalLIBRARY = places.filter(p => p.category === Category.LIBRARY).length;
  
  const totalPROVINCE = places.filter(p => p.category === Category.PROVINCE).length;
  const totalDISTRICT = places.filter(p => p.category === Category.DISTRICT).length;
  const totalSUB_DESTRICT = places.filter(p => p.category === Category.SUB_DISTRICT).length;
  const totalCOMMUNITY_LC = places.filter(p => p.category === Category.COMMUNITY_LC).length;
  const totalDISTRICT_LC = places.filter(p => p.category === Category.DISTRICT_LC).length;
   
  const totalOCCUPATION = places.filter(p => p.category === Category.OCCUPATION).length;
  const totalTOURISM = places.filter(p => p.category === Category.TOURISM).length;
  const totalOTHER = places.filter(p => p.category === Category.OTHER).length;
  const totalWISDOM = places.filter(p => p.category === Category.WISDOM).length;
  const CO_LEARNING = places.filter(p => p.category === Category.CO_LEARNING).length;


  //  const totalAbout = Object.values(Category).map(cat => ({
  //     name: cat,
  //     value: places.filter(p => p.category === cat).length
  //  })).filter(item => item.value > 0);


  // Dynamic Category Data Calculation
  const categoryData = Object.values(Category).map(cat => ({
      name: cat,
      value: places.filter(p => p.category === cat).length
  })).filter(item => item.value > 0); // Only show categories with data

  const popularPlaces = [...places]
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 5)
    .map(p => ({ name: p.name.substring(0, 15) + '...', visits: p.visits }));

  const featuredPlaces = [...places]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8); // Top 8 items

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dessertScrollRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
        const current = ref.current;
        const scrollAmount = current.clientWidth * 0.8; // Scroll 80% of view
        if (direction === 'left') {
            current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="จำนวนข้อมูลทั้งหมด  (แห่ง)" 
          value={totalCOMMUNITY_LC +totalDISTRICT_LC +totalSUB_DESTRICT +totalDISTRICT +totalPROVINCE +totalLIBRARY }
          icon={<Boxes size={24} />} 
          colorClass="bg-amber-600" 
        />
        {/* <StatCard 
          title="สถานศึกษาและศูนย์การเรียนในสังกัด (แห่ง)" 
          value={totalPROVINCE} 
          icon={<MapPin size={24} />} 
          colorClass="bg-amber-600" 
        /> */}
        <StatCard 
          title="ศูนย์การเรียนรู้ระดับอำเภอ (แห่ง)" 
          value={totalDISTRICT} 
          icon={<Landmark size={24} />} 
          colorClass="bg-rose-600" 
        />
        <StatCard 
          title="ศูนย์การเรียนรู้ระดับตำบล (แห่ง)"   
          value={totalSUB_DESTRICT} 
          icon={<Store size={24} />} 
          colorClass="bg-rose-600" 
        />
        <StatCard 
          title="ศศช. (แห่ง)" 
          value={totalDISTRICT_LC}
        //  value={totalAbout.length} 
          icon={<Tent size={24} />} 
          colorClass="bg-rose-600" 
        />
        <StatCard 
          title="ศรช. (แห่ง)" 
          value={totalCOMMUNITY_LC} 
          icon={<School size={24} />} 
          colorClass="bg-rose-600" 
        />
        <StatCard 
          title="ห้องสมุดประชาชน (แห่ง)" 
          value={totalLIBRARY} 
          icon={<BookOpenText size={24} />} 
          colorClass="bg-rose-700"  
        />
        {/* <StatCard 
          title="ศูนย์ฝึกอาชีพ/ผลิตภัณฑ์ชุมชน (แห่ง)"     
          value={totalOCCUPATION} 
          icon={<Utensils size={24} />} 
          colorClass="bg-rose-700"  
        />
        <StatCard 
          title="แหล่งท่องเที่ยวเชิงนิเวศ/วัฒนธรรม (แห่ง)"   
          value={totalTOURISM} 
          icon={<Utensils size={24} />} 
          colorClass="bg-rose-700"  
          />
        <StatCard 
          title="ภูมิปัญญาท้องถิ่น/ปราชญ์ชาวบ้าน (แห่ง)"     
          value={totalWISDOM} 
          icon={<Utensils size={24} />} 
          colorClass="bg-rose-700"  
        /> */}
         
        {/* <StatCard 
          title="แหล่งเรียนรู้อื่นๆ888" 
          value={totalAbout.length} 
          icon={<Star size={24} />} 
          colorClass="bg-emerald-700" 
        /> */}
        <StatCard 
          title="ผู้เข้าชมสะสม (คน)" 
          value={totalVisits.toLocaleString()} 
          icon={<Users size={24} />} 
          colorClass="bg-blue-800" 
        />
        <StatCard 
          title="ความพึงพอใจเฉลี่ย" 
          value={avgRating} 
          icon={<Star size={24} />} 
          colorClass="bg-emerald-700" 
        />
      </div>

      {/* Featured Places Carousel */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 relative group/carousel">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
                <TrendingUp className="text-blue-900" size={24} />
                <h3 className="text-lg font-bold text-blue-900">ศูนย์รวมข้อมูลเพื่อติดต่อราชการ มิติใหม่ติดต่อราชการ รู้ทุกเรื่องบริการภาครัฐ รู้ใจประชาชน </h3>
            </div>
            <div className="hidden md:flex gap-2">
                 <button 
                    onClick={() => scroll(scrollContainerRef, 'left')}
                    className="p-1.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600"
                    >
                    <ChevronLeft size={20} />
                </button>
                <button 
                    onClick={() => scroll(scrollContainerRef, 'right')}
                    className="p-1.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
        
        {/* Floating Navigation Buttons for larger screens */}
        <button 
            onClick={() => scroll(scrollContainerRef, 'left')}
            className="absolute left-2 top-[60%] -translate-y-1/2 z-10 p-2 bg-white/90 rounded-full shadow-lg text-blue-900 hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100 hidden md:block border border-slate-100"
        >
            <ChevronLeft size={24} />
        </button>
        <button 
            onClick={() => scroll(scrollContainerRef, 'right')}
            className="absolute right-2 top-[60%] -translate-y-1/2 z-10 p-2 bg-white/90 rounded-full shadow-lg text-blue-900 hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100 hidden md:block border border-slate-100"
        >
            <ChevronRight size={24} />
        </button>

        <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            {featuredPlaces.map((place) => (
                <div 
                    key={place.id} 
                    onClick={() => onSelectPlace(place)}
                    className="min-w-[280px] md:min-w-[320px] snap-center flex-shrink-0 group relative rounded-lg overflow-hidden h-56 border border-slate-200 cursor-pointer hover:shadow-lg transition-all"
                >
                    <img 
                        src={place.coverImage} 
                        alt={place.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-transparent to-transparent opacity-90"></div>
                    <div className="absolute bottom-0 left-0 p-4 w-full">
                        <div className="flex justify-between items-end mb-1">
                            <span className="text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded shadow-sm">
                                {place.category}
                            </span>
                            <div className="flex items-center text-amber-300 text-xs bg-black/30 px-1.5 py-0.5 rounded backdrop-blur-sm">
                                <Star size={10} fill="currentColor" className="mr-1"/> {place.rating}
                            </div>
                        </div>
                        <h4 className="text-white text-base font-bold truncate drop-shadow-sm">{place.name}</h4>
                        <p className="text-blue-100 text-xs truncate opacity-80 mt-0.5">{place.province} • {place.visits.toLocaleString()} เข้าชม</p>
                    </div>
                </div>
            ))}
        </div>
      </div>


<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Co-Learning Space (แห่ง)" 
          value={CO_LEARNING} 
          icon={<HandPlatter size={24} />} 
          colorClass="bg-rose-600" 
        />
        <StatCard 
          title="ศูนย์ฝึกอาชีพ/ผลิตภัณฑ์ชุมชน (แห่ง)"     
          value={totalOCCUPATION} 
          icon={<Heater size={24} />} 
          colorClass="bg-rose-700"  
        />
        <StatCard 
          title="แหล่งท่องเที่ยวเชิงนิเวศ/วัฒนธรรม (แห่ง)"   
          value={totalTOURISM} 
          icon={<TreePine size={24} />} 
          colorClass="bg-rose-700"  
          />
        <StatCard 
          title="ภูมิปัญญาท้องถิ่น/ปราชญ์ชาวบ้าน (แห่ง)"     
          value={totalWISDOM} 
          icon={<Fence size={24} />} 
          colorClass="bg-rose-700"  
        />
        <StatCard 
          title="แหล่งเรียนรู้อื่นๆ" 
          value={totalDesserts} 
          icon={<Atom size={24} />} 
          colorClass="bg-emerald-700" 
        />
      </div>  
      
        {/* Featured Desserts Carousel */}
    
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 relative group/desserts">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
                <Utensils className="text-amber-600" size={24} />
                <h3 className="text-lg font-bold text-amber-800">ขนมไทยโบราณที่น่าสนใจ</h3>
            </div>
            <div className="hidden md:flex gap-2">
                 <button 
                    onClick={() => scroll(dessertScrollRef, 'left')}
                    className="p-1.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600"
                >
                    <ChevronLeft size={20} />
                </button>
                <button 
                    onClick={() => scroll(dessertScrollRef, 'right')}
                    className="p-1.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
        
        <button 
            onClick={() => scroll(dessertScrollRef, 'left')}
            className="absolute left-2 top-[60%] -translate-y-1/2 z-10 p-2 bg-white/90 rounded-full shadow-lg text-amber-800 hover:scale-110 transition-all opacity-0 group-hover/desserts:opacity-100 hidden md:block border border-slate-100"
        >
            <ChevronLeft size={24} />
        </button>
        <button 
            onClick={() => scroll(dessertScrollRef, 'right')}
            className="absolute right-2 top-[60%] -translate-y-1/2 z-10 p-2 bg-white/90 rounded-full shadow-lg text-amber-800 hover:scale-110 transition-all opacity-0 group-hover/desserts:opacity-100 hidden md:block border border-slate-100"
        >
            <ChevronRight size={24} />
        </button>

        <div 
            ref={dessertScrollRef}
            className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            {desserts.map((DISTRICT) => (
                <div 
                    key={DISTRICT.id} 
                    onClick={() => onSelectDessert(DISTRICT)}
                    className="min-w-[250px] md:min-w-[280px] snap-center flex-shrink-0 group relative rounded-lg overflow-hidden h-48 border border-slate-200 cursor-pointer hover:shadow-lg transition-all"
                >
                    <img 
                        src={DISTRICT.images.main} 
                        alt={DISTRICT.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-950 via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 p-4 w-full">
                        <div className="flex justify-between items-end mb-1">
                             <span className="text-[10px] bg-white/90 text-amber-800 px-2 py-0.5 rounded shadow-sm font-bold">
                                {DISTRICT.origin}
                            </span>
                        </div>
                        <h4 className="text-white text-base font-bold truncate drop-shadow-sm">{DISTRICT.name}</h4>
                        <p className="text-amber-100 text-xs truncate opacity-90 mt-0.5">{DISTRICT.localName || '-'}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visits Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-blue-900 mb-4">สถิติผู้เข้าชมแยกตามสถานที่</h3>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={popularPlaces} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" fontSize={12} />
                <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12, fill: '#475569'}} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="visits" fill="#1e3a8a" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution with Icons */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-lg font-bold text-blue-900 mb-4">สัดส่วนข้อมูลตามประเภทแหล่งเรียนรู้</h3>
          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                  label={({percent}) => `${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Enhanced Legend with Icons */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                {categoryData.map((entry, index) => (
                    <div key={index} className="flex items-center p-2 rounded-lg bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                        <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white shadow-sm flex-shrink-0"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        >
                             {getCategoryIcon(entry.name)}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                             <span className="text-[10px] text-slate-500 truncate" title={entry.name}>
                                {entry.name.split(' (')[0]} {/* Show short name primarily */}
                             </span>
                             <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                                {entry.value} แห่ง
                             </span>
                        </div>
                    </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
