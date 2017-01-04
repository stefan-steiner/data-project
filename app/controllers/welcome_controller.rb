class WelcomeController < ApplicationController
	def index
		# parse data for all addresses as strings
		@addresses = []
		@count = 0
		file = File.read('app/assets/monuments.json')
		@monuments = JSON.parse(file)
		@monuments["data"].each do |monument|
			@count += 1
			@addresses << monument[10]
		end
		gon.count = @count
		gon.addresses = @addresses

		# find all monument pairs
		@pairs = []
		(0..@count-2).each do |i|
			(i+1..@count-1).each do |j|
				if @addresses[i] != @addresses[j]
					@pairs << { origin:@addresses[i], destination:@addresses[j] }
				end
			end
		end
		gon.pairs = @pairs
	end
	
	def show
	end
end
