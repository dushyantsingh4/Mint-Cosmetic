<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class FrontController extends Controller
{
    public function homePage()
    {
        $categories = Category::where('category_type', 'standard')
            ->where('show_in_menu', true)
            ->limit(5)
            ->get(['category_name', 'slug']);
        $banners = Banner::where('page', 'home')->get();
        $products = Product::all();
        return Inertia::render('Home', [
            'categories' => $categories,
            'banners' => $banners,
            'products' => $products,
        ]);
    }

    public function subscriptionPage()
    {
        return Inertia::render('Subscription');
    }

    public function searchPage(Request $request)
    {
        $validated = $request->validate([
            'q' => ['required', 'string', 'min:2', 'max:100'],
        ]);

        $query = $validated['q'];
        $products = Product::where('product_name', 'like', "%$query%")->get();
        return Inertia::render('Search', [
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
            'productColors.color',
            'productColors.images',
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
                    'stock_quantity' => $product->stock_quantity,
                    'category_id' => $product->category_id,
                    'colors' => $product->productColors->map(function ($productColor) {
                        return [
                            'color_id' => $productColor->color->id,
                            'name' => $productColor->color->name,
                            'hex_code' => $productColor->color->hex_code,
                            'images' => $productColor->previewImages->map(function ($image) {
                                return [
                                    'url' => $image->image,
                                ];
                            }),
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
            'productColors.color',
            'productColors.images'
        ])->where('slug', $slug)->firstOrFail();

        return Inertia::render('Product', [
            'product' => $product,
            'colors' => $product->productColors->map(function ($productColor) {
                return [
                    'color_id' => $productColor->color->id,
                    'name' => $productColor->color->name,
                    'hex_code' => $productColor->color->hex_code,
                    'images' => $productColor->images->map(function ($image) {
                        return [
                            'url' => $image->image,
                        ];
                    }),
                ];
            }),
        ]);
    }

    public function cartPage()
    {
        return Inertia::render('Cart');
    }

    public function loginPage()
    {
        return Inertia::render('Login');
    }

    public function signupPage(){
        return Inertia::render('Signup');
    }
}
