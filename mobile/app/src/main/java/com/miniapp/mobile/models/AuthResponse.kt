package com.miniapp.mobile.models

data class AuthResponse(
    val token: String? = null,
    val user: User? = null,
    val error: String? = null
)
