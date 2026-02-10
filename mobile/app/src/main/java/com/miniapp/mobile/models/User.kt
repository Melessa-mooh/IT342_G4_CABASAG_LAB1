package com.miniapp.mobile.models

data class User(
    val id: Long? = null,
    val firstname: String,
    val lastname: String,
    val username: String,
    val email: String?
)
