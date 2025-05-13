import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";
import LongBanner from "@/Components/LongBanner";
import React, { useState } from "react";

export default function Subscription() {
    // State for selected plan
    const [selectedPlan, setSelectedPlan] = useState("Monthly");
    const [activePaymentMethod, setActivePaymentMethod] = useState("Card");

    // Plan data
    const plans = {
        Monthly: {
            price: 799,
            features: [
                "Exclusive Deals",
                "Early Access Deals",
                "Free Shipping",
            ],
            term: "/month",
        },
        Yearly: {
            price: 7999,
            features: [
                "12 Premium Products",
                "Early Access Deals + 25% Off All Orders",
                "Free Shipping + Gift",
            ],
            term: "/year",
            badge: "Save 15%",
        },
    };

    // Calculate order summary
    const calculateOrderSummary = (plan) => {
        const price = plans[plan].price;
        const tax = (price * 0.18).toFixed(2);
        const total = (price + parseFloat(tax)).toFixed(2);

        return {
            price,
            tax,
            total,
        };
    };

    const orderSummary = calculateOrderSummary(selectedPlan);

    return (
        <>
            <Layout>
                <Head title="Subscription" />
                <LongBanner imagePath={`/banner/sub-banner.jpeg`} />

                <section>
                    <div className="container">
                        <div className="beauty-subscription-page">
                            <div className="subscription-header">
                                <h2>
                                    <i className="fas fa-crown"></i> Premium
                                    Beauty Membership
                                </h2>
                                <p>
                                    Get monthly deliveries of luxury skincare &
                                    makeup + exclusive discounts
                                </p>
                            </div>

                            <div className="subscription-plans">
                                {Object.entries(plans).map(
                                    ([plan, details]) => (
                                        <div
                                            key={plan}
                                            className={`plan-card ${selectedPlan === plan
                                                    ? "active"
                                                    : ""
                                                }`}
                                            onClick={() =>
                                                setSelectedPlan(plan)
                                            }
                                        >
                                            <h3>
                                                {plan}
                                                {details.badge && (
                                                    <span className="badge">
                                                        {details.badge}
                                                    </span>
                                                )}
                                            </h3>
                                            <div className="price">
                                                ₹{details.price}
                                                <span>{details.term}</span>
                                            </div>
                                            <ul>
                                                {details.features.map(
                                                    (feature, index) => (
                                                        <li key={index}>
                                                            <i className="fas fa-check"></i>{" "}
                                                            {feature}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                            <button className="select-btn">
                                                {selectedPlan === plan
                                                    ? "Selected"
                                                    : "Select"}
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>

                            {/* <div className="payment-section">
                                <h3>
                                    <i className="fas fa-credit-card"></i>{" "}
                                    Payment Method
                                </h3>

                                <div className="payment-methods">
                                    <div className="payment-tabs">
                                        {["Card", "UPI", "Net Banking"].map(
                                            (method) => (
                                                <button
                                                    key={method}
                                                    className={
                                                        activePaymentMethod ===
                                                            method
                                                            ? "active"
                                                            : ""
                                                    }
                                                    onClick={() =>
                                                        setActivePaymentMethod(
                                                            method
                                                        )
                                                    }
                                                >
                                                    <i
                                                        className={`fas fa-${method === "Card"
                                                                ? "credit-card"
                                                                : method ===
                                                                    "UPI"
                                                                    ? "mobile-alt"
                                                                    : "university"
                                                            }`}
                                                    ></i>{" "}
                                                    {method}
                                                </button>
                                            )
                                        )}
                                    </div>

                                    <div
                                        className={`payment-form ${activePaymentMethod === "Card"
                                                ? "active"
                                                : ""
                                            }`}
                                    >
                                        <div className="form-group">
                                            <label>Card Number</label>
                                            <input
                                                type="text"
                                                placeholder="1234 5678 9012 3456"
                                            />
                                            <i className="far fa-credit-card"></i>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Expiry</label>
                                                <input
                                                    type="date"
                                                    placeholder="MM/YY"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>CVV</label>
                                                <input
                                                    type="password"
                                                    placeholder="•••"
                                                />
                                                <i className="fas fa-question-circle"></i>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label>Name on Card</label>
                                            <input
                                                type="text"
                                                placeholder="Your Name"
                                            />
                                        </div>
                                    </div>

                                    <div
                                        className={`payment-form ${activePaymentMethod === "UPI"
                                                ? "active"
                                                : ""
                                            }`}
                                    >
                                        <div className="upi-apps">
                                            <button>
                                                <img
                                                    src="https://cdn-icons-png.flaticon.com/512/6124/6124998.png"
                                                    alt="Google Pay"
                                                />
                                            </button>
                                            <button>
                                                <img
                                                    src="https://raw.githubusercontent.com/hdpngworld/HPW/main/uploads/6509eac5314fe-logo.png"
                                                    alt="PhonePe"
                                                />
                                            </button>
                                            <button>
                                                <img
                                                    src="https://cdn.iconscout.com/icon/free/png-256/free-upi-logo-icon-download-in-svg-png-gif-file-formats--unified-payments-interface-payment-money-transfer-logos-icons-1747946.png?f=webp"
                                                    alt="UPI ID"
                                                />
                                            </button>
                                        </div>
                                        <div className="form-group">
                                            <label>UPI ID</label>
                                            <input
                                                type="text"
                                                placeholder="yourname@upi"
                                            />
                                        </div>
                                    </div>

                                    <div
                                        className={`payment-form ${activePaymentMethod ===
                                                "Net Banking"
                                                ? "active"
                                                : ""
                                            }`}
                                    >
                                        <div className="form-group">
                                            <label>Select Bank</label>
                                            <select>
                                                <option value="">
                                                    Choose your bank
                                                </option>
                                                <option value={'hdfc'}>
                                                    HDFC Bank
                                                </option>
                                                <option value={'sbi'}>
                                                    State Bank of India
                                                </option>
                                                <option value={'icici'}>
                                                    ICICI Bank
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="order-summary">
                                    <h4>Order Summary</h4>
                                    <div className="summary-row">
                                        <span>{selectedPlan} Plan</span>
                                        <span>₹{orderSummary.price}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Tax (18%)</span>
                                        <span>₹{orderSummary.tax}</span>
                                    </div>
                                    <div className="summary-row total">
                                        <span>Total</span>
                                        <span>₹{orderSummary.total}</span>
                                    </div>
                                </div>

                            </div> */}
                                <button className="pay-now-btn">
                                    <i className="fas fa-lock"></i> Pay Securely
                                </button>
                                <p className="secure-note">
                                    <i className="fas fa-shield-alt"></i> Your
                                    payment is encrypted and secure.
                                </p>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}