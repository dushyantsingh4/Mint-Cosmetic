<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class FrontController extends Controller
{
    public function homePage(){
        $categories = Category::where('category_type', 'standard')
        ->where('show_in_menu', true)
        ->limit(5)
        ->get(['category_name', 'slug']);
        $banners = Banner::where('page', 'home')->get();
        $products = Product::all();
        return Inertia::render('Home',[
            'categories' => $categories,
            'banners' => $banners,
            'products' => $products,
        ]);
    }

    public function subscriptionPage(){
        return Inertia::render('Subscription');
    }

    public function searchPage(Request $request){
        $validated = $request->validate([
            'q' => ['required', 'string', 'min:2', 'max:100'],
        ]);
    
        $query = $validated['q'];
        $products = Product::where('product_name', 'like', "%$query%")->get();
        return Inertia::render('Search',[
            'query' => $query,
            'products' => $products
        ]);
    }

        public function productsPage($slug)
        {
            $currentCategory = Category::where('slug', $slug)->firstOrFail();
        
            $parentCategory = Category::find($currentCategory->parent_id) ?? $currentCategory;
        
            $childCategoryIds = Category::where('parent_id', $parentCategory->id)->pluck('id');
        
            $childCategorys = Category::whereIn('id', $childCategoryIds)->get();
        
            $allCategoryIds = $childCategoryIds->push($parentCategory->id);
        
            $products = Product::with([
                'colors',
                'productColors.color',
                'productColors.previewImages'
            ])
            ->whereIn('category_id', $allCategoryIds)
            ->get();
        
            $transformedProducts = $products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'product_name' => $product->product_name,
                    'slug' => $product->slug,
                    'price' => $product->price,
                    'discount_price' => $product->discount_price,
                    'image' => $product->image,
                    'stock_quantity' => $product->stock_quantity,
                    'category_id' => $product->category_id,
                    'colors' => $product->colors,
                    'colorImage' => $product->colors->map(function ($color) {
                        return [
                            'color' => $color,
                            'images' => $color->previewImages,
                        ];
                    }),
                ];
            });
        
            return Inertia::render('Products', [
                'category' => $parentCategory,
                'subCategory' => $childCategorys,
                'products' => $transformedProducts,
            ]);
        }

    public function productPage($slug)
    {
        $product = Product::with([
            'colors', 
            'productColors.images', 
            'productColors.color'
        ])->where('slug', $slug)->firstOrFail();
    
        return Inertia::render('Product', [
            'product' => $product,
            'colors' => $product->colors,
            'colorImage' => $product->colors->map(function ($color) {
                return [
                    'color' => $color,
                    'images' => $color->images,
                ];
            }),
        ]);
    }

    public function cartPage(){
        return Inertia::render('Cart');
    }

    public function loginPage(){
        return Inertia::render('Login');
    }
}
