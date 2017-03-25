require 'redcarpet'
require 'rouge'
require 'rouge/plugins/redcarpet'

class RougeRender < Redcarpet::Render::HTML
  include Rouge::Plugins::Redcarpet

  def block_code(code, language)
    buf = "<div class='code-snippet'>"

    if language
      buf << "<div class='code-snippet__language'>#{language.titleize}</div>"
    end

    buf << "<div class='code-snippet__code'>"
    buf << super
    buf << "</div>"
    buf << "</div>"

    buf
  end
end

set :markdown_engine, :redcarpet
set :markdown, fenced_code_blocks: true, smartypants: true, with_toc_data: true

page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false
page '/docs/*', layout: "docs"

activate :directory_indexes
activate :dato
activate :pagination

activate :external_pipeline,
  name: :webpack,
  command: build? ?
    "./node_modules/webpack/bin/webpack.js --bail -p" :
    "./node_modules/webpack/bin/webpack.js --watch -d --progress --color",
  source: ".tmp/dist",
  latency: 1

ignore 'fonts/svg/*'
ignore 'templates/*'
ignore 'redirects.txt'

proxy("/_redirects", "redirects.txt")

data.integrations.tap do |i|
  metadata = {
    cta: {
      title: "Sounds interesting?",
      description: "DatoCMS makes it fun & easy to use static website generators with your non-techie clients and editors. Join thousands of happy developers and set up your first site with DatoCMS right away!",
      button: "Try it now for free",
      url: "http://dashboard.datocms.com/register"
    }

  }
  i.static_site_generators.each do |ssg|
    proxy(
      "/cms/#{ssg.name.parameterize}/index.html",
      "templates/1_combo_landing.html",
      locals: { ssg: ssg },
      data: metadata.merge(title: "CMS for #{ssg.name} - Admin interface for #{ssg.name} static site generators - DatoCMS")
    )
    i.continuous_deployment_platforms.each do |cdp|
      proxy(
        "/cms/#{ssg.name.parameterize}/#{cdp.name.parameterize}/index.html",
        "templates/2_combo_landing.html",
        locals: { cdp: cdp, ssg: ssg },
        data: metadata.merge(title: "CMS for #{ssg.name} deployable on #{cdp.name} - DatoCMS")
      )
      i.git_hosting_platforms.each do |ghp|
        proxy(
          "/cms/#{ssg.name.parameterize}/#{cdp.name.parameterize}/#{ghp.name.parameterize}/index.html",
          "templates/3_combo_landing.html",
          locals: { cdp: cdp, ssg: ssg, ghp: ghp },
          data: metadata.merge(title: "CMS for #{ssg.name}, deploy with #{ghp.name} and #{cdp.name} - DatoCMS")
        )
      end
    end
  end
end

blog_posts = dato.
  blog_posts.
  select(&:publication_date).
  sort_by(&:publication_date).
  reverse

paginate blog_posts, "/blog", "/templates/blog_index.html"

blog_posts.each do |blog_post|
  proxy(
    "/blog/#{blog_post.slug}/index.html",
    "templates/blog_post.html",
    locals: { blog_post: blog_post }
  )
end

configure :development do
  activate :livereload
end

configure :build do
  activate :minify_css
  activate :minify_javascript
end

helpers do
  def api_toc(filepath)
    markdown_content = File.read(filepath)
    markdown_content.gsub!(/<a.*?<\/a>/, '')

    Redcarpet::Markdown.new(
      Redcarpet::Render::HTML_TOC.new(nesting_level: 3)
    ).render(markdown_content)
  end

  def api_content(filepath)
    markdown_content = File.read(filepath)

    markdown_content.gsub! /```bash\n\$ curl.*?```/m do |foo|
      foo.gsub! /\n```$/, " \\\n  -H \"Accept: application/json\" \\\n  -H \"Authorization: Bearer XXXX\"\n```"
    end

    markdown_content.gsub! /^\|.*\|$/ do |foo|
      foo.gsub(/\*\*\[(.*?)\]\((.*?)\)\*\*/, '[`\1`](\2)').gsub /\*\*/, "`"
    end

    html_body = Redcarpet::Markdown.new(
      RougeRender.new(with_toc_data: true),
      tables: true,
      fenced_code_blocks: true,
    ).render(markdown_content)
  end

  def active_link_to(*args)
    options = args.extract_options!
    if url_for(current_page.url) == url_for(args.last)
      options[:class] ||= ""
      options[:class] += " is-active"
    end
    link_to *args, options
  end

  def markdown(text)
    Redcarpet::Markdown.new(
      RougeRender.new,
      tables: true,
      fenced_code_blocks: true,
    ).render(text)
  end
end
