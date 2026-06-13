# frozen_string_literal: true

source 'https://rubygems.org'

# Pins the local build toolchain so `bundle exec jekyll build` is reproducible.
# GitHub Pages' classic (branch) build uses its own github-pages environment and
# loads jekyll-sitemap from the `plugins:` list in _config.yml, so this Gemfile
# is for local development.
gem 'jekyll', '~> 4.4'

group :jekyll_plugins do
  gem 'jekyll-sitemap', '~> 1.4'
end

# Windows and JRuby do not ship zoneinfo files; bundle tzinfo-data there.
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
