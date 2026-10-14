// Arabic translations. Natural ecommerce wording; product/brand/category names
// are intentionally NOT translated (backend is the source of truth).
import type { TranslationKey } from "./en";

export const ar: Record<TranslationKey, string> = {
  // Header / nav
  "nav.home": "الرئيسية",
  "nav.categories": "الفئات",
  "nav.contact": "اتصل بنا",
  "nav.menu": "فتح القائمة",
  "nav.close": "إغلاق",
  "nav.search": "بحث",
  "nav.searchPlaceholder": "ابحث عن المنتجات...",
  "nav.searchShort": "بحث...",
  "nav.searching": "جاري البحث...",
  "nav.noResults": "لا توجد منتجات.",
  "nav.theme.toggle": "تبديل المظهر",
  "nav.login": "تسجيل الدخول",
  "nav.account": "الحساب",
  "nav.cart": "السلة",
  "nav.wishlist": "المفضلة",
  "nav.demoCta": "جرّب المتجر",

  // Language switcher
  "lang.switch": "تغيير اللغة",
  "lang.english": "English",
  "lang.arabic": "العربية",

  // Auth dialogs / logout
  "auth.logoutTitle": "هل أنت متأكد أنك تريد تسجيل الخروج؟",
  "auth.logoutDesc":
    "سيؤدي هذا إلى إنهاء جلستك الحالية، وستحتاج إلى تسجيل الدخول مرة أخرى للوصول إلى سلتك ومفضلتك.",
  "auth.logoutConfirm": "تسجيل الخروج",
  "auth.cancel": "إلغاء",
  "auth.deniedTitle": "تسجيل الدخول مطلوب",
  "auth.deniedDesc": "تحتاج إلى تسجيل الدخول للمتابعة. هل تريد تسجيل الدخول الآن؟",
  "auth.login": "تسجيل الدخول",

  // Login page
  "login.welcome": "مرحبًا بعودتك",
  "login.subtitle": "سجّل الدخول إلى حسابك في Trendora",
  "login.username": "اسم المستخدم",
  "login.usernamePlaceholder": "أدخل اسم المستخدم",
  "login.password": "كلمة المرور",
  "login.passwordPlaceholder": "أدخل كلمة المرور",
  "login.forgot": "نسيت؟",
  "login.signIn": "تسجيل الدخول",
  "login.signingIn": "جاري تسجيل الدخول...",
  "login.showPassword": "إظهار كلمة المرور",
  "login.hidePassword": "إخفاء كلمة المرور",
  "login.noAccount": "ليس لديك حساب؟",
  "login.signUp": "إنشاء حساب",
  "login.error.invalid": "اسم المستخدم أو كلمة المرور غير صحيحة",
  "login.validation.username.required": "اسم المستخدم مطلوب",
  "login.validation.password.required": "كلمة المرور مطلوبة",
  "login.validation.password.min": "يجب أن تتكون كلمة المرور من 4 أحرف على الأقل",
  "login.demoHint": "حساب تجريبي",
  "login.demoNotice":
    "هذا متجر تجريبي — يمكنك تصفح المنتجات واستخدام السلة وحفظ المفضلة دون حساب. سجّل الدخول فقط لتجربة تسجيل الدخول التجريبي.",
  "login.demoCreds": "بيانات الدخول التجريبية: demo / demo1234",
  "login.tryDemo": "جرّب المتجر",
  "login.browseNoAccount": "تصفّح فقط؟",

  // Product card / grid
  "product.view": "عرض التفاصيل",
  "product.add": "أضف",
  "product.added": "في السلة",
  "product.outOfStock": "غير متوفر",
  "product.brand": "الماركة",
  "product.off": "خصم {n}%",
  "product.imageAlt": "صورة {title}",

  // Product details
  "details.availability": "التوفر",
  "details.inStock": "متوفر",
  "details.price": "السعر",
  "details.hurry": "أسرع، بقي {n} فقط في المخزون!",
  "details.rating": "التقييم",
  "details.addToCart": "أضف إلى السلة",
  "details.inCart": "المنتج في السلة",
  "details.related": "قد يعجبك أيضًا",
  "details.relatedSub": "اكتشف منتجات مشابهة مختارة خصيصًا لك.",
  "details.reviewsTitle": "آراء العملاء",
  "details.reviewsSub": "تقييمات حقيقية من أشخاص وثقوا بنا.",
  "details.noReviews": "لا توجد تقييمات بعد.",
  "details.loadingReviews": "جاري تحميل التقييمات...",
  "details.showImage": "عرض صورة {title} رقم {n}",
  "details.stockLeft": "{n} متوفر في المخزون",

  // Cart
  "cart.title": "سلتي",
  "cart.subtitle": "لديك {n} عنصر في سلتك",
  "cart.emptyTitle": "سلتك فارغة",
  "cart.emptyDesc":
    "يبدو أنك لم تُضِف أي منتجات إلى سلتك بعد. لنبدأ في العثور على شيء مميز!",
  "cart.continue": "متابعة التسوق",
  "cart.summary": "ملخص الطلب",
  "cart.subtotal": "المجموع الفرعي",
  "cart.shipping": "الشحن",
  "cart.free": "مجاني",
  "cart.total": "الإجمالي",
  "cart.checkout": "إتمام الشراء",
  "cart.checkoutDemo":
    "هذا متجر تجريبي — إتمام الشراء غير مرتبط بأي وسيلة دفع حقيقية.",
  "cart.increase": "زيادة الكمية",
  "cart.decrease": "تقليل الكمية",
  "cart.remove": "إزالة من السلة",
  "cart.clear": "إفراغ السلة",
  "cart.checkoutSoon": "إتمام الشراء عبر الإنترنت غير متوفر في هذه النسخة التجريبية بعد.",

  // Wishlist
  "wishlist.title": "مفضلتي",
  "wishlist.subtitle": "لديك {n} عنصر محفوظ",
  "wishlist.emptyTitle": "قائمة مفضلتك فارغة",
  "wishlist.emptyDesc":
    "يبدو أنك لم تحفظ أي منتجات بعد. لنبدأ في العثور على شيء مميز!",
  "wishlist.remove": "إزالة من المفضلة",
  "wishlist.add": "أضف إلى المفضلة",

  // Categories
  "categories.heading": "الفئات",
  "categories.explore": "استكشف الفئات",
  "categories.viewAll": "عرض كل الفئات",
  "categories.wantMore": "تريد رؤية المزيد؟",
  "categories.count": "{n} فئة",
  "categories.products": "{n} منتج متوفر",

  // Toasts
  "toast.addedToCart": "تمت الإضافة إلى السلة!",
  "toast.addedToCartDesc": "تمت إضافة {title} إلى سلتك.",
  "toast.removedFromCart": "تمت الإزالة من السلة",
  "toast.removedFromCartDesc": "تمت إزالة {title} من سلتك.",
  "toast.restored": "تمت الإعادة إلى السلة",
  "toast.clearCart": "تم إفراغ السلة",
  "toast.clearCartDesc": "تم إفراغ سلتك بنجاح.",
  "toast.addedToWishlist": "تمت الإضافة إلى المفضلة!",
  "toast.addedToWishlistDesc": "تمت إضافة {title} إلى مفضلتك.",
  "toast.removedFromWishlist": "تمت الإزالة من المفضلة",
  "toast.removedFromWishlistDesc": "تمت إزالة {title} من مفضلتك.",
  "toast.clearWishlist": "تم إفراغ المفضلة",
  "toast.clearWishlistDesc": "تم إفراغ قائمة المفضلة بنجاح.",
  "toast.undo": "تراجع",
  "toast.maxStock": "يتوفر {n} فقط في المخزون.",

  // Loading / errors / empty
  "state.loading": "جاري التحميل...",
  "state.errorTitle": "حدث خطأ ما",
  "state.errorDesc": "لم نتمكن من تحميل هذا المحتوى. يُرجى المحاولة مرة أخرى.",
  "state.retry": "أعد المحاولة",
  "state.noProducts": "لا توجد منتجات.",
  "state.noProductsDesc": "جرّب تصفح فئة أخرى أو تحقق لاحقًا.",
  "state.notFound": "المنتج غير موجود",
  "state.loadMore": "تحميل المزيد",
  "state.loadingMore": "جارٍ تحميل المزيد...",
  "state.noMore": "لا مزيد من النتائج",
  "state.loadMoreError": "فشل تحميل المزيد من النتائج",

  // Home / marketing / static content
  "home.heroTitle": "حيث يلتقي الأناق بالابتكار",
  "home.heroSub":
    "استكشف أحدث الوافدين في عالم الأزياء والأجهزة الذكية، المختارة خصيصًا لك",
  "home.spacesTitle": "استكشف مساحات Trendora",
  "home.slideShop": "تسوّق أحدث الصيحات في أي مكان",
  "home.slideShopSub":
    "وجهتك المثالية للأزياء والتقنية على بعد نقرة واحدة. توصيل سريع حتى باب منزلك.",
  "home.exploreNow": "استكشف الآن",
  "home.menCollection": "تسوّق مجموعة الرجال",
  "home.tech": "استكشف التقنية",
  "home.womenCollection": "تسوّق مجموعة النساء",
  "home.redefine": "أعد تعريف إطلالتك",
  "home.smartGear": "أجهزة ذكية لحياتك اليومية",
  "home.empower": "امنحي أسلوبك القوة",
  "marquee.delivery": "توصيل سريع مجاني للطلبات أكثر من 100$",
  "marquee.secure": "دفع آمن 100%",
  "marquee.returns": "إرجاع سهل خلال 14 يومًا",
  "marquee.support": "دعم العملاء على مدار الساعة",
  "featured.best": "الأكثر مبيعًا",
  "featured.bestSub": "ما يشتريه الجميع",
  "featured.bestCount": "المنتجات الأعلى تقييمًا",
  "featured.trending": "الأكثر رواجًا",
  "featured.trendingSub": "أساليب منتشرة وعصرية",
  "featured.trendingCount": "ينفد بسرعة 🔥",
  "featured.hot": "إصدارات حصرية",
  "featured.hotSub": "عروض محدودة حصرية",
  "featured.hotCount": "خصم يصل إلى 40%",
  "featured.new": "وصل حديثًا",
  "featured.newSub": "طازج من مختبر التصميم",
  "featured.newCount": "للتوّ وصل",
  "store.fastShipping": "شحن سريع",
  "store.fastShippingDesc": "توصيل سريع مجاني للطلبات أكثر من 100$",
  "store.securePayment": "دفع آمن",
  "store.securePaymentDesc": "وسائل دفع محمية 100%",
  "store.easyReturns": "إرجاع سهل",
  "store.easyReturnsDesc": "ضمان استرداد المال خلال 14 يومًا",
  "store.support": "دعم على مدار الساعة",
  "store.supportDesc": "فريق محترف مخصص لخدمتك",
  "faq.title": "الأسئلة الشائعة",
  "faq.sub": "كل ما تحتاج معرفته عن الشحن والإرجاع والدفع في Trendora",
  "faq.q1": "كم يستغرق الشحن مع Trendora؟",
  "faq.a1":
    "عادة ما يستغرق الشحن من يومي عمل إلى 5 أيام عمل على مستوى الدولة. بمجرد شحن طلبك، سنرسل لك بريدًا إلكترونيًا ورسالة نصية تحتوي على رابط مباشر لتتبّع شحنتك.",
  "faq.q2": "ما هي سياسة الإرجاع والاستبدال؟",
  "faq.a2":
    "نوفّر سياسة إرجاع مرنة. يمكنك إرجاع أو استبدال أي منتج خلال 14 يومًا من التسليم، بشرط أن يكون المنتج غير مستخدم، وفي حالته الأصلية، وبتغليفه الأصلي.",
  "faq.q3": "هل توفّرون الدفع عند الاستلام؟",
  "faq.a3":
    "نعم، الدفع عند الاستلام متوفر في معظم المدن. كما ندعم وسائل الدفع الإلكتروني الآمنة بما في ذلك بطاقات الائتمان وApple Pay وخطط التقسيط المرنة.",
  "faq.q4": "كيف يمكنني التواصل مع دعم عملاء Trendora؟",
  "faq.a4":
    "فريقنا جاهز لمساعدتك على مدار الساعة! يمكنك التواصل معنا مباشرة عبر واتساب، أو الاتصال بالخط الموحّد، أو إرسال بريد إلكتروني. نرد عادةً في أقل من ساعة.",

  // Footer
  "footer.tagline":
    "وجهتك المثالية لأحدث صيحات الأزياء وأسلوب الحياة. ارتقِ بخزانتك معنا.",
  "footer.subscribe": "اشترك",
  "footer.subscribePlaceholder": "أدخل بريدك الإلكتروني",
  "footer.shop": "تسوّق",
  "footer.support": "الدعم",
  "footer.legal": "قانوني",
  "footer.newArrivals": "وصل حديثًا",
  "footer.bestSellers": "الأكثر مبيعًا",
  "footer.hotDrops": "إصدارات حصرية",
  "footer.trending": "الأكثر رواجًا",
  "footer.faqs": "الأسئلة الشائعة",
  "footer.shipping": "الشحن والتوصيل",
  "footer.trackOrder": "تتبّع الطلب",
  "footer.terms": "شروط الخدمة",
  "footer.privacy": "سياسة الخصوصية",
  "footer.returnPolicy": "سياسة الإرجاع",
  "footer.rights": "© 2026 Trendora. جميع الحقوق محفوظة.",
  "footer.subscribed": "شكرًا لاشتراكك!",
  "footer.invalidEmail": "يُرجى إدخال بريد إلكتروني صحيح.",
  "footer.demoLogin": "تسجيل الدخول التجريبي",

  // Misc
  "scrollTop": "إلى الأعلى",
} as const;



