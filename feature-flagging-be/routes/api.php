<?php
use App\Http\Controllers\FeatureFlagController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('login', function(){
    return response()->json(['Unauthorized user.'], 401);
})->name('login');

Route::prefix('v1')->group(function() {    
    Route::prefix('auth')->group(function(){
        Route::post('login', [AuthController::class, 'login']);
    });
    
    Route::prefix('feature')->middleware('auth:sanctum')->group(function() {
        Route::post('', [FeatureFlagController::class, 'create']);
        Route::get('/{id}', [FeatureFlagController::class, 'getFeatureFlags']);
        Route::put('/{id}', [FeatureFlagController::class, 'update']);
        Route::put('toggle/{id}', [FeatureFlagController::class, 'toggleFeatureFlag']);
    });
});
