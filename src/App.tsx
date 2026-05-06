import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, Menu, X, ArrowUpRight, Phone, Mail, Droplets, Gem, ArrowRight, Instagram, Share2 } from 'lucide-react';

const easeLux = [0.22, 1, 0.36, 1];

// --- Data ---
const PRODUCTS = [
  // Perfumes
  {
    id: 1,
    name: 'العطر الاسود',
    category: 'perfumes',
    price: 850,
    image: 'https://images.unsplash.com/photo-1615160461685-6101ec251c6b?q=80&w=800&auto=format&fit=crop',
    description: 'عطر رجالي فخم بتركيبة العود الأسود والأخشاب المدخنة.',
  },
  {
    id: 2,
    name: 'العطر الابيض',
    category: 'perfumes',
    price: 850,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
    description: 'عطر رجالي منعش يجمع بين الحمضيات والمسك الأبيض.',
  },
  {
    id: 3,
    name: 'العطر الازرق',
    category: 'perfumes',
    price: 850,
    image: 'https://images.unsplash.com/photo-1563170351-b0f1af15cb30?q=80&w=800&auto=format&fit=crop',
    description: 'عطر رجالي حيوي مستوحى من أمواج البحر ونسيم المحيط.',
  },
  {
    id: 4,
    name: 'العطر البنفسجي',
    category: 'perfumes',
    price: 850,
    image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop',
    description: 'عطر لكلا الجنسين بتركيبة غامضة من زهرة الأوركيد والعنبر.',
  },
  {
    id: 5,
    name: 'العطر الاحمر',
    category: 'perfumes',
    price: 850,
    image: 'https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?q=80&w=800&auto=format&fit=crop',
    description: 'عطر نسائي جذاب ينبض بنفحات الورد الجوري والتوابل الدافئة.',
  },
  {
    id: 6,
    name: 'العطر الوردي',
    category: 'perfumes',
    price: 850,
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=800&auto=format&fit=crop',
    description: 'عطر نسائي رقيق يفيض بالأنوثة بفضل زهور الفاوانيا والفانيليا.',
  },
  // Accessories
  {
    id: 7,
    name: 'ميدالية حنظلة',
    category: 'accessories',
    price: 200,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
    description: 'سوار ذهبي عيار 18 مرصع بحجر الزمرد.',
  },
  {
    id: 8,
    name: 'ميدالية خريطة فلسطين',
    category: 'accessories',
    price: 150,
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop',
    description: 'تصميم أنيق وبسيط يعكس الفخامة الهادئة.',
  },
  {
    id: 9,
    name: 'قلادة فلسطين لون فضي',
    category: 'accessories',
    price: 250,
    image: 'https://images.unsplash.com/photo-1599643477873-cece7293a9ce?q=80&w=800&auto=format&fit=crop',
    description: 'قلادة فضية لامعة بتصميم نصف قمر.',
  },
];

// --- Components ---

