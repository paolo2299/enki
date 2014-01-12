class HomeController < ApplicationController
  def index
    @welcome_message = "Welcome to pdlawson.com"
    @profile_image_src = "/images/paul-profile-pic.jpg"
    @description = <<-desc
    I'm a software developer living in London, with a passion for technology.
    On this website you'll find my blog, etc. etc. software projects etc etc.
    desc
  end
end
