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
		(0..10).each do |i|
			(i+1..11).each do |j|
				@pairs << {origin:@addresses[i], destination:@addresses[j], panelName:"p"+j.to_s}
			end
		end
		gon.pairs = @pairs

		@first = @addresses[0]
	end
	
	def show
	end
end
