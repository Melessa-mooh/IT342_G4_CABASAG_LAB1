package com.miniapp.mobile.network

import com.miniapp.mobile.models.AuthResponse
import com.miniapp.mobile.models.LoginRequest
import com.miniapp.mobile.models.RegisterRequest
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

interface ApiService {
    @POST("register")
    suspend fun register(@Body request: RegisterRequest): Response<AuthResponse>
    
    @POST("login")
    suspend fun login(@Body request: LoginRequest): Response<AuthResponse>
}
