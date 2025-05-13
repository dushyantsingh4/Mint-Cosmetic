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
        $products = Product::with([
            'productColors.color',
            'productColors.images',
            'productColors.previewImages'
        ])
        ->where('category_id', 6)
        ->get();
        $featuredCategories = Category::where('category_type', 'featured')
            ->with([
                'products.productColors.color',
                'products.productColors.images',
                'products.productColors.previewImages'
            ])
            ->get();
        $featuredProducts = $featuredCategories->flatMap(function ($category) {
            return $category->products;
        });
        $nproducts = Product::with([
            'productColors.color',
            'productColors.images',
            'productColors.previewImages'
        ])
        ->orderBy('id', 'desc')
        ->limit(6)
        ->get();
        $lipProducts = Product::with([
            'productColors.color',
            'productColors.images',
            'productColors.previewImages'
        ])
            ->whereIn('category_id', [6, 8, 9, 10, 11])
            ->get();
        $faceProducts = Product::with([
            'productColors.color',
            'productColors.images',
            'productColors.previewImages'
        ])
            ->whereIn('category_id', [12, 13, 14, 15])
            ->get();
        $transformProducts = function ($productCollection) {
            return $productCollection->map(function ($product) {
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
        };
        return Inertia::render('Home', [
            'categories' => $categories,
            'banners' => $banners,
            'products' => $transformProducts($products),
            'newProducts' => $transformProducts($nproducts),
            'featuredProducts' => $transformProducts($featuredProducts),
            'lipProducts' => $transformProducts($lipProducts),
            'faceProducts' => $transformProducts($faceProducts),
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
        $products = Product::with([
            'productColors.color',
            'productColors.images',
            'productColors.previewImages'
        ])->where('product_name', 'like', "%$query%")->get();

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

        return Inertia::render('Search', [
        'query' => $query,
        'products' => $transformedProducts
        ]);
    }

    public function productsPage($slug, $productSlug = null)
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
            'subProduct' => $productSlug,
        ]);
    }

    public function productPage($slug)
    {
        $product = Product::with([
            'productColors.color',
            'productColors.images',
            'reviews.customer',
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
            'reviews' => $product->reviews()->approved()->with('customer')->get()->map(function ($review){
                return [
                    'title' => $review->title,
                    'rating' => $review->rating,
                    'comment' => $review->comment,
                    'verified_purchase' => $review->verified_purchase,
                    'customer' => $review->customer->name ?? 'Anonymous',
                    'avatar' => $review->customer->profile_image,
                    'created_at' => $review->created_at->toDateString(),
                ];
            })
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

    public function giftingPage(){
        return Inertia::render('Gifting');
    }
}
