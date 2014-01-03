# Be sure to restart your server when you modify this file.

if Rails.env.development? || Rails.env.test?
  Enki::Application.config.secret_key_base = SecureRandom.hex(20)
else
  secret_key_base = ENV['SECRET_KEY_BASE']
  if secret_key_base.nil? || secret_key_base.length < 30
    Rails.logger.warn("WARNING: secret_key_base cannot be loaded - this is OK during compilation but not during app startup")
  else
    Rails.logger.info("secret_key_base loaded successfully")
  end
  Enki::Application.config.secret_key_base = secret_key_base
end
