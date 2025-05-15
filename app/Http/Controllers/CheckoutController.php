<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ShippingDetail;
use Razorpay\Api\Api;
use Razorpay\Api\Errors\SignatureVerificationError;

class CheckoutController extends Controller
{
    public function addCart(Request $request){
        $order = Order::create([
            'customer_id' => auth('customers')->id(),
            'total_price' => $request->total_price,
            'status' => 'pending',
        ]);

        foreach ($request->cart as $cartItem) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $cartItem['product_id'],
                'color_id' => $cartItem['color_id'],
                'quantity' => $cartItem['quantity'],
                'price' => $cartItem['price'],
            ]);
        }
        return response()->json([
            'order_id' => $order->id,
        ]);
    }

    public function shipping(Request $request){
        $orderId = $request->query('order_id');

        session(['order_id' => $orderId]);

        return Inertia::render('Shipping', [
            'order_id' => $orderId,
        ]);
    }

    public function checkout(Request $request){
        $validated = $request->validate([
            'name' => 'required|string',
            'phone' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'pincode' => 'required|string',
            'state' => 'required|string',
        ]);

        // fetch order id from session 
        $orderId = session('order_id');

        if (!$orderId) {
            // return response()->json(['error' => 'No order found in session.'], 400);
            return Inertia::render('Cart');
        }

        $order = Order::where('id', $orderId)
            ->where('customer_id', auth('customers')->id())
            ->first();

        ShippingDetail::create([
            'order_id' => $order->id,
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'address' => $validated['address'],
            'city' => $validated['city'],
            'pincode' => $validated['pincode'],
            'state' => $validated['state'],
        ]);

        if (!$order) {
            return Inertia::render('Cart')->with('error', 'Unauthorized or invalid order.');
        }

        $totalAmount = $order->total_price;
        $amountInPaise = $totalAmount * 100;
        $api = new Api(config('services.razorpay.key'), config('services.razorpay.secret'));
        $order = $api->order->create([
            'amount' => $amountInPaise,
            'currency' => 'INR',
            'receipt' => 'order_'.$order->id,
        ]);

        return Inertia::render('Checkout', [
            'razorpay' => [
                'key' => config('services.razorpay.key'),
                'order_id' => $order->id,
                'amount' => $amountInPaise,
                'name' => $validated['name'],
                'email' => auth('customers')->user()->email,
                'contact' => $validated['phone'],
                'callback_url' => route('payment.verify')
            ]
        ]);
    }

    public function verifyPayment(Request $request)
    {
        $validated = $request->validate([
            'razorpay_payment_id' => 'required',
            'razorpay_order_id' => 'required',
            'razorpay_signature' => 'required'
        ]);

        $api = new Api(config('services.razorpay.key'), config('services.razorpay.secret'));

        try {
            $api->utility->verifyPaymentSignature([
                'razorpay_payment_id' => $validated['razorpay_payment_id'],
                'razorpay_order_id' => $validated['razorpay_order_id'],
                'razorpay_signature' => $validated['razorpay_signature']
            ]);

            // Update order status
            $order = Order::where('razorpay_order_id', $validated['razorpay_order_id'])->first();
            $order->update(['status' => 'paid']);

            return redirect()->route('order.success');

        } catch (SignatureVerificationError $e) {
            return redirect()->route('payment.failed');
        }
    }
}
