import json
import requests

#import for web scraping
import urllib.robotparser

#import for sms messaging
from twilio.rest import Client


#call location api to find device's location
class weather_location_api():


	def find_location(self):
		send_url = 'http://api.ipstack.com/76.103.250.155?access_key=e1f98ed63e2faf7a0f4b1dc6a4e3106f'
		r = requests.get(send_url)
		j = json.loads(r.text)
		city_location = j['city']
		
		return city_location

	def find_weather(self):
		give_url = 'http://api.openweathermap.org/data/2.5/weather?lat=37.2362&lon=-121.8289&APPID=58d51a9978022d92e510d4823764a988'
		w = requests.get(give_url)
		l = json.loads(w.text)
		temp_max = l['main']['temp_max']

		return temp_max


	#converts kelvin to farenheit
	kelvin_to_farenheit = lambda self, kel_temp:  int(round((((kel_temp - 273.15) * 9)/5) + 32))


class web_scraper():

	location_forecast = weather_location_api()

	def __init__(self):
		self.weather_forecast = location_forecast.find_weather()
		self.city_location = location_forecast.find_location()

	def can_scrape(self, url):
		#use scraping with weather forecast and city location to 
		#find clothing recommendations
		rp = urllib.robotparser.RobotFileParser()
		rp.set_url(url)
		rp.read()


class msg_send():

	def __init__(self, msgs):
		client = Client("ACeb7d2b95c9da8feace75c9e030f4c6e6", "8cb87eb993dc98d84885344a9f451565")
		client.messages.create(to="+14088581667", 
                       from_="+1(315) 284-2990", 
                       body=msgs)


weather_forecast = weather_location_api()
temp_max = str(weather_forecast.kelvin_to_farenheit(weather_forecast.find_weather())) + " ºF"
#city_location = weather_forecast.find_location()

send_sms = msg_send(temp_max)

#print(city_location)
#print(temp_max)

