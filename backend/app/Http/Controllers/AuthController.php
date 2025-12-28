<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct() {}

    public function register(Request $request)
    {
        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = Auth::guard('api')->login($user);
        $cookie = cookie('jwt', $token, 60 * 24, null, null, false, true);

        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
        ])->withCookie($cookie);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::guard('api')->attempt($credentials);
        
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid email or password',
            ], 401);
        }

        $user = Auth::guard('api')->user();
        $cookie = cookie('jwt', $token, 60 * 24, null, null, false, true); // HttpOnly=true

        return response()->json([
                'status' => 'success',
                'message' => 'User logged in successfully',
                'user' => $user,
            ])->withCookie($cookie);
    }

    public function logout()
    {
        Auth::guard('api')->logout();
        $cookie = cookie()->forget('jwt');
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ])->withCookie($cookie);
    }

    public function refresh()
    {
        $token = Auth::guard('api')->refresh();
        $cookie = cookie('jwt', $token, 60 * 24, null, null, false, true);

        return response()->json([
            'status' => 'success',
            'message' => 'Token refreshed successfully',
            'user' => Auth::guard('api')->user(),
        ])->withCookie($cookie);
    }
}