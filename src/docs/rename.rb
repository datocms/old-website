(Dir.glob("**/") - Dir.glob("images/**/")).each do |dir|
  if dir != "deployment/"
    files = Dir.glob("#{dir}*.md")
    files.map do |file|
      puts file

      content = File.read(file)

      copyFrom = content.match(/copyFrom: (.*)$/)

      position = if copyFrom
        content = File.read(copyFrom[1])
      end

      match = content.match(/position: ([0-9]+)/)

      basename = File.basename(file)
      dirname = File.dirname(file)
      newFile = dirname + "/" + match[1].rjust(2, "0") + "_" + basename

      File.rename(file, newFile)

    end
  end
end

