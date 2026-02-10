package com.miniapp.mobile

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.miniapp.mobile.databinding.ActivityLoginBinding
import com.miniapp.mobile.models.LoginRequest
import com.miniapp.mobile.network.ApiConfig
import kotlinx.coroutines.launch

class LoginActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnLogin.setOnClickListener {
            val usernameOrEmail = binding.etUsername.text.toString().trim()
            val password = binding.etPassword.text.toString()

            if (validateInput(usernameOrEmail, password)) {
                performLogin(usernameOrEmail, password)
            }
        }

        binding.tvRegister.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
            finish()
        }
    }

    private fun validateInput(usernameOrEmail: String, password: String): Boolean {
        if (usernameOrEmail.isEmpty()) {
            binding.etUsername.error = "Username or Email is required"
            return false
        }
        if (password.isEmpty()) {
            binding.etPassword.error = "Password is required"
            return false
        }
        return true
    }

    private fun performLogin(usernameOrEmail: String, password: String) {
        binding.btnLogin.isEnabled = false
        binding.btnLogin.text = "Logging in..."

        lifecycleScope.launch {
            try {
                val request = LoginRequest(usernameOrEmail, password)
                val response = ApiConfig.apiService.login(request)

                if (response.isSuccessful) {
                    val authResponse = response.body()
                    if (authResponse?.error != null) {
                        Toast.makeText(this@LoginActivity, authResponse.error, Toast.LENGTH_LONG).show()
                    } else {
                        val user = authResponse?.user
                        val intent = Intent(this@LoginActivity, DashboardActivity::class.java).apply {
                            putExtra("firstname", user?.firstname)
                            putExtra("lastname", user?.lastname)
                            putExtra("username", user?.username)
                            putExtra("email", user?.email)
                        }
                        startActivity(intent)
                        finish()
                    }
                } else {
                    Toast.makeText(this@LoginActivity, "Login failed: ${response.message()}", Toast.LENGTH_LONG).show()
                }
            } catch (e: Exception) {
                Toast.makeText(this@LoginActivity, "Network error: ${e.message}", Toast.LENGTH_LONG).show()
            } finally {
                binding.btnLogin.isEnabled = true
                binding.btnLogin.text = "Login"
            }
        }
    }
}
