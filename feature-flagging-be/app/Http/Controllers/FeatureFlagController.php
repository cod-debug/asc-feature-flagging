<?php

namespace App\Http\Controllers;

use App\Models\FeatureFlagModel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class FeatureFlagController extends Controller
{
    //
    public function create(Request $request): JsonResponse{
        try {
            $validator = Validator::make($request->all(), [
                'display_name' => 'required|min:3',
                'key' => 'required|min:3'
            ]);

            if($validator->fails()){
                return $this->validationError($validator->errors());
            }

            $data = [
                ...$request->all(),
                'user_id' => Auth::user()->id,
                'is_on' => true,
            ];
            
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
            $user_id = $request->get('user_id');
            $feature_flags = FeatureFlagModel::query();

            if($user_id){
                $feature_flags = $feature_flags->where('user_id', $user_id);
            }

            return response()->json($feature_flags);
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
}
