// OrderConfirmation.jsx
import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderConfirmation = () => {
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.items || []);

  // 1) try router state
  const orderFromState = location.state?.order ?? null;

  // 2) try localStorage (if checkout saved it there)
  let orderFromStorage = null;
  try {
    const raw = localStorage.getItem("lastOrder");
    orderFromStorage = raw ? JSON.parse(raw) : null;
  } catch (err) {
    orderFromStorage = null;
  }

  // 3) fallback to building minimal order from cart
  const fallbackOrder = cartItems.length
    ? {
        id: null,
        status: "Pending",
        items: cartItems,
        deliveryDetails: null,
        paymentMethod: null,
        total: cartItems.reduce(
          (acc, it) => acc + Number(it.price || 0) * Number(it.quantity || 1),
          0
        ),
        createdAt: new Date().toISOString(),
      }
    : null;

  const order = orderFromState || orderFromStorage || fallbackOrder;

  // 🔹 Generate random ID if not provided
  const orderId = useMemo(() => {
    if (order?.id) return order.id;
    const randomStr = Math.random().toString(36).substring(2, 10);
    const timestamp = Date.now().toString(36).substring(4);
    return `r${randomStr}${timestamp}`;
  }, [order]);

  const formatCurrency = (value) => {
    const n = Number(value ?? 0);
    return `$${n.toFixed(2)}`;
  };

  const badgeClass = (status) => {
    const s = String(status ?? "").toLowerCase();
    const base = "px-3 py-1 text-sm rounded-full";
    if (s.includes("deliv") || s.includes("comp") || s.includes("paid"))
      return `${base} bg-green-100 text-green-700`;
    if (s.includes("pend") || s.includes("process"))
      return `${base} bg-yellow-100 text-yellow-700`;
    if (s.includes("cancel") || s.includes("fail"))
      return `${base} bg-red-100 text-red-700`;
    return `${base} bg-gray-100 text-gray-700`;
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">No recent order found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find an order to show. If you just placed an order, make
            sure the checkout passed the order to this page (via router state)
            or saved it to localStorage under <code>lastOrder</code>.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/"
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Continue Shopping
            </Link>
            <Link
              to="/orders"
              className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              View Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const {
    status,
    paymentMethod,
    phone,
    address,
    items = [],
    total,
    deliveryDetails,
    createdAt,
  } = order;

  const computedTotal =
    total ??
    items.reduce(
      (acc, it) => acc + Number(it.price ?? 0) * Number(it.quantity ?? 1),
      0
    );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-green-600">
            🎉 Order Confirmed
          </h2>
          <p className="text-gray-600 mt-2">
            Thanks — we've received your order. Below are the details.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border mb-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Order #{orderId}</p>
            <span className={badgeClass(status)}>{status ?? "Pending"}</span>
          </div>
          {createdAt && (
            <p className="text-xs text-gray-400 mt-2">
              Placed: {new Date(createdAt).toLocaleString()}
            </p>
          )}
        </div>

        {/* Order Summary */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

          {items.length ? (
            items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border-b pb-3 mb-3"
              >
                <div className="flex items-center gap-4">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                    {item.variant && (
                      <p className="text-xs text-gray-400">{item.variant}</p>
                    )}
                  </div>
                </div>
                <p className="font-semibold">
                  {formatCurrency(
                    Number(item.price) * Number(item.quantity || 1)
                  )}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No items found in the order.</p>
          )}

          <div className="flex justify-between text-lg font-semibold mt-4">
            <span>Total</span>
            <span>{formatCurrency(computedTotal)}</span>
          </div>
        </div>

        {/* Delivery + Payment */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Delivery Details</h3>
            {deliveryDetails ? (
              <>
                {deliveryDetails.street && (
                  <p className="text-gray-600">{deliveryDetails.street}</p>
                )}
                {(deliveryDetails.city ||
                  deliveryDetails.state ||
                  deliveryDetails.zip) && (
                  <p className="text-gray-600">
                    {deliveryDetails.city ?? ""}
                    {deliveryDetails.city ? ", " : ""}
                    {deliveryDetails.state ?? ""} {deliveryDetails.zip ?? ""}
                  </p>
                )}
                {deliveryDetails.phone && (
                  <p className="text-gray-600">
                    Phone: {deliveryDetails.phone}
                  </p>
                )}
                {deliveryDetails.instructions && (
                  <p className="text-gray-600 mt-1">
                    Notes: {deliveryDetails.instructions}
                  </p>
                )}
              </>
            ) : (
              <>
                {address ? (
                  <p className="text-gray-600">{address}</p>
                ) : (
                  <p className="text-gray-600">No address provided</p>
                )}
                {phone && <p className="text-gray-600">Phone: {phone}</p>}
              </>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Payment</h3>
            <p className="text-gray-600">{paymentMethod ?? "—"}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <Link
            to="/menu"
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Continue Shopping
          </Link>

          <div className="flex gap-2">
            <Link
              to="/order-history"
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              View Order History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
