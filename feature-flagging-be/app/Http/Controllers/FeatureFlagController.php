<?php

namespace App\Http\Controllers;

use App\Models\FeatureFlagModel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use function PHPUnit\Framework\isNull;

class FeatureFlagController extends Controller
{
    //
    public function create(Request $request): JsonResponse{
        try {
            $validator = Validator::make($request->all(), [
                'display_name' => 'required|min:3'
            ]);

            if($validator->fails()){
                return $this->validationError($validator->errors());
            }
            $data = [
                ...$request->all(),
                'user_id' => Auth::user()->id,
                'is_on' => false,
            ];

            if(empty($data['key']) || !$data['key'] || isNull($data['key'])){
                $data['key'] = strtolower(str_replace(' ', '_', $data['display_name']));
            }
            
            // avoid key duplication
            if(FeatureFlagModel::where('key', $data['key'])->first()){
                return response()->json([
                    'message' => 'Duplicate entry. Key already exist please try something else.'
                ], 400);
            }

            FeatureFlagModel::create($data);

            return response()->json([
                'message' => 'Successfully created feature flag.'
            ]);
        } catch (\Exception $e) {
            return $this->serverError($e);
        }
    }

    public function getFeatureFlags(Request $request): JsonResponse{
        try {
            $limit = $request->get('limit') ?? 10;
            $keyword = $request->get('keyword') ?? '';
            
            $user_id = $request->get('user_id');
            $feature_flags = FeatureFlagModel::query();

            if($user_id){
                $feature_flags = $feature_flags->where('user_id', $user_id);
            }

            if($keyword){
                $feature_flags->where(function($query) use ($keyword) {
                    $query->where('display_name', 'LIKE', '%'. $keyword .'%')
                    ->orWhere('key', 'LIKE', '%'. $keyword .'%');
                });
            }
            
            return response()->json($feature_flags->orderBy('display_name', 'asc')->paginate($limit));
        } catch (\Exception $e) {
            return $this->serverError($e);
        }
    }

    public function getPublicFeatureFlags(Request $request){
        try {
            $user_id = $request->get('user_id');
            $feature_flags = FeatureFlagModel::query();

            if($user_id){
                $feature_flags = $feature_flags->where('user_id', $user_id);
            }

            $features = $feature_flags->get()->reduce(function ($carry, $item) {
                $carry[$item->key] = $item->is_on === 1 ? true : false;
                return $carry;
            }, []);
            
            return response()->json($features);
        } catch (\Exception $e) {
            return $this->serverError($e);
        }
    }

    public function toggleFeatureFlag($id): JsonResponse  {
        try {
            $feature_flag = FeatureFlagModel::find($id);

            if(!$feature_flag){
                return response()->json([
                    'message' => 'Feature not found.'
                ], 404);
            }

            $feature_flag->is_on = !$feature_flag->is_on;
            $feature_flag->save();

            return response()->json([
                'message' => 'Successfully updated feature flag status.'
            ]);
        } catch (\Exception $e) {
            return $this->serverError($e);
        }
    }

    public function update(Request $request, $id): JsonResponse{
        try {
            $feature_flag = FeatureFlagModel::find($id);

            if(!$feature_flag){
                return response()->json([
                    'message' => 'Feature not found.'
                ], 404);
            }

            $feature_flag->update($request->all());

            return response()->json([
                'message' => 'Successfully updated feature flag.'
            ]);
        } catch (\Exception $e) {
            return $this->serverError($e);
        }
    }

    public function delete($id): JsonResponse{
        try {
            $feature_flag = FeatureFlagModel::find($id);

            if(!$feature_flag){
                return response()->json([
                    'message' => 'Feature not found.'
                ], 404);
            }

            $feature_flag->delete();

            return response()->json([
                'message' => 'Successfully deleted feature flag.'
            ]);
        } catch (\Exception $e) {
            return $this->serverError($e);
        }
    }
}
