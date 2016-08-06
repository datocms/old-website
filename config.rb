require 'redcarpet'
require 'rouge'
require 'rouge/plugins/redcarpet'

class RougeRender < Redcarpet::Render::HTML
  include Rouge::Plugins::Redcarpet
end

set :markdown_engine, :redcarpet
set :markdown, fenced_code_blocks: true, smartypants: true, with_toc_data: true

page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

page '/docs/*', layout: "docs"

activate :directory_indexes
activate :syntax

activate :external_pipeline,
  name: :webpack,
  command: build? ?
    "./node_modules/webpack/bin/webpack.js --bail -p" :
    "./node_modules/webpack/bin/webpack.js --watch -d --progress --color",
  source: ".tmp/dist",
  latency: 1

ignore 'fonts/svg/*'
ignore 'templates/*'

data.integrations.tap do |i|
  i.static_site_generators[0..1].each do |ssg|
    proxy(
      "/cms/#{ssg.name.parameterize}/index.html",
      "templates/1_combo_landing.html",
      locals: { ssg: ssg },
      data: { title: "CMS for #{ssg.name} - Admin interface for #{ssg.name} static site generators - DatoCMS" }
    )
    i.continuous_deployment_platforms[0..1].each do |cdp|
      proxy(
        "/cms/#{ssg.name.parameterize}/#{cdp.name.parameterize}/index.html",
        "templates/2_combo_landing.html",
        locals: { cdp: cdp, ssg: ssg },
        data: { title: "CMS for #{ssg.name} deployable on #{cdp.name} - DatoCMS" }
      )
      i.git_hosting_platforms[0..1].each do |ghp|
        proxy(
          "/cms/#{ssg.name.parameterize}/#{cdp.name.parameterize}/#{ghp.name.parameterize}/index.html",
          "templates/3_combo_landing.html",
          locals: { cdp: cdp, ssg: ssg, ghp: ghp },
          data: { title: "CMS for #{ssg.name}, deploy with #{ghp.name} and #{cdp.name} - DatoCMS" }
        )
      end
    end
  end
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
end
