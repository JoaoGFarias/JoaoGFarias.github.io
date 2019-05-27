install:
	gem install jekyll bundler && bundle install

local_install:
	apt install libxslt-dev libxml2-dev zlib1g-dev && gem install jekyll bundler && bundle install

tags: 
	python tag_generator.py
	
build:
	bundle exec jekyll build

run:
	bundle exec jekyll serve --incremental --watch

copy_5_things:
	cp ./_drafts/XXXX-XX-XX-5_things.markdown ./_posts