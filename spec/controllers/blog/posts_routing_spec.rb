require File.dirname(__FILE__) + '/../../spec_helper'

describe Blog::PostsController do
  describe "route" do
    it "should generate index params" do
      {:get => "/blog"}.should route_to(:controller => "blog/posts", :action => "index", :format => nil)
      {:get => "/blog/posts.atom"}.should route_to(:controller => "blog/posts", :action => "index", :format => "atom")
    end

    it "should generate tag params" do
      {:get => "/blog/code"}.should route_to(:controller => "blog/posts", :action => "index", :tag => "code", :format => nil)
      {:get => "/blog/code.atom"}.should route_to(:controller => "blog/posts", :action => "index", :tag => "code", :format => "atom")
    end

    it "should generate the correct params when the tag name contains a dot character" do
      {:get => "/blog/enki.o"}.should route_to(:controller => "blog/posts", :action => "index", :tag => "enki.o", :format => nil)
      {:get => "/blog/enki.o.atom"}.should route_to(:controller => "blog/posts", :action => "index", :tag => "enki.o", :format => "atom")
    end

    it "should route /pages to posts#index with tag posts" do
      {:get => "/blog/posts"}.should route_to(:controller => "blog/posts", :action => "index", :tag => "posts", :format => nil)
    end

    it "should generate show params" do
      {:get => "blog/2008/02/01/a-post"}.should route_to(:controller => "blog/posts", :action => "show", :year => "2008", :month => "02", :day => "01", :slug => "a-post")
    end
  end
end
