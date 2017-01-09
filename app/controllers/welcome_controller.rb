class WelcomeController < ApplicationController
	def index
		# parse data for all addresses as strings
		@addresses = []
		file = File.read('app/assets/monuments.json')
		@monuments = JSON.parse(file)
		@monuments["data"].each do |monument|
			@addresses << { address:monument[10] + " Baltimore, MD", name:monument[35] }
		end
		file = File.read('app/assets/parks.json')
		@parks = JSON.parse(file)
		@parks["data"].each do |park|
			if (park[11][0])
				@addresses << { address:park[11][0].split(/:|,/)[1][1..-2] + " Baltimore, MD", name:park[8] }
			end
		end

		gon.addresses = @addresses
	end
	
	def show
	end
end
