<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function registerCustomer(Request $request){
        if($request->filled('company')){
            abort(403, 'Bot Detected');
        }

        $request->request->remove('company');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'contact' => 'required|numeric|digits:10|regex:/^[1-9]\d{9}$/',
            'password' => 'required|string|min:6|max:255',
            'confirm_password' => 'required|string|same:password'
        ]);

        $customer = Customer::create([
            'name' => $validated['name'],
            'contact' => $validated['contact'],
            'password' => $validated['password'],
        ]);

        Auth::guard('customers')->login($customer);

        return redirect()->route('/');
    }

    public function accountPage(){
        $customer = Auth::guard('customers')->user();
        return Inertia::render('Account', [
            'customer' => $customer
        ]);
    }

    public function customerLogout(){
        Auth::guard('customers')->logout();
        return redirect()->route('/');
    }

    public function customerLogin(Request $request){
        if($request->filled('company')){
            abort(403, 'Bot Detected');
        }

        $validated = $request->validate([
            'contact' => 'required|numeric|digits:10|regex:/^[1-9]\d{9}$/',
            'password' => 'required|string|min:6|max:255',
        ]);


        if (Auth::guard('customers')->attempt([
            'contact' => $validated['contact'],
            'password' => $validated['password'],
        ])) {
            $request->session()->regenerate();
            return redirect()->intended(route('/'));
        }

        return back()->withErrors([
            'contact' => 'The provided credentials do not match our records.',
        ])->onlyInput('contact');
    }
}
