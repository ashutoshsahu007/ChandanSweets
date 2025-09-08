import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();

  const orderFromState = location.state?.order ?? null;

  console.log(orderFromState, "orderfromstate");

  const order = orderFromState;

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
    const base = "px-3 py-1 text-sm rounded-full font-medium";
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100 p-4">
        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
            alt="No Order"
            className="w-28 h-28 mx-auto animate-bounce mb-4"
          />
          <h2 className="text-3xl font-bold text-orange-600 mb-2">
            No Recent Order Found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn’t find an order. If you just placed one, make sure it was
            passed to this page or saved in <code>lastOrder</code>.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/"
              className="px-6 py-3 bg-orange-500 text-white rounded-xl shadow-lg hover:bg-orange-600 transition"
            >
              Back to Home
            </Link>
            <Link
              to="/orders"
              className="px-6 py-3 bg-gray-700 text-white rounded-xl shadow-lg hover:bg-gray-800 transition"
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100 p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-6">
        <div className="text-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
            alt="Order Confirmed"
            className="w-28 h-28 mx-auto animate-bounce mb-4"
          />
          <h2 className="text-3xl font-extrabold text-orange-600">
            🎉 Order Confirmed!
          </h2>
          <p className="text-gray-600 mt-2">
            Thanks — your delicious food is on its way.
          </p>
        </div>

        {/* Order Info */}
        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200 mb-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-700 font-medium">
              Order <span className="font-semibold">#{orderId}</span>
            </p>
            <span className={badgeClass(status)}>{status ?? "Pending"}</span>
          </div>
          {createdAt && (
            <p className="text-xs text-gray-500 mt-2">
              Placed: {new Date(createdAt).toLocaleString()}
            </p>
          )}
        </div>

        {/* Items */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-orange-700 mb-4">
            🛒 Order Summary
          </h3>

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
                      className="w-16 h-16 rounded-xl object-cover shadow"
                    />
                  )}
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-gray-800">
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
            <span className="text-orange-600">
              {formatCurrency(computedTotal)}
            </span>
          </div>
        </div>

        {/* Delivery + Payment */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-bold text-orange-700 mb-2">
              🚚 Delivery Details
            </h3>
            {deliveryDetails ? (
              <>
                {deliveryDetails.street && (
                  <p className="text-gray-700">{deliveryDetails.street}</p>
                )}
                {(deliveryDetails.city ||
                  deliveryDetails.state ||
                  deliveryDetails.zip) && (
                  <p className="text-gray-700">
                    {deliveryDetails.city ?? ""}
                    {deliveryDetails.city ? ", " : ""}
                    {deliveryDetails.state ?? ""} {deliveryDetails.zip ?? ""}
                  </p>
                )}
                {deliveryDetails.phone && (
                  <p className="text-gray-700">
                    Phone: {deliveryDetails.phone}
                  </p>
                )}
                {deliveryDetails.instructions && (
                  <p className="text-gray-600 mt-1 italic">
                    Notes: {deliveryDetails.instructions}
                  </p>
                )}
              </>
            ) : (
              <>
                {address ? (
                  <p className="text-gray-700">{address}</p>
                ) : (
                  <p className="text-gray-600">No address provided</p>
                )}
                {phone && <p className="text-gray-700">Phone: {phone}</p>}
              </>
            )}
          </div>

          <div>
            <h3 className="text-lg font-bold text-orange-700 mb-2">
              💳 Payment
            </h3>
            <p className="text-gray-700">{paymentMethod ?? "—"}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <Link
            to="/categories"
            className="bg-orange-500 text-white px-5 py-2 rounded-xl shadow-lg hover:bg-orange-600 transition"
          >
            Continue Shopping
          </Link>

          <Link
            to="/order-history"
            className="bg-gray-700 text-white px-5 py-2 rounded-xl shadow-lg hover:bg-gray-800 transition"
          >
            View Order History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
