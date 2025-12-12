<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\SchoolProfile;
use Illuminate\Http\Request;

class ArticlePublicController extends Controller
{
    public function index(Request $request)
    {
        $schoolProfile = SchoolProfile::first();
        $category = $request->query('category');
        
        $query = Article::where('status', 'published')
            ->orderBy('published_at', 'desc');
        
        if ($category) {
            $query->where('category', $category);
        }
        
        $articles = $query->paginate(12);
        
        return inertia('Articles/Index', [
            'schoolProfile' => $schoolProfile,
            'articles' => $articles,
            'currentCategory' => $category,
        ]);
    }

    public function show($slug)
    {
        $schoolProfile = SchoolProfile::first();
        $article = Article::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();
        
        // Get related articles (same category, exclude current)
        $relatedArticles = Article::where('status', 'published')
            ->where('category', $article->category)
            ->where('id', '!=', $article->id)
            ->orderBy('published_at', 'desc')
            ->take(3)
            ->get();
        
        return inertia('Articles/Show', [
            'schoolProfile' => $schoolProfile,
            'article' => $article,
            'relatedArticles' => $relatedArticles,
        ]);
    }
}
