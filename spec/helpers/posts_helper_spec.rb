require File.dirname(__FILE__) + '/../spec_helper'
require File.dirname(__FILE__) + '/../factories'

describe PostsHelper do
  include PostsHelper
  include UrlHelper

  before(:each) do
    @post = FactoryGirl.create(:post, :body => "Lorem ipsum.#{Post::TRUNCATE_MARKER}\n\ndolor sit amet, consectetur adipiscing elit.")
  end

  describe '#truncate_body_html' do
    it 'should truncate post body html' do
      strip_tags(truncate_body_html(@post).body_html).should == "Lorem ipsum. Read more..."
    end

    it 'should ensure that truncated post includes a read more link' do
      truncate_body_html(@post).body_html.match('<a href=".*">Read more...</a>').should_not be_nil
    end
  end
end
