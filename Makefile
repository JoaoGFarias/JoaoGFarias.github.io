install:
	gem install jekyll bundler && bundle install

tags: 
	python tag_generator.py
	
build:
	bundle exec jekyll build

run:
	bundle exec jekyll serve --incremental