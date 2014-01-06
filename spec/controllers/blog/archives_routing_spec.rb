require File.dirname(__FILE__) + '/../../spec_helper'

describe Blog::ArchivesController do
  describe 'route' do
    it 'generates index params' do
      {:get => '/blog/archives'}.should route_to(:controller => 'blog/archives', :action => 'index')
    end
  end
end
