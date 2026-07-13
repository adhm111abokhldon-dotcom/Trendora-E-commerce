import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"; // استيراد دايالوج Shadcn
import { toast } from "sonner"; // استيراد توست Sonner
import { useCart } from "../../../context/CartProvider";

const CartActions = () => {
  // 1. هنا تحضر الـ dispatch من البروفايدر الخاص بك (مثال)
  const { dispatch } = useCart();

  // 2. هذه الدالة هي التي ستتولى التنفيذ النهائي عند الضغط على زر "موافق"
  const handleConfirmAction = () => {
    // 👈 هنا قمنا بنقل الـ dispatch ليتم استدعاؤه هنا بدلاً من الزر الأول!
    dispatch({ type: "CLEAR_CART" });

    // 3. إظهار الإشعار مباشرة بعد نجاح الأكشن في الـ Reducer
    toast.success("تم تنفيذ العملية بنجاح", {
      description: "تم تحديث البيانات في سلة تسوقك الآن.",
    });
  };

  return (
    <div className="p-4" dir="rtl">
      <Dialog>
        {/* 🔘 الزر الأول: وظيفته فقط فـتـح الديالوج (لا يوجد عليه onClick للـ Reducer) */}
        <DialogTrigger asChild>
          <button className="px-5 py-2.5 bg-red-650 text-white rounded-xl cursor-pointer hover:bg-red-700 transition">
            تفريغ السلة
          </button>
        </DialogTrigger>

        {/* 📦 محتوى نافذة التأكيد */}
        <DialogContent className="rounded-2xl">
          <DialogHeader className="text-right">
            <DialogTitle className="text-lg font-bold">
              هل أنت متأكد؟
            </DialogTitle>
            <DialogDescription className="text-sm text-zinc-500 mt-1">
              تأكيدك لهذا الإجراء سيقوم بتحديث السلة وحذف العناصر نهائياً من
              حسابك.
            </DialogDescription>
          </DialogHeader>

          {/* 👥 أزرار التحكم والقرار */}
          <DialogFooter className="mt-4 flex justify-end gap-2">
            {/* زر الإلغاء: يغلق النافذة تلقائياً دون أي تأثير على الـ Reducer */}
            <DialogClose asChild>
              <button className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl cursor-pointer transition">
                تراجع
              </button>
            </DialogClose>

            {/* 🎯 زر الموافقة الفعلي: هنا ربطنا الدالة التي تحتوي على الـ dispatch والتوست */}
            <button
              onClick={handleConfirmAction}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl cursor-pointer transition"
            >
              نعم، موافق
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
    </div>
  );
};

export default CartActions;
