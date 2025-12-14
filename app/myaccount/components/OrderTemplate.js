"use client";

import { useState } from "react";
import { ShoppingCart, Trash2, Plus, Minus, Package } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";



export default function B2BQuickOrder() {
   const [templateItems, setTemplateItems] = useState([]);

  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
    const router = useRouter();

  const TEMPLATE_KEY = "quickOrderTemplate";

const getTemplateItems = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(TEMPLATE_KEY)) || [];
};

const setTemplateItemss = (items) => {
  localStorage.setItem(TEMPLATE_KEY, JSON.stringify(items));
};
useEffect(() => {
  if (typeof window === "undefined") return;

  const stored = getTemplateItems();

  const normalized = stored.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.image,
    category: item.category,
    unitPrice: Number(item.unitPrice ?? item.price ?? 0),
    quantity: Number(item.quantity) || 1,
    product_code: item.product_code,
    available_quantity: item.available_quantity,
  }));
  console.log("Loaded template items:", normalized);

  setTemplateItems(normalized);
}, []); // ✅ EMPTY DEP ARRAY (IMPORTANT)


  if (templateItems.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No items in template
      </div>
    );
  }



  const clearTemplate = () => {
  localStorage.removeItem("quickOrderTemplate");
  setTemplateItems([]);
  setTemplateItemss([]);
    toast.success("Template cleared");
    window.location.reload();
};


  const updateQuantity = (id, delta) => {
  const updated = templateItems.map((p) =>
    p.id === id
      ? { ...p, quantity: Math.max(1, p.quantity + delta) }
      : p
  );

  setTemplateItems(updated);
  setTemplateItemss(
  updated.map((item) => ({
    ...item,
    price: item.unitPrice, // 🔥 keep price for reload safety
  }))
);

};

const removeItem = (id) => {
  const updated = templateItems.filter((p) => p.id !== id);

  setTemplateItems(updated);
  setTemplateItemss(
    updated.map((item) => ({
      ...item,
      price: item.unitPrice,
    }))
  );

  setSelectedItems((prev) => {
    const s = new Set(prev);
    s.delete(id);
    return s;
  });
};


  const toggleSelect = (id) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
    setSelectAll(newSelected.size === templateItems.length);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(templateItems.map((p) => p.id)));
    }
    setSelectAll(!selectAll);
  };

  const clearAll = () => {
    setSelectedItems(new Set());
    setSelectAll(false);
  };

  const getTotalAmount = () => {
    return templateItems
      .reduce((sum, p) => sum + p.unitPrice * p.quantity, 0)
      ;
  };

const getSelectedTotal = () => {
  const total = templateItems
    .filter((p) => selectedItems.has(p.id))
    .reduce(
      (sum, p) =>
        sum + Number(p.unitPrice || 0) * Number(p.quantity || 0),
      0
    );

  return total.toFixed(2);
};


  const addToCart = () => {
    const itemsToAdd = templateItems.filter((p) => selectedItems.has(p.id));
    alert(
      `Adding ${
        itemsToAdd.length
      } items to cart!\nTotal: Rs. ${getSelectedTotal()}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Package className="w-7 h-7" />
                Quick Reorder Template
              </h1>
              <p className="text-gray-600 mt-1">
                Your frequently purchased items - just update quantity and order
              </p>
            </div>
            <button
              onClick={() => router.push("/cart")}
              className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
            >
              <ShoppingCart className="w-5 h-5" />
              Add Products
            </button>
            <button
                  onClick={clearTemplate}
                  disabled={templateItems.length === 0}
                  className="bg-red-600 text-white ml-2 p-4 py-3 rounded-lg 
                            hover:bg-red-700 disabled:bg-gray-300 
                            disabled:cursor-not-allowed 
                            flex items-center gap-2 font-semibold"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Clear Template
                </button>


          </div>

          {/* Select Controls */}
          <div className="flex items-center justify-between pt-4 border-t">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
                className="w-5 h-5 rounded border-gray-300"
              />
              <span className="font-medium text-gray-700">
                SELECT ALL ({templateItems.length} ITEMS)
              </span>
            </label>
            <button
              onClick={clearAll}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Product List */}
        <div className="space-y-4">
          {templateItems.map((product) => (
            <div
              key={product.product_code}
              className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedItems.has(product.id)}
                  onChange={() => toggleSelect(product.id)}
                  className="w-5 h-5 rounded border-gray-300"
                />

                {/* Product Image */}
               <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center">
                  <img
                    src={product.image}
                    // alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {product.name}
                  </h3>
                  {/* <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-500">
                      Code: {product.product_code}
                    </span>

                    <span className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div> */}
                </div>

                {/* Unit Price */}
                <div className="text-right">
                  <div className="text-sm text-gray-500">Unit Price</div>
                  <div className="text-lg font-semibold text-gray-900">
                    Rs. {product.unitPrice}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(product.id, -1)}
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:bg-gray-100 flex items-center justify-center"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      setTemplateItems(
                        templateItems.map((p) =>
                          p.id === product.id
                            ? { ...p, quantity: Math.max(1, val) }
                            : p
                        )
                      );
                    }}
                    className="w-20 h-10 border-2 border-blue-500 rounded-lg text-center font-semibold text-lg"
                  />
                  <button
                    onClick={() => updateQuantity(product.id, 1)}
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:bg-gray-100 flex items-center justify-center"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {/* Total Price */}
                <div className="text-right min-w-[120px]">
                  <div className="text-sm text-gray-500">Total</div>
                  <div className="text-xl font-bold text-green-600">
                    Rs. {(product.unitPrice * product.quantity).toFixed(2)}
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => removeItem(product.id)}
                  className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6 sticky bottom-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">
                {selectedItems.size} of {templateItems.length} items selected
              </div>
              <div className="text-2xl font-bold text-gray-900 mt-1">
                Total Amount: Rs. {getSelectedTotal()}
              </div>
              {/* {selectedItems.size > 0 && (
                <div className="text-lg font-semibold text-green-600 mt-1">
                  Selected Total: Rs. {getSelectedTotal()}
                </div>
              )} */}
            </div>
            <button
              onClick={addToCart}
              disabled={selectedItems.size === 0}
              className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 text-lg font-bold"
            >
              <ShoppingCart className="w-6 h-6" />
              Place Order ({selectedItems.size} items)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
