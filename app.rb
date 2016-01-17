require 'sinatra'
require 'open-uri'
require 'dotenv'

Dotenv.load

class BusDash < Sinatra::Base

  get '/' do
    File.read(File.join('public', 'index.html'))
  end


  get '/stop/:stop_id' do
    url = "https://api.tfl.gov.uk/StopPoint/#{params[:stop_id]}/Arrivals?app_id=#{ENV['APP_ID']}&app_key=#{ENV["APP_KEY"]}"
    open(url).read
  end

end
