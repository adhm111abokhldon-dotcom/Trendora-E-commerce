// Simple EN/AR localization dictionaries.
// Keys are grouped by area. Product names/brands/categories are NOT translated here
// (they come from the backend as the source of truth).

export const en = {
  // Header / nav
  "nav.home": "Home",
  "nav.categories": "Categories",
  "nav.contact": "Contact Us",
  "nav.menu": "Open menu",
  "nav.close": "Close",
  "nav.search": "Search",
  "nav.searchPlaceholder": "Search for products...",
  "nav.searchShort": "Search...",
  "nav.searching": "Searching...",
  "nav.noResults": "No products found.",
  "nav.theme.toggle": "Toggle theme",
  "nav.login": "Log in",
  "nav.account": "Account",
  "nav.cart": "Cart",
  "nav.wishlist": "Wishlist",
  "nav.demoCta": "Explore Demo Store",

  // Language switcher
  "lang.switch": "Switch language",
  "lang.english": "English",
  "lang.arabic": "العربية",

  // Auth dialogs / logout
  "auth.logoutTitle": "Are you sure you want to log out?",
  "auth.logoutDesc":
    "This will end your current session and you will need to log in again to access your cart and favorites.",
  "auth.logoutConfirm": "Log Out",
  "auth.cancel": "Cancel",
  "auth.deniedTitle": "Login required",
  "auth.deniedDesc":
    "You need to be logged in to continue. Would you like to log in now?",
  "auth.login": "Log In",

  // Login page
  "login.welcome": "Welcome Back",
  "login.subtitle": "Log in to your Trendora account",
  "login.username": "Username",
  "login.usernamePlaceholder": "Enter your username",
  "login.password": "Password",
  "login.passwordPlaceholder": "Enter your password",
  "login.forgot": "Forgot?",
  "login.signIn": "Sign In",
  "login.signingIn": "Signing in...",
  "login.showPassword": "Show password",
  "login.hidePassword": "Hide password",
  "login.noAccount": "Don't have an account?",
  "login.signUp": "Sign up",
  "login.error.invalid": "Invalid username or password",
  "login.validation.username.required": "Username is required",
  "login.validation.password.required": "Password is required",
  "login.validation.password.min": "Password must be at least 4 characters",
  "login.demoHint": "Demo account",
  "login.demoNotice":
    "This is a demo store — you can browse products, use the cart and save favorites without an account. Sign in only to try the demo login flow.",
  "login.demoCreds": "Demo credentials: demo / demo1234",
  "login.tryDemo": "Try Demo Store",
  "login.browseNoAccount": "Just browsing?",

  // Product card / grid
  "product.view": "View Details",
  "product.add": "Add",
  "product.added": "In Cart",
  "product.outOfStock": "Out of Stock",
  "product.brand": "Brand",
  "product.off": "{n}% OFF",
  "product.imageAlt": "{title} image",

  // Product details
  "details.availability": "Availability",
  "details.inStock": "In Stock",
  "details.price": "Price",
  "details.hurry": "Hurry up, only {n} left in stock!",
  "details.rating": "Rating",
  "details.addToCart": "Add to Cart",
  "details.inCart": "Item in Cart",
  "details.related": "You May Also Like",
  "details.relatedSub": "Discover similar products handpicked just for you.",
  "details.reviewsTitle": "Client Testimonials",
  "details.reviewsSub": "Real reviews from people who trusted us.",
  "details.noReviews": "No reviews yet.",
  "details.loadingReviews": "Loading reviews...",
  "details.showImage": "Show {title} image {n}",
  "details.stockLeft": "{n} in stock",

  // Cart
  "cart.title": "My Cart",
  "cart.subtitle": "You have {n} items in your cart",
  "cart.emptyTitle": "Your Cart is Empty",
  "cart.emptyDesc":
    "Looks like you haven't added any products to your cart yet. Let's find something special!",
  "cart.continue": "Continue Shopping",
  "cart.summary": "Order Summary",
  "cart.subtotal": "Subtotal",
  "cart.shipping": "Shipping",
  "cart.free": "Free",
  "cart.total": "Total",
  "cart.checkout": "Proceed to Checkout",
  "cart.checkoutDemo":
    "This is a demo store — checkout is not connected to a payment provider.",
  "cart.increase": "Increase quantity",
  "cart.decrease": "Decrease quantity",
  "cart.remove": "Remove from cart",
  "cart.clear": "Clear Cart",
  "cart.checkoutSoon": "Online checkout is not available in this demo yet.",

  // Wishlist
  "wishlist.title": "My Wishlist",
  "wishlist.subtitle": "You have {n} items saved",
  "wishlist.emptyTitle": "Your Wishlist is Empty",
  "wishlist.emptyDesc":
    "Looks like you haven't saved any products yet. Let's find something special!",
  "wishlist.remove": "Remove from wishlist",
  "wishlist.add": "Add to wishlist",

  // Categories
  "categories.heading": "Categories",
  "categories.explore": "Explore Categories",
  "categories.viewAll": "View All Categories",
  "categories.wantMore": "Want to see more?",
  "categories.count": "{n} Categories",
  "categories.products": "{n} products available",

  // Toasts
  "toast.addedToCart": "Added to Cart!",
  "toast.addedToCartDesc": "{title} has been added to your cart.",
  "toast.removedFromCart": "Removed from Cart",
  "toast.removedFromCartDesc": "{title} has been removed from your cart.",
  "toast.restored": "Restored to Cart",
  "toast.clearCart": "Cart Cleared",
  "toast.clearCartDesc": "Your cart has been cleared.",
  "toast.addedToWishlist": "Added to Wishlist!",
  "toast.addedToWishlistDesc": "{title} has been added to your wishlist.",
  "toast.removedFromWishlist": "Removed from Wishlist",
  "toast.removedFromWishlistDesc": "{title} has been removed from your wishlist.",
  "toast.clearWishlist": "Wishlist Cleared",
  "toast.clearWishlistDesc": "Your wishlist has been cleared.",
  "toast.undo": "Undo",
  "toast.maxStock": "Only {n} available in stock.",

  // Loading / errors / empty
  "state.loading": "Loading...",
  "state.errorTitle": "Something went wrong",
  "state.errorDesc": "We couldn't load this content. Please try again.",
  "state.retry": "Try Again",
  "state.noProducts": "No products found.",
  "state.noProductsDesc": "Try browsing another category or check back later.",
  "state.notFound": "Product not found",
  "state.loadMore": "Load More",
  "state.loadingMore": "Loading more...",
  "state.noMore": "No more results",
  "state.loadMoreError": "Failed to load more results",

  // Home / marketing / static content
  "home.heroTitle": "Where Style Meets Innovation",
  "home.heroSub":
    "Explore the latest arrivals in fashion and smart gadgets, selected just for you",
  "home.spacesTitle": "Explore Trendora Spaces",
  "home.slideShop": "Shop the Trends Anywhere",
  "home.slideShopSub":
    "Your ultimate fashion and tech destination is just one tap away. Fast delivery straight to your doorstep.",
  "home.exploreNow": "Explore Now",
  "home.menCollection": "Shop Men's Collection",
  "home.tech": "Explore Tech",
  "home.womenCollection": "Shop Women's Collection",
  "home.redefine": "Redefine Your Look",
  "home.smartGear": "Smart Gear for Daily Life",
  "home.empower": "Empower Your Style",
  "marquee.delivery": "FREE FAST DELIVERY FOR ORDERS OVER $100",
  "marquee.secure": "100% SECURE PAYMENT",
  "marquee.returns": "14-DAY EASY RETURNS",
  "marquee.support": "24/7 CUSTOMER SUPPORT",
  "featured.best": "Best Sellers",
  "featured.bestSub": "What Everyone Is Buying",
  "featured.bestCount": "Top Rated Items",
  "featured.trending": "Trending Now",
  "featured.trendingSub": "Viral & Urban Styles",
  "featured.trendingCount": "Going Fast 🔥",
  "featured.hot": "Hot Drops",
  "featured.hotSub": "Exclusive Limited Deals",
  "featured.hotCount": "Up to 40% OFF",
  "featured.new": "New Arrivals",
  "featured.newSub": "Fresh Off The Design Lab",
  "featured.newCount": "Just Landed",
  "store.fastShipping": "Fast Shipping",
  "store.fastShippingDesc": "Free fast delivery for orders over $100",
  "store.securePayment": "Secure Payment",
  "store.securePaymentDesc": "100% protected payment methods",
  "store.easyReturns": "Easy Returns",
  "store.easyReturnsDesc": "14 days money-back guarantee",
  "store.support": "24/7 Support",
  "store.supportDesc": "Dedicated professional team",
  "faq.title": "Frequently Asked Questions",
  "faq.sub":
    "Everything you need to know about shipping, returns, and payments at Trendora",
  "faq.q1": "How long does shipping take with Trendora?",
  "faq.a1":
    "Shipping usually takes 2 to 5 business days nationwide. As soon as your order is shipped, we will send you an email and an SMS containing a direct link to track your shipment.",
  "faq.q2": "What is your return and exchange policy?",
  "faq.a2":
    "We offer a flexible return policy. You can return or exchange any product within 14 days of delivery, provided that the product is unused, in its original condition, and in its original packaging.",
  "faq.q3": "Do you offer Cash on Delivery (COD)?",
  "faq.a3":
    "Yes, Cash on Delivery is available in most cities. We also support secure online payment methods including Credit Cards, Apple Pay, and flexible installment plans.",
  "faq.q4": "How can I contact Trendora customer support?",
  "faq.a4":
    "Our team is ready to help you 24/7! You can reach us directly via WhatsApp, call our unified hotline, or send us an email. We typically respond within less than an hour.",

  // Footer
  "footer.tagline":
    "Your ultimate destination for modern fashion and lifestyle trends. Elevate your wardrobe with style.",
  "footer.subscribe": "Subscribe",
  "footer.subscribePlaceholder": "Enter your email",
  "footer.shop": "Shop",
  "footer.support": "Support",
  "footer.legal": "Legal",
  "footer.newArrivals": "New Arrivals",
  "footer.bestSellers": "Best Sellers",
  "footer.hotDrops": "Hot Drops",
  "footer.trending": "Trending Now",
  "footer.faqs": "FAQs",
  "footer.shipping": "Shipping & Delivery",
  "footer.trackOrder": "Track Order",
  "footer.terms": "Terms of Service",
  "footer.privacy": "Privacy Policy",
  "footer.returnPolicy": "Return Policy",
  "footer.rights": "© 2026 Trendora. All rights reserved.",
  "footer.subscribed": "Thanks for subscribing!",
  "footer.invalidEmail": "Please enter a valid email.",
  "footer.demoLogin": "Demo Login",

  // Misc
  "scrollTop": "Scroll to top",
} as const;

export type TranslationKey = keyof typeof en;




