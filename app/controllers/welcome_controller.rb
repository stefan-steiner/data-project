class WelcomeController < ApplicationController
	def index
		@addresses = []
		@count = 0
		file = File.read('app/assets/monuments.json')
		@monuments = JSON.parse(file)
		@monuments["data"].each do |monument|
			@count += 1
			@addresses << monument[10]
		gon.count = @count
		gon.addresses = @addresses
		end
	end
	
	def show
	end
end
