class WelcomeController < ApplicationController
	def index
		# parse data for all addresses as strings
		@addresses = []
		# @names = []
		# @count = 0
		file = File.read('app/assets/monuments.json')
		@monuments = JSON.parse(file)
		@monuments["data"].each do |monument|
			# @count += 1
			@addresses << { address:monument[10] + " Baltimore, MD", name:monument[35] }
			# @names << monument[35]
		end
		file = File.read('app/assets/parks.json')
		@parks = JSON.parse(file)
		@parks["data"].each do |park|
			if (park[11][0])
				@addresses << { address:park[11][0].split(/:|,/)[1][1..-2] + " Baltimore, MD", name:park[8] }
			end
		end
		# gon.count = @count
		gon.addresses = @addresses
		# gon.names = @names

		# find all monument pairs
		# @pairs = []
		# (0..@count-2).each do |i|
		# 	(i+1..@count-1).each do |j|
		# 		if @addresses[i] != @addresses[j]
		# 			@pairs << { origin:@addresses[i], destination:@addresses[j], originName: @names[i], destinationName: @names[j]}
		# 		end
		# 	end
		# end
		# gon.pairs = @pairs
	end
	
	def show
	end
end
