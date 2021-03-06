install:
	gem install bundler && gem install jekyll bundler && bundle install

local_install:
	apt install libxslt-dev libxml2-dev zlib1g-dev && gem install jekyll bundler && bundle install

local_install_arch:
	gem install jekyll bundler && bundle install
	
build:
	rm -rf ./_site/ && bundle exec jekyll build

run:
	bundle exec jekyll serve --incremental --watch

checkBuild:
	sh ./script/cibuild