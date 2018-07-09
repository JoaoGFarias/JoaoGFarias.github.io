install:
	gem install jekyll bundler && bundle install

build:
	bundle exec jekyll build

run:
	bundle exec jekyll serve --incremental