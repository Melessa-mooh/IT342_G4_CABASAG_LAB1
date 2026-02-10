package com.miniapp.mobile

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.miniapp.mobile.databinding.ActivityRegisterBinding
import com.miniapp.mobile.models.RegisterRequest
import com.miniapp.mobile.network.ApiConfig
import kotlinx.coroutines.launch

class RegisterActivity : AppCompatActivity() {
    private lateinit var binding: ActivityRegisterBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnRegister.setOnClickListener {
            val firstname = binding.etFirstname.text.toString().trim()
            val lastname = binding.etLastname.text.toString().trim()
            val username = binding.etUsername.text.toString().trim()
            val email = binding.etEmail.text.toString().trim()
            val password = binding.etPassword.text.toString()
            val confirmPassword = binding.etConfirmPassword.text.toString()

            if (validateInput(firstname, lastname, username, email, password, confirmPassword)) {
                performRegister(firstname, lastname, username, email, password, confirmPassword)
            }
        }

        binding.tvLogin.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
        }
    }

    private fun validateInput(
        firstname: String,
        lastname: String,
        username: String,
        email: String,
        password: String,
        confirmPassword: String
    ): Boolean {
        if (firstname.isEmpty()) {
            binding.etFirstname.error = "Firstname is required"
            return false
        }
        if (lastname.isEmpty()) {
            binding.etLastname.error = "Lastname is required"
            return false
        }
        if (email.isEmpty()) {
            binding.etEmail.error = "Email is required"
            return false
        }
        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            binding.etEmail.error = "Invalid email format"
            return false
        }
        if (password.length < 8) {
            binding.etPassword.error = "Password must be at least 8 characters"
            return false
        }
        if (!password.matches(".*[A-Z].*".toRegex())) {
            binding.etPassword.error = "Password must contain an uppercase letter"
            return false
        }
        if (!password.matches(".*[a-z].*".toRegex())) {
            binding.etPassword.error = "Password must contain a lowercase letter"
            return false
        }
        if (!password.matches(".*[0-9].*".toRegex())) {
            binding.etPassword.error = "Password must contain a number"
            return false
        }
        if (password != confirmPassword) {
            binding.etConfirmPassword.error = "Passwords do not match"
            return false
        }
        return true
    }

    private fun performRegister(
        firstname: String,
        lastname: String,
        username: String,
        email: String,
        password: String,
        confirmPassword: String
    ) {
        binding.btnRegister.isEnabled = false
        binding.btnRegister.text = "Registering..."

        lifecycleScope.launch {
            try {
                val request = RegisterRequest(
                    firstname, lastname, username.ifEmpty { null },
                    email, password, confirmPassword
                )
                val response = ApiConfig.apiService.register(request)

                if (response.isSuccessful) {
                    val authResponse = response.body()
                    if (authResponse?.error != null) {
                        Toast.makeText(this@RegisterActivity, authResponse.error, Toast.LENGTH_LONG).show()
                    } else {
                        Toast.makeText(this@RegisterActivity, "Registration successful!", Toast.LENGTH_SHORT).show()
                        val user = authResponse?.user
                        val intent = Intent(this@RegisterActivity, DashboardActivity::class.java).apply {
                            putExtra("firstname", user?.firstname)
                            putExtra("lastname", user?.lastname)
                            putExtra("username", user?.username)
                            putExtra("email", user?.email)
                        }
                        startActivity(intent)
                        finish()
                    }
                } else {
                    Toast.makeText(this@RegisterActivity, "Registration failed: ${response.message()}", Toast.LENGTH_LONG).show()
                }
            } catch (e: Exception) {
                Toast.makeText(this@RegisterActivity, "Network error: ${e.message}", Toast.LENGTH_LONG).show()
            } finally {
                binding.btnRegister.isEnabled = true
                binding.btnRegister.text = "Register"
            }
        }
    }
}
