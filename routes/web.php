<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FrontController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', [FrontController::class, 'homePage'])->name('/');
        
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

Route::controller(FrontController::class)->group(function(){
    // Home Page
    Route::get('/', 'homePage')->name('/');

    // Products Page (Multiple Products)
    Route::get('/products/{slug}', 'productsPage')->name('products');

    // Product Page (Single Product)
    Route::get('/product/{slug}', 'productPage')->name('product');

    // Subscription Page
    Route::get('/subscription', 'subscriptionPage')->name('subscription');

    // Search Page 
    Route::get('/search', 'searchPage')->name('search');

    // Cart Page
    Route::get('/cart', 'cartPage')->name('cart');

    // Login Page 
    Route::get('/login', 'loginPage')->name('login');

    // SignUp Page
    Route::get('/signup', 'signupPage')->name('signup');
});

// Route without auth middleware
Route::controller(CustomerController::class)->middleware(['throttle:5,1'])->group(function () {
    Route::post('/customer/register', 'registerCustomer')->name('registerCustomer');
    Route::post('/customer-login', 'customerLogin')->middleware(['throttle:5,1'])->name('customerLogin');
});

// Routes with shared middleware
Route::controller(CustomerController::class)
    ->middleware('auth:customers')
    ->group(function () {
        Route::get('/account', 'accountPage')->name('account');
        Route::get('/logout', 'customerLogout')->name('customerLogout');
    });