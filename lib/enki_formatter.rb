class EnkiFormatter
  class << self
    def format_as_xhtml(text)
      Lesstile.format_as_xhtml(
        text,
        :text_formatter => lambda {|text| CGI::unescapeHTML(text)},
        :code_formatter => Lesstile::CodeRayFormatter
      )
    end
  end
end