function NavBar({ currentTab, navigateTo }: { currentTab: string; navigateTo: (tab: string, id?: number) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'products', label: 'المنتجات' },
    { id: 'contact', label: 'اتصل بنا' },
  ];

  const isActive = (id: string) => currentTab === id || (currentTab === 'product-detail' && id === 'products');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ivory/70 backdrop-blur-2xl border-b border-emerald/5 shadow-[0_4px_30px_rgb(0,0,0,0.04)]">
      <div className="container mx-auto px-8 md:px-10 max-w-7xl">
        <div className="flex items-center justify-between h-24 md:h-28">
          {/* Logo */}
          <button 
            onClick={() => navigateTo('home')}
            className="text-3xl md:text-4xl font-serif font-bold tracking-widest text-emerald uppercase"
          >
            WELPCO
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12 text-sm font-medium tracking-wide uppercase">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`transition-opacity duration-300 hover:opacity-60 ${
                  isActive(item.id) ? 'border-b border-emerald pb-1 text-emerald' : 'text-emerald/80'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex gap-4 items-center">
              <button onClick={() => navigateTo('products')} className="w-8 h-8 rounded-full border border-emerald flex justify-center items-center hover:bg-emerald hover:text-ivory transition-colors">
                <Search className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full border border-emerald flex justify-center items-center hover:bg-emerald hover:text-ivory transition-colors">
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile Actions & Toggle */}
          <div className="md:hidden flex items-center gap-4 text-emerald">
            <button 
              onClick={() => {
                navigateTo('products');
                setIsOpen(false);
              }}
              className="p-1 hover:opacity-70 transition-opacity"
            >
              <Search className="w-6 h-6" />
            </button>
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-ivory/80 backdrop-blur-2xl overflow-hidden border-t border-emerald/5"
          >
            <div className="flex flex-col items-center gap-8 py-10 font-serif font-light tracking-wide text-2xl">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    navigateTo(item.id);
                    setIsOpen(false);
                  }}
                  className={`transition-opacity ${
                    isActive(item.id) ? 'text-emerald font-bold' : 'text-emerald/60'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function HomeView({ navigateTo }: { key?: string, navigateTo: (tab: string, id?: number) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col pt-32 pb-24"
    >
      <div className="container mx-auto px-8 md:px-10 max-w-7xl flex-1 flex flex-col justify-center">
        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mt-10">
          
          {/* Hero Text */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: easeLux }}
            className="w-full lg:w-1/2 space-y-6 md:space-y-8"
          >
            <div className="space-y-3 md:space-y-4">
              <span className="text-sm md:text-base uppercase tracking-[0.3em] font-bold text-emerald font-sans dir-ltr inline-block">
                WELPCO.
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif leading-[1.2] font-light italic">
                أضف المزيد من الفخامة<br/>
                <span className="not-italic font-bold text-emerald border-b-2 border-emerald/30 pb-2">لحياتك</span>
              </h1>
            </div>
            
            <div className="flex items-center gap-6 md:gap-8 pt-2 md:pt-4">
              <button 
                onClick={() => navigateTo('products')}
                className="bg-emerald text-ivory px-7 md:px-10 py-3 md:py-5 rounded-full text-[10px] md:text-sm font-bold tracking-widest hover:bg-opacity-90 shadow-lg transition-all"
              >
                تسوق الآن
              </button>
              <div className="flex flex-col">
                <span className="text-lg md:text-2xl font-serif font-bold tracking-tighter italic">اكتشف</span>
                <span className="text-[8px] md:text-[10px] uppercase tracking-widest opacity-50">مجموعاتنا الحصرية</span>
              </div>
            </div>
          </motion.div>

          {/* Product Showcase Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: easeLux, delay: 0.2 }}
            className="w-full lg:w-1/2 relative min-h-[350px] md:min-h-[500px] lg:min-h-[600px] flex justify-center items-center mt-8 md:mt-0"
          >
            {/* Abstract Emerald Shape */}
            <div className="absolute w-[70%] sm:w-[60%] md:w-[450px] aspect-[4/5] bg-emerald rounded-[120px] md:rounded-[160px] opacity-[0.03] -rotate-12 translate-x-4 md:translate-x-12"></div>
            
            {/* Main Visual Placeholder */}
            <div className="relative z-10 w-[55%] sm:w-[45%] md:w-[380px] aspect-[3/4] bg-gradient-to-tr from-emerald to-emerald-light rounded-[80px] md:rounded-[140px] flex flex-col items-center justify-center p-1.5 md:p-2 text-center text-ivory shadow-2xl overflow-hidden">
               <div className="w-full h-full rounded-[76px] md:rounded-[136px] overflow-hidden relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1595425970377-c9703c48657a?q=80&w=800&auto=format&fit=crop" 
                    alt="" 
                    className="w-full h-full object-cover mix-blend-overlay opacity-80 transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 pointer-events-none">
                    <h2 className="text-3xl tracking-[0.2em] mb-8 uppercase text-center leading-relaxed font-serif">WELPCO</h2>
                    <div className="w-16 h-[1px] bg-ivory bg-opacity-50 mb-8"></div>
                    <div className="text-sm opacity-90 tracking-wider font-sans">طريقك لعالم الفخامة</div>
                  </div>
               </div>
            </div>

            {/* Side Accents */}
            <div className="absolute -left-4 bottom-1/4 w-24 h-24 bg-emerald bg-opacity-10 rounded-full blur-xl animate-pulse"></div>
          </motion.div>
        </div>

        {/* Feature Highlights - Bottom Bar Style */}
        <div className="mt-20 pt-8 border-t border-emerald border-opacity-10 flex flex-col md:flex-row justify-between items-center gap-12 pb-12">
          <div className="flex gap-16 w-full md:w-auto justify-center">
            <div className="group cursor-pointer text-center" onClick={() => navigateTo('products')}>
              <Droplets className="w-6 h-6 mx-auto mb-4 opacity-40 group-hover:opacity-100 transition-opacity" />
              <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">الفئة الأولى</p>
              <p className="text-lg font-serif italic text-emerald">العطور الفاخرة</p>
            </div>
            <div className="group cursor-pointer text-center" onClick={() => navigateTo('products')}>
              <Gem className="w-6 h-6 mx-auto mb-4 opacity-40 group-hover:opacity-100 transition-opacity" />
              <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">الفئة الثانية</p>
              <p className="text-lg font-serif italic text-emerald">الإكسسوارات الرائعة</p>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <button 
              onClick={() => navigateTo('contact')}
              className="text-sm flex items-center gap-3 border border-emerald border-opacity-30 px-6 py-3 rounded-full hover:bg-emerald hover:text-ivory transition-all duration-300 group"
            >
              <span>صفحة التواصل معنا</span>
              <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100" />
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

function ProductsView({ navigateTo }: { key?: string, navigateTo: (tab: string, id?: number) => void }) {
  const [filter, setFilter] = useState<'all' | 'perfumes' | 'accessories'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesFilter = filter === 'all' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-32 md:pt-40 pb-32 min-h-screen"
    >
      <div className="container mx-auto px-8 md:px-10 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8 border-b border-emerald border-opacity-10 pb-8">
          <div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif italic mb-3 opacity-90">مجموعاتنا</h2>
            <p className="text-base md:text-lg opacity-60 tracking-widest">اختر ما يعبر عن ذوقك الرفيع.</p>
          </div>
          
          <div className="flex flex-col items-end gap-6 w-full md:w-auto">
            <div className="flex items-center border-b border-emerald border-opacity-30 pb-2 w-full md:w-auto">
              <Search className="w-4 h-4 text-emerald opacity-50 ml-3" />
              <input 
                type="text" 
                placeholder="ابحث عن منتج..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-emerald placeholder-emerald placeholder-opacity-50 flex-1 md:w-48 focus:md:w-64 transition-all duration-300"
              />
            </div>
            
            <div className="flex gap-6 md:gap-8 overflow-x-auto w-full md:w-auto text-sm font-medium tracking-wide uppercase bg-ivory/40 backdrop-blur-md border border-emerald/10 px-6 py-2.5 rounded-full shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
              {[
                { id: 'all', label: 'الكل' },
                { id: 'perfumes', label: 'العطور' },
                { id: 'accessories', label: 'الإكسسوارات' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id as any)}
                  className={`pb-1 transition-opacity whitespace-nowrap ${
                    filter === f.id ? 'border-b border-emerald text-emerald opacity-100' : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 md:gap-y-20"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: easeLux }}
                  key={product.id}
                  onClick={() => navigateTo('product-detail', product.id)}
                  className="group cursor-pointer flex flex-col w-[90%] md:w-full mx-auto"
                >
                  <div className="relative aspect-[4/5] rounded-[80px] md:rounded-[100px] overflow-hidden bg-ivory-dark/60 backdrop-blur-md border border-emerald/5 mb-6 md:mb-8 flex-shrink-0 flex items-center justify-center p-2 md:p-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="w-full h-full rounded-[72px] md:rounded-[92px] overflow-hidden relative">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-emerald mix-blend-multiply opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col px-4 text-center">
                    <span className="text-[9px] md:text-[10px] uppercase tracking-widest opacity-50 mb-2 md:mb-3 block">
                      {product.category === 'perfumes' ? 'عطر' : 'إكسسوار'}
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif italic font-bold mb-3 md:mb-4">{product.name}</h3>
                    <p className="text-xs md:text-sm opacity-70 mb-6 leading-relaxed flex-1">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between border-t border-emerald border-opacity-10 pt-5 md:pt-6 mt-auto">
                      <span className="text-lg font-serif font-bold italic dir-ltr">
                        {product.price} ₺
                      </span>
                      <button className="text-xs font-bold uppercase tracking-widest hover:opacity-60 transition-opacity border-b border-emerald pb-0.5">
                        إضافة للسلة
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <div className="w-16 h-16 bg-emerald bg-opacity-5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-6 h-6 text-emerald opacity-50" />
                </div>
                <h3 className="text-2xl font-serif italic font-bold mb-2">لم يتم العثور على منتجات</h3>
                <p className="opacity-60">جرب البحث بكلمات مختلفة أو تصفح المجموعات الأخرى.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProductDetailView({ productId, navigateTo }: { key?: string, productId: number, navigateTo: (tab: string, id?: number) => void }) {
  const product = PRODUCTS.find(p => p.id === productId);
  
  const handleShare = async () => {
    const url = window.location.origin + window.location.pathname + '?product=' + productId;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: product?.description,
          url: url,
        });
      } catch (err) {
        console.error('Error sharing', err);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('تم نسخ رابط المنتج!');
    }
  };

  if (!product) {
    return (
      <div className="pt-40 pb-32 min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-serif text-emerald">المنتج غير موجود</h2>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: easeLux }}
      className="pt-32 md:pt-40 pb-32 min-h-screen"
    >
      <div className="container mx-auto px-8 md:px-10 max-w-7xl">
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <button 
            onClick={() => navigateTo('products')} 
            className="flex items-center gap-3 text-emerald opacity-60 hover:opacity-100 transition-opacity font-bold uppercase tracking-widest text-sm"
          >
            <ArrowRight className="w-5 h-5" />
            العودة للمنتجات
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 bg-emerald text-ivory hover:bg-opacity-90 transition-all font-bold uppercase tracking-widest text-sm px-6 py-3 rounded-full shadow-lg shrink-0"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">مشاركة المنتج</span>
            <span className="sm:hidden">مشاركة</span>
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: easeLux }}
            className="w-[85%] sm:w-[70%] md:w-1/2 relative aspect-[4/5] rounded-[90px] md:rounded-[120px] overflow-hidden bg-ivory-dark/60 backdrop-blur-xl border border-emerald/5 flex items-center justify-center p-3 md:p-4 shadow-[0_20px_50px_rgb(0,0,0,0.08)] mx-auto"
          >
            <div className="w-full h-full rounded-[82px] md:rounded-[110px] overflow-hidden relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-emerald mix-blend-multiply opacity-5"></div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easeLux }}
            className="w-full md:w-1/2 flex flex-col items-start gap-6 md:gap-8"
          >
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-50">
              {product.category === 'perfumes' ? 'عطر فاخر' : 'إكسسوار راقي'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif italic font-bold text-emerald leading-tight">{product.name}</h1>
            <p className="text-base md:text-xl opacity-70 leading-relaxed max-w-lg">
              {product.description}
            </p>
            <div className="w-16 h-[1px] bg-emerald opacity-20 my-2"></div>
            <div className="flex flex-wrap items-center gap-6 w-full pt-4">
              <div className="flex flex-col shrink-0 min-w-[120px]">
                <span className="text-sm uppercase tracking-widest opacity-50 mb-1">السعر</span>
                <span className="text-4xl font-serif font-bold italic dir-ltr text-emerald">{product.price} ₺</span>
              </div>
              <button className="flex-1 bg-emerald text-ivory px-8 py-5 rounded-full text-sm font-bold tracking-widest hover:bg-opacity-90 shadow-lg transition-all min-w-[200px]">
                إضافة للسلة
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function ContactView(_props: { key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-32 md:pt-40 pb-32 min-h-[80vh] flex items-center"
    >
      <div className="container mx-auto px-8 md:px-10 max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeLux }}
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-70 mb-4 md:mb-6 block">التواصل</span>
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-serif italic font-bold mb-6 md:mb-8">نحن هنا لخدمتك</h2>
          <div className="w-16 h-[1px] bg-emerald opacity-20 mx-auto mb-8 md:mb-10"></div>
          <p className="text-sm md:text-lg opacity-70 mb-12 md:mb-20 max-w-2xl mx-auto leading-relaxed">
            يسعدنا تواصلك معنا لأي استفسارات أو طلبات خاصة. يرجى اختيار وسيلة التواصل الأنسب لك ومراسلتنا.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          <motion.a 
            href="https://wa.me/306906085378"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: easeLux }}
            className="flex flex-col items-center justify-center p-8 md:p-12 lg:p-16 rounded-[80px] md:rounded-[120px] bg-emerald text-ivory hover:bg-opacity-90 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-ivory rounded-full flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500 relative z-10">
              <Phone className="w-6 h-6 md:w-8 md:h-8 text-emerald" />
            </div>
            <h3 className="text-xl md:text-2xl font-serif italic font-bold mb-3 md:mb-4 relative z-10">واتساب</h3>
            <p className="text-xs md:text-sm opacity-80 relative z-10 text-center">تحدث معنا مباشرة للحصول على رد فوري.</p>
          </motion.a>

          <motion.a 
            href="mailto:welovepalestineservice@gmail.com"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: easeLux }}
            className="flex flex-col items-center justify-center p-8 md:p-12 lg:p-16 rounded-[80px] md:rounded-[120px] bg-emerald text-ivory hover:bg-opacity-90 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-ivory rounded-full flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500 relative z-10">
              <Mail className="w-6 h-6 md:w-8 md:h-8 text-emerald" />
            </div>
            <h3 className="text-xl md:text-2xl font-serif italic font-bold mb-3 md:mb-4 relative z-10">البريد الإلكتروني</h3>
            <p className="text-xs md:text-sm opacity-80 relative z-10 text-center">راسلنا وسنرد عليك في أقرب وقت.</p>
          </motion.a>

          <motion.a 
            href="https://www.instagram.com/welpco._?igsh=N2Z6dzk2OXQ0ejFv"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easeLux }}
            className="flex flex-col items-center justify-center p-8 md:p-12 lg:p-16 rounded-[80px] md:rounded-[120px] bg-emerald text-ivory hover:bg-opacity-90 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-ivory rounded-full flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500 relative z-10">
              <Instagram className="w-8 h-8 text-emerald" />
            </div>
            <h3 className="text-2xl font-serif italic font-bold mb-4 relative z-10">انستغرام</h3>
            <p className="text-sm opacity-80 relative z-10 text-center text-ivory/80 direction-ltr font-sans font-bold">@WELPCO.</p>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-emerald border-opacity-10">
      <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-right">
        <div>
          <h2 className="text-2xl font-serif font-bold tracking-widest text-emerald opacity-50 hover:opacity-100 transition-opacity cursor-pointer">WELPCO</h2>
        </div>
        <div className="text-[10px] uppercase tracking-widest opacity-40">
          &copy; {new Date().getFullYear()} WELPCO. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [currentTab, setCurrentTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('product')) return 'product-detail';
    return 'home';
  });
  const [selectedProductId, setSelectedProductId] = useState<number | null>(() => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');
    return productId ? parseInt(productId, 10) : null;
  });

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const productId = params.get('product');
      if (productId) {
        setCurrentTab('product-detail');
        setSelectedProductId(parseInt(productId, 10));
      } else {
        setCurrentTab('home');
        setSelectedProductId(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (tab: string, id?: number) => {
    setCurrentTab(tab);
    if (id !== undefined) {
      setSelectedProductId(id);
      window.history.pushState({}, '', `?product=${id}`);
    } else {
      setSelectedProductId(null);
      const newUrl = window.location.pathname;
      window.history.pushState({}, '', newUrl);
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-emerald selection:bg-opacity-20 selection:text-emerald">
      <NavBar currentTab={currentTab} navigateTo={navigateTo} />
      
      <main className="flex-grow flex flex-col relative z-0">
        <AnimatePresence mode="wait">
          {currentTab === 'home' && <HomeView key="home" navigateTo={navigateTo} />}
          {currentTab === 'products' && <ProductsView key="products" navigateTo={navigateTo} />}
          {currentTab === 'product-detail' && selectedProductId && <ProductDetailView key="product-detail" productId={selectedProductId} navigateTo={navigateTo} />}
          {currentTab === 'contact' && <ContactView key="contact" />}
        </AnimatePresence>
      </main>

      {/* Exclude footer from home to preserve the clean bottom bar styling in that view */}
      {currentTab !== 'home' && currentTab !== 'product-detail' && <Footer />}
    </div>
  );
}
