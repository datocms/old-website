require 'open-uri'

task :download do
  %w(sma.md ama.md).each do |file|
    if File.exist? file
      File.delete(file)
    end
  end

  File.open("sma.md", "w") do |file|
    file.write open("https://site-api.datocms.com/docs/site-api-documentation.md").read
  end

  File.open("ama.md", "w") do |file|
    file.write open("https://account-api.datocms.com/docs/account-api-documentation.md").read
  end
end
