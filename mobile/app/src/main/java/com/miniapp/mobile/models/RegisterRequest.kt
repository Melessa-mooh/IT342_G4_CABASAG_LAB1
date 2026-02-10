package com.miniapp.mobile.models

data class RegisterRequest(
    val firstname: String,
    val lastname: String,
    val username: String,
    val email: String?,
    val password: String,
    val confirmPassword: String
)
