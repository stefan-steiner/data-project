class WelcomeController < ApplicationController
	def index
		@addresses = []
		file = File.read('app/assets/monuments.json')
		@monuments = JSON.parse(file)
		@monuments["data"].each do |monument|
			@addresses << monument[10]
		end
	end
	
	def show
	end
end
