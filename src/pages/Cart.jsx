import PageTransition from "@/components/PageTransition";
import EmptyState from "@/components/ui/EmptyState";
import Title from "@/components/ui/Title";
import { useCart } from "@/context/CartProvider";
import { FaMinus, FaPlus, FaShoppingCart, FaTrash } from "react-icons/fa";

import { toast } from "sonner";

const Cart = () => {
  const {
    totalPrice,

    handleDeleteFromCart,

    cartItems,
    cartDispatch,
  } = useCart();

  if (cartItems.length === 0)
    return (
      <PageTransition>
        <EmptyState
          title={" Your Cart is Empty"}
          desc={
            " Looks like you haven't added any products to your cart yet. Let's find something special!"
          }
          icon={<FaShoppingCart size={50} />}
        />
      </PageTransition>
    );
  return (
    <PageTransition>
      <section className="section-padding bg-base-bg dark:bg-dark-surface custom-container">
        <Title
          heading={"My Cart"}
          subHeading={`You have ${cartItems.length} Products In your Cart`}
        />
        <div
          className="grid grid-cols-1 gap-8 lg:grid-cols-3 bg-base-bg dark:bg-dark-surface border border-border-light
       dark:border-border-dark rounded-3xl p-6 shadow-sm"
        >
          <div className="flex lg:col-span-2 max-h-100 overflow-y-auto p-2 bg-transparent flex-col gap-5">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className=" flex flex-col rounded-4xl border shadow-sm border-border-light dark:border-border-dark
            sm:flex-row sm:items-center p-4 sm:justify-between bg-base-bg dark:bg-dark-bg gap-2"
              >
                {/* Left Side */}
                <div className="flex gap-3 h-full w-full sm:w-auto">
                  {/* Item Image */}
                  <div className="w-15 h-15 bg-base-surface dark:bg-dark-surface p-2 rounded-2xl">
                    <img
                      className="w-full h-full object-cover"
                      src={item.images[0]}
                      alt={item.title}
                    />
                  </div>
                  {/* Name And Price */}
                  <div>
                    <span className="text-xs  md:text-sm text-base-text-faint">
                      {item.category}
                    </span>
                    <h2 className="text-base-text mt-1 mb-2 line-clamp-1 dark:text-dark-text text-sm">
                      {item.title}
                    </h2>
                    <span className="text-accent-trendora">${item.price}</span>
                  </div>
                </div>
                {/* Rigth Side */}
                <div
                  className="flex justify-between sm:justify-end sm:gap-6 max-sm:border-t
               max-sm:border-accent max-sm:pt-4 items-center "
                >
                  {/* Item Buttons Number */}
                  <div
                    className="flex items-center border border-border-light dark:border-border-dark rounded-xl
                     bg-base-surface dark:bg-dark-surface overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        cartDispatch({
                          type: "DECRACE_QUANTITY",
                          payload: { id: item.id },
                        })
                      }
                      className="p-2 text-base-text-faint hover:bg-base-bg dark:hover:bg-dark-bg transition active:scale-90"
                    >
                      <FaMinus />
                    </button>
                    <span className="px-3 font-semibold text-sm text-base-text dark:text-dark-text">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        cartDispatch({
                          type: "INCRACE_QUANTITY",
                          payload: { maxQty: item.stock, id: item.id },
                        })
                      }
                      className="p-2 text-base-text-faint hover:bg-base-bg dark:hover:bg-dark-bg transition active:scale-90"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  {/* Total Price */}
                  <div>
                    <p className="font-bold text-base-text max-w-15 dark:text-dark-text text-sm md:text-base  ">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  {/* Clear Item */}
                  <div>
                    <button
                      onClick={() => handleDeleteFromCart(item)}
                      className="text-base-text-faint hover:text-danger p-2 transition rounded-full hover:bg-red-100
                       dark:hover:bg-red-950/30"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Total */}

          <div
            className="p-6 rounded-3xl border border-border-light dark:border-border-dark
           bg-base-bg dark:bg-dark-bg shadow-sm sticky top-24"
          >
            <h3
              className="text-lg font-bold text-base-text dark:text-dark-text mb-4 border-b
             border-border-light dark:border-border-dark pb-3"
            >
              Order Summary
            </h3>

            <div className="flex flex-col gap-3 text-sm font-medium text-base-text-faint mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-base-text dark:text-dark-text">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-border-light dark:border-border-dark pt-4 mb-6">
              <span className="text-base font-bold text-base-text dark:text-dark-text">
                Total
              </span>
              <span className="text-xl font-black text-base-text dark:text-dark-text">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-center w-full">
              <button
                onClick={() =>
                  toast.success("Proceeding to secure checkout...")
                }
                className=" bg-accent-trendora  hover:bg-accent-hover text-base-text dark:text-dark-text
               font-semibold py-3 px-4  rounded-2xl shadow-md transition  active:scale-[0.98] 
                text-sm md:text-base mb-3"
              >
                Proceed to Checkout
              </button>
            </div>

            <p className="text-[11px] text-center text-base-text-faint">
              We accept Secure Credit Cards, PayPal, and Apple Pay.
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Cart;
