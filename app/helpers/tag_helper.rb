module TagHelper
  def linked_tag_list(tags)
    raw tags.collect {|tag| link_to(tag.name, blog_posts_path(:tag => tag.name))}.join(", ")
  end
end
