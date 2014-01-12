module TitleAndHeadingHelper
  def posts_title_parts(tag)
    ["Blog", tag ? tag.to_s.titleize : nil]  
  end

  def post_title_parts(post)
    ["Blog", post.title]
  end

  def archives_title_parts
    ["Blog", "Archives"]
  end

  def page_title_parts(page)
    [page.title]
  end

  def html_title(content)
    if content.present?
      content
    else
      enki_config[:title]
    end
  end

  def page_title(parts)
    compose_title(parts)
  end

  def page_heading(parts)
    compose_heading(parts)
  end

  private

  def augmented_parts(parts)
    ([enki_config[:title]] + parts).compact
  end

  def compose_title(parts)
    augmented_parts(parts).reverse.join(" - ")
  end

  def compose_heading(parts)
    augmented = augmented_parts(parts)
    heading = ""
    heading << "#{augmented.first}" 
    if augmented.second
      heading << ' <span class="subheading"> >> '
      heading << "#{augmented.second} </span>"
    end
    heading.html_safe
  end
end
