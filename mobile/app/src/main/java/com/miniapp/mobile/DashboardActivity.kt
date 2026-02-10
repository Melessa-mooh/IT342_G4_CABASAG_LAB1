package com.miniapp.mobile

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.miniapp.mobile.databinding.ActivityDashboardBinding

class DashboardActivity : AppCompatActivity() {
    private lateinit var binding: ActivityDashboardBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDashboardBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val firstname = intent.getStringExtra("firstname") ?: ""
        val lastname = intent.getStringExtra("lastname") ?: ""
        val username = intent.getStringExtra("username") ?: ""
        val email = intent.getStringExtra("email") ?: ""

        binding.tvWelcome.text = "Hi $firstname! 👋"
        binding.tvFirstname.text = firstname
        binding.tvLastname.text = lastname
        binding.tvUsername.text = "@$username"
        binding.tvEmail.text = email.ifEmpty { "Not provided" }

        val initials = "${firstname.firstOrNull() ?: ""}${lastname.firstOrNull() ?: ""}"
        binding.tvAvatar.text = initials.uppercase()

        binding.btnLogout.setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
            finishAffinity()
        }
    }
}
