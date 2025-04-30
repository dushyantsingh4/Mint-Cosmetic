<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FrontController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', [FrontController::class, 'homePage'])->name('/');
        
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/products/{slug}', [FrontController::class, 'productsPage'])->name('products');

Route::get('/product/{slug}', [FrontController::class, 'productPage'])->name('product');

Route::get('/subscription', [FrontController::class, 'subscriptionPage'])->name('subscription');

Route::get('/search', [FrontController::class, 'searchPage'])->name('search');

Route::get('/cart', [FrontController::class, 'cartPage'])->name('cart');

Route::get('/login', [FrontController::class, 'loginPage'])->name('login');
