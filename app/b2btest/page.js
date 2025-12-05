"use client";

import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Package,
  Search,
  Filter,
  Save,
  Upload,
  Download,
  History,
  Star,
  TrendingUp,
  Clock,
  Copy,
  FileText,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Calendar,
  Truck,
  Tag,
  Percent,
  Calculator,
  MessageSquare,
  Bell,
  ChevronDown,
  ChevronUp,
  BarChart3,
  ShoppingBag,
} from "lucide-react";

// Single-file, self-contained B2B quick reorder React component
// - Tailwind classes assumed available in the project
// - This is a completed, modular-friendly component kept in one file for convenience
// - Replace mocked behavior (CSV import/export, PDF generation, API calls) with your backend integrations

export default function B2BQuickOrder() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Capri Lucky Tooth Pedo Boxes",
      sku: "92",
      unitPrice: 1.0,
      quantity: 1,
      image: "🦷",
      category: "Dental Supplies",
      stock: 150,
      lastOrdered: "2024-11-20",
      discount: 0,
      bulkPricing: [
        { qty: 50, price: 0.9 },
        { qty: 100, price: 0.85 },
      ],
      avgMonthlyOrder: 45,
      supplier: "MediDent Co.",
      deliveryDays: 2,
      notes: "",
    },
    {
      id: 2,
      name: "GC Mixing Agate Spatula",
      sku: "141",
      unitPrice: 45.0,
      quantity: 1,
      image: "🔷",
      category: "Mixing Tools",
      stock: 89,
      lastOrdered: "2024-11-15",
      discount: 5,
      bulkPricing: [
        { qty: 10, price: 42.0 },
        { qty: 25, price: 40.0 },
      ],
      avgMonthlyOrder: 12,
      supplier: "GC Dental",
      deliveryDays: 3,
      notes: "",
    },
    {
      id: 3,
      name: "Mani Diamond Bur - Br-46 CA",
      sku: "147",
      unitPrice: 135.0,
      quantity: 1,
      image: "💎",
      category: "Burs",
      stock: 45,
      lastOrdered: "2024-11-25",
      discount: 0,
      bulkPricing: [
        { qty: 20, price: 130.0 },
        { qty: 50, price: 125.0 },
      ],
      avgMonthlyOrder: 30,
      supplier: "Mani Inc.",
      deliveryDays: 5,
      notes: "",
    },
    {
      id: 4,
      name: "AIZ London College Tweezer - Plain (Dp2)",
      sku: "332",
      unitPrice: 200.0,
      quantity: 1,
      image: "🔧",
      category: "Instruments",
      stock: 12,
      lastOrdered: "2024-10-30",
      discount: 10,
      bulkPricing: [
        { qty: 5, price: 190.0 },
        { qty: 15, price: 180.0 },
      ],
      avgMonthlyOrder: 8,
      supplier: "AIZ Medical",
      deliveryDays: 7,
      notes: "",
    },
    {
      id: 5,
      name: "AIZ ENAMEL CHISEL 7",
      sku: "345",
      unitPrice: 200.0,
      quantity: 1,
      image: "🔨",
      category: "Instruments",
      stock: 67,
      lastOrdered: "2024-11-18",
      discount: 0,
      bulkPricing: [{ qty: 10, price: 195.0 }],
      avgMonthlyOrder: 15,
      supplier: "AIZ Medical",
      deliveryDays: 7,
      notes: "",
    },
  ]);

  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [savedTemplates, setSavedTemplates] = useState([
    "Monthly Order",
    "Weekly Restock",
    "Emergency Kit",
  ]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [favorites, setFavorites] = useState(new Set([1, 3]));
  const [notification, setNotification] = useState("");
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const [showBulkDiscount, setShowBulkDiscount] = useState(true);
  const [autoSuggestMode, setAutoSuggestMode] = useState(true);
  const [scheduledDate, setScheduledDate] = useState("");
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [paymentTerms, setPaymentTerms] = useState("Net 30");
  const [showCalculator, setShowCalculator] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const [comparison, setComparison] = useState(false);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message) => {
    setNotification(message);
  };

  const updateQuantity = (id, delta) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p))
    );
  };

  const setQuickQuantity = (id, qty) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p)));
    showNotification(`Quantity set to ${qty}`);
  };

  const setAvgMonthlyQuantity = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.avgMonthlyOrder } : p))
    );
    const product = products.find((p) => p.id === id);
    if (product) showNotification(`Set to average monthly order: ${product.avgMonthlyOrder}`);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showNotification("Removed from favorites");
      } else {
        next.add(id);
        showNotification("Added to favorites");
      }
      return next;
    });
  };

  const reorderLastQuantity = (id) => {
    // mocked last quantity - in real app, fetch from order history
    const lastQty = Math.floor(Math.random() * 10) + 5;
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: lastQty } : p)));
    showNotification(`Set to last order quantity: ${lastQty}`);
  };

  const duplicateProduct = (id) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      const newProduct = { ...product, id: Date.now(), name: product.name + " (copy)" };
      setProducts((prev) => [...prev, newProduct]);
      showNotification("Product duplicated");
    }
  };

  const saveTemplate = () => {
    if (templateName.trim()) {
      setSavedTemplates((prev) => [...prev, templateName.trim()]);
      showNotification(`Template "${templateName.trim()}" saved!`);
      setTemplateName("");
      setShowSaveDialog(false);
    }
  };

  const exportToCSV = () => {
    const selectedProducts = products.filter((p) => selectedItems.has(p.id));
    // implement CSV creation and download here
    showNotification(`Exported ${selectedProducts.length} items to CSV`);
  };

  const importFromCSV = () => {
    // implement CSV parsing & adding products here
    showNotification("CSV import (mock) completed");
  };

  const generatePDF = () => {
    // implement PDF generation here
    showNotification("PDF quote generated (mock)");
  };

  const shareViaEmail = () => {
    // integrate with email API or mailto
    showNotification("Order shared via email (mock)");
  };

  const scheduleOrder = () => {
    if (scheduledDate) {
      showNotification(`Order scheduled for ${scheduledDate}`);
      setShowScheduleDialog(false);
    }
  };

  const applyBulkDiscount = (product) => {
    const applicable = product.bulkPricing
      .filter((bp) => product.quantity >= bp.qty)
      .sort((a, b) => b.qty - a.qty);

    return applicable.length > 0 ? applicable[0].price : null;
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const sortProducts = (prods) => {
    return [...prods].sort((a, b) => {
      switch (sortBy) {
        case "price":
          return b.unitPrice - a.unitPrice;
        case "stock":
          return a.stock - b.stock;
        case "lastOrdered":
          return new Date(b.lastOrdered) - new Date(a.lastOrdered);
        default:
          return a.name.localeCompare(b.name);
      }
    });
  };

  const filteredProducts = sortProducts(
    products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.includes(searchTerm);
      const matchesCategory = filterCategory === "All" || p.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
  );

  const getDiscountedPrice = (product) => {
    const bulkPrice = applyBulkDiscount(product);
    if (bulkPrice) return bulkPrice;
    return product.unitPrice * (1 - product.discount / 100);
  };

  const removeItem = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setSelectedItems((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const toggleSelect = (id) => {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      setSelectAll(next.size === products.length);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());
      setSelectAll(false);
    } else {
      setSelectedItems(new Set(products.map((p) => p.id)));
      setSelectAll(true);
    }
  };

  const clearAll = () => {
    setSelectedItems(new Set());
    setSelectAll(false);
  };

  const getTotalAmount = () => {
    return products
      .reduce((sum, p) => sum + getDiscountedPrice(p) * p.quantity, 0)
      .toFixed(2);
  };

  const getSelectedTotal = () => {
    return products
      .filter((p) => selectedItems.has(p.id))
      .reduce((sum, p) => sum + getDiscountedPrice(p) * p.quantity, 0)
      .toFixed(2);
  };

  const getTotalSavings = () => {
    return products
      .filter((p) => selectedItems.has(p.id))
      .reduce((sum, p) => {
        const originalPrice = p.unitPrice * p.quantity;
        const finalPrice = getDiscountedPrice(p) * p.quantity;
        return sum + (originalPrice - finalPrice);
      }, 0)
      .toFixed(2);
  };

  const addToCart = () => {
    const itemsToAdd = products.filter((p) => selectedItems.has(p.id));
    showNotification(`Adding ${itemsToAdd.length} items to cart! Total: Rs. ${getSelectedTotal()}`);
  };

  const updateProductNote = (id, note) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, notes: note } : p)));
  };

  const getEstimatedDelivery = () => {
    const selected = products.filter((p) => selectedItems.has(p.id));
    if (selected.length === 0) return "N/A";
    const maxDays = Math.max(...selected.map((p) => p.deliveryDays || 0));
    const date = new Date();
    date.setDate(date.getDate() + maxDays);
    return date.toLocaleDateString();
  };

  // small utility to format money consistently
  const fmt = (value) => `Rs. ${parseFloat(value).toFixed(2)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-slide-in flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">{notification}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-l-4 border-blue-600">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Package className="w-8 h-8 text-white" />
                </div>
                B2B Quick Reorder Platform
              </h1>
              <p className="text-gray-600 mt-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Smart ordering system for your business needs
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setComparison(!comparison)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
              >
                <BarChart3 className="w-5 h-5" />
                Compare
              </button>
              <button
                onClick={importFromCSV}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Import
              </button>
              <button
                onClick={() => setShowSaveDialog(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save
              </button>
              <button
                onClick={exportToCSV}
                disabled={selectedItems.size === 0}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:bg-gray-300 flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Export
              </button>
              <button
                onClick={generatePDF}
                disabled={selectedItems.size === 0}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-300 flex items-center gap-2"
              >
                <FileText className="w-5 h-5" />
                PDF
              </button>
              <button
                onClick={addToCart}
                disabled={selectedItems.size === 0}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 font-semibold shadow-md"
              >
                <ShoppingCart className="w-5 h-5" />
                Cart ({selectedItems.size})
              </button>
            </div>
          </div>

          {/* Search & Controls */}
          <div className="grid grid-cols-12 gap-4 mb-4">
            <div className="col-span-5 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by product name, SKU, or supplier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
              />
            </div>
            <div className="col-span-2 relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full pl-10 pr-8 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none appearance-none bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2 relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none appearance-none bg-white"
              >
                <option value="name">Sort: Name</option>
                <option value="price">Sort: Price</option>
                <option value="stock">Sort: Stock</option>
                <option value="lastOrdered">Sort: Recent</option>
              </select>
            </div>
            <div className="col-span-3 flex gap-2">
              <button
                onClick={() => setViewMode(viewMode === "grid" ? "compact" : "grid")}
                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium"
              >
                {viewMode === "grid" ? "📋 Compact" : "📱 Grid"}
              </button>
              <button
                onClick={() => setAutoSuggestMode(!autoSuggestMode)}
                className={`flex-1 px-4 py-3 rounded-lg font-medium ${
                  autoSuggestMode ? "bg-green-100 text-green-700" : "bg-gray-100"
                }`}
              >
                🤖 AI
              </button>
            </div>
          </div>

          {/* Templates */}
          {savedTemplates.length > 0 && (
            <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <History className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-700">Quick Load Templates:</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {savedTemplates.map((template, idx) => (
                  <button
                    key={idx}
                    className="px-4 py-2 bg-white border-2 border-blue-200 text-blue-700 rounded-lg text-sm hover:bg-blue-50 hover:border-blue-400 font-medium shadow-sm"
                    onClick={() => showNotification(`Loaded \"${template}\"`)}
                  >
                    📁 {template}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-5 gap-4 mb-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-blue-600 font-medium">Total Items</div>
                  <div className="text-2xl font-bold text-blue-900">{products.length}</div>
                </div>
                <ShoppingBag className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-green-600 font-medium">Selected</div>
                  <div className="text-2xl font-bold text-green-900">{selectedItems.size}</div>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-purple-600 font-medium">Total Savings</div>
                  <div className="text-2xl font-bold text-purple-900">{fmt(getTotalSavings())}</div>
                </div>
                <Percent className="w-8 h-8 text-purple-400" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-orange-600 font-medium">Est. Delivery</div>
                  <div className="text-lg font-bold text-orange-900">{getEstimatedDelivery()}</div>
                </div>
                <Truck className="w-8 h-8 text-orange-400" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg border border-pink-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-pink-600 font-medium">Payment</div>
                  <div className="text-lg font-bold text-pink-900">{paymentTerms}</div>
                </div>
                <DollarSign className="w-8 h-8 text-pink-400" />
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-4 border-t-2">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                  className="w-5 h-5 rounded border-gray-300"
                />
                <span className="font-medium text-gray-700">SELECT ALL ({filteredProducts.length})</span>
              </label>
              <button onClick={clearAll} className="text-red-600 hover:text-red-700 font-medium">
                Clear All
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowScheduleDialog(true)}
                disabled={selectedItems.size === 0}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 disabled:bg-gray-200 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Schedule Order
              </button>
              <button
                onClick={shareViaEmail}
                disabled={selectedItems.size === 0}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 disabled:bg-gray-200 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={() => setShowCalculator(!showCalculator)}
                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                Calculator
              </button>
            </div>
          </div>
        </div>

        {/* Calculator Panel */}
        {showCalculator && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-l-4 border-purple-600">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Calculator className="w-6 h-6" /> Order Calculator
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Subtotal</div>
                <div className="text-2xl font-bold">{fmt(getSelectedTotal())}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Tax (13%)</div>
                <div className="text-2xl font-bold">{fmt((parseFloat(getSelectedTotal() || 0) * 0.13).toFixed(2))}</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                <div className="text-sm text-green-600 font-medium">Grand Total</div>
                <div className="text-2xl font-bold text-green-700">{fmt((parseFloat(getSelectedTotal() || 0) * 1.13).toFixed(2))}</div>
              </div>
            </div>
          </div>
        )}

        {/* Product List */}
        <div className={viewMode === "grid" ? "space-y-4" : "space-y-2"}>
          {filteredProducts.map((product) => {
            const bulkPrice = applyBulkDiscount(product);
            const isExpanded = expandedProduct === product.id;
            const needsRestock = product.quantity > product.stock * 0.8 || product.stock < 20;

            return (
              <div
                key={product.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all border-2 ${
                  selectedItems.has(product.id) ? "border-blue-500 bg-blue-50" : "border-transparent"
                } ${viewMode === "compact" ? "p-3" : "p-5"}`}
              >
                <div className="flex items-center gap-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedItems.has(product.id)}
                    onChange={() => toggleSelect(product.id)}
                    className="w-6 h-6 rounded border-gray-300"
                  />

                  {/* Image */}
                  <div className="relative">
                    <div className={`${viewMode === "compact" ? "w-16 h-16" : "w-24 h-24"} bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-4xl shadow-md`}>
                      {product.image}
                    </div>
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 shadow-lg hover:scale-110 transition-transform"
                    >
                      <Star className={`w-5 h-5 ${favorites.has(product.id) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`} />
                    </button>
                    {needsRestock && (
                      <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">⚠️</div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg truncate">{product.name}</h3>
                        <div className="flex items-center gap-3 mt-2 flex-wrap">
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">SKU: {product.sku}</span>
                          <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">{product.category}</span>
                          <span className={`text-sm px-2 py-1 rounded font-medium ${product.stock < 20 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>📦 Stock: {product.stock}</span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">🏢 {product.supplier}</span>
                          <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">📊 Avg: {product.avgMonthlyOrder}/mo</span>
                        </div>

                        {/* Auto-suggest */}
                        {autoSuggestMode && product.quantity < product.avgMonthlyOrder * 0.5 && (
                          <div className="mt-2 text-xs bg-yellow-50 text-yellow-700 px-3 py-1 rounded">Suggested: Increase to monthly avg</div>
                        )}

                        {/* Expanded details */}
                        {isExpanded && (
                          <div className="mt-3 bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm">
                            <div className="flex items-center gap-3 flex-wrap">
                              <div>Last Ordered: <strong>{product.lastOrdered}</strong></div>
                              <div>Delivery: <strong>{product.deliveryDays} days</strong></div>
                              <div>Supplier: <strong>{product.supplier}</strong></div>
                            </div>
                            <div className="mt-2">
                              <label className="text-xs font-medium">Notes</label>
                              <textarea
                                value={product.notes}
                                onChange={(e) => updateProductNote(product.id, e.target.value)}
                                className="w-full mt-2 p-2 border rounded-md"
                                rows={2}
                              />
                            </div>
                          </div>
                        )}

                      </div>

                      {/* Actions & Price */}
                      <div className="flex flex-col items-end gap-3 ml-4">
                        <div className="text-sm text-gray-500">Unit</div>
                        <div className="text-xl font-bold">{fmt(getDiscountedPrice(product))}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(product.id, -1)} className="p-2 rounded bg-gray-100 hover:bg-gray-200"><Minus className="w-4 h-4" /></button>
                          <input value={product.quantity} readOnly className="w-14 text-center p-2 border rounded" />
                          <button onClick={() => updateQuantity(product.id, 1)} className="p-2 rounded bg-gray-100 hover:bg-gray-200"><Plus className="w-4 h-4" /></button>
                        </div>

                        <div className="flex flex-col items-end mt-1 gap-2">
                          <div className="flex gap-2">
                            <button onClick={() => setQuickQuantity(product.id, 1)} className="px-2 py-1 text-xs bg-gray-100 rounded">1</button>
                            <button onClick={() => setAvgMonthlyQuantity(product.id)} className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">Avg</button>
                            <button onClick={() => reorderLastQuantity(product.id)} className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded">Last</button>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => duplicateProduct(product.id)} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded text-sm">Duplicate</button>
                            <button onClick={() => removeItem(product.id)} className="px-3 py-1 bg-red-50 text-red-700 rounded text-sm">Remove</button>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Bulk Pricing / Discount Info */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        {showBulkDiscount && bulkPrice ? (
                          <span className="text-sm text-green-700 font-medium">Bulk price applied: {fmt(bulkPrice)} (qty ≥ {product.bulkPricing.sort((a,b)=>a.qty-b.qty)[0].qty})</span>
                        ) : (
                          <span>Price: {fmt(product.unitPrice)} {product.discount ? `• ${product.discount}% off` : ""}</span>
                        )}
                      </div>

                      <div className="text-sm text-gray-500">Total: <strong>{fmt(getDiscountedPrice(product) * product.quantity)}</strong></div>
                    </div>

                  </div>
                </div>

                {/* Expand / Compact footer */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setExpandedProduct(isExpanded ? null : product.id)} className="text-sm text-blue-600 flex items-center gap-2">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />} {isExpanded ? "Less" : "More"}
                    </button>
                    <button onClick={() => toggleFavorite(product.id)} className="text-sm text-gray-600">{favorites.has(product.id) ? "★ Favorite" : "☆ Favorite"}</button>
                  </div>

                  <div className="flex items-center gap-3">
                    <button onClick={() => setSelectedItems((prev)=>{const n=new Set(prev); n.add(product.id); return n;})} className="px-3 py-2 bg-blue-600 text-white rounded">Add</button>
                    <button onClick={() => showNotification('Copied SKU to clipboard') } className="px-3 py-2 bg-gray-100 rounded">Copy SKU</button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom summary / drawer */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white border rounded-xl shadow-xl p-4 w-[95%] md:w-3/4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">Selected: <strong>{selectedItems.size}</strong></div>
            <div className="text-sm text-gray-600">Subtotal: <strong>{fmt(getSelectedTotal())}</strong></div>
            <div className="text-sm text-gray-600">Savings: <strong>{fmt(getTotalSavings())}</strong></div>
            <div className="text-sm text-gray-600">Est. Delivery: <strong>{getEstimatedDelivery()}</strong></div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={exportToCSV} disabled={selectedItems.size===0} className="px-4 py-2 bg-gray-100 rounded">Export</button>
            <button onClick={generatePDF} disabled={selectedItems.size===0} className="px-4 py-2 bg-red-600 text-white rounded">Quote PDF</button>
            <button onClick={addToCart} disabled={selectedItems.size===0} className="px-6 py-3 bg-blue-600 text-white rounded font-semibold">Add to Cart</button>
          </div>
        </div>

        {/* Save Template Dialog */}
        {showSaveDialog && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-bold mb-3">Save Template</h3>
              <input value={templateName} onChange={(e)=>setTemplateName(e.target.value)} placeholder="Template name" className="w-full p-2 border rounded mb-3" />
              <div className="flex justify-end gap-2">
                <button onClick={()=>setShowSaveDialog(false)} className="px-4 py-2 rounded border">Cancel</button>
                <button onClick={saveTemplate} className="px-4 py-2 rounded bg-blue-600 text-white">Save</button>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Dialog */}
        {showScheduleDialog && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-bold mb-3">Schedule Order</h3>
              <input value={scheduledDate} onChange={(e)=>setScheduledDate(e.target.value)} type="date" className="w-full p-2 border rounded mb-3" />
              <div className="flex justify-between items-center gap-2">
                <label className="flex items-center gap-2"><input type="checkbox"/> Repeat monthly</label>
                <label className="flex items-center gap-2"><input type="checkbox"/> Notify me</label>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={()=>setShowScheduleDialog(false)} className="px-4 py-2 rounded border">Cancel</button>
                <button onClick={scheduleOrder} className="px-4 py-2 rounded bg-blue-600 text-white">Schedule</button>
              </div>
            </div>
          </div>
        )}

        {/* Comparison Panel */}
        {comparison && (
          <div className="fixed right-6 top-20 w-[380px] bg-white rounded-xl shadow-lg p-4 z-40">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold">Compare Items</h4>
              <button onClick={()=>setComparison(false)} className="text-gray-500">Close</button>
            </div>
            <div className="text-sm text-gray-600">Selected items: {Array.from(selectedItems).join(", ") || "None"}</div>
            <div className="mt-3">
              <div className="text-xs text-gray-500">Stats</div>
              <div className="mt-2 text-sm">Total selected value: <strong>{fmt(getSelectedTotal())}</strong></div>
              <div className="mt-1 text-sm">Avg delivery (days): <strong>{products.filter(p=>selectedItems.has(p.id)).reduce((a,b)=>a+(b.deliveryDays||0),0) / Math.max(1, selectedItems.size)}</strong></div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
