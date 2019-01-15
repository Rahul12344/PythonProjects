import json
import requests

#import for web scraping
import scrapy
import logging

#import for running js applications
from Naked.toolshed.shell import execute_js

logging.getLogger('scrapy').setLevel(logging.WARNING)

#call location api to find device's location
class clothes_spider(scrapy.Spider):

	name = 'Clothes'
	start_urls = ['https://www.theodysseyonline.com/guide-dressing-confusing-temperature']

	def find_location(self):
		send_url = 'http://api.ipstack.com/134.201.250.155?access_key=e1f98ed63e2faf7a0f4b1dc6a4e3106f'
		r = requests.get(send_url)
		j = json.loads(r.text)
		city_location = j['city']

		#print(j)
		
		return city_location

	def find_weather(self):
		city_name = self.find_location()

		give_url = 'http://api.openweathermap.org/data/2.5/weather?q='+ city_name +'&APPID=58d51a9978022d92e510d4823764a988'
		w = requests.get(give_url)
		l = json.loads(w.text)
		#print(l)
		temp_max = l['main']['temp_max']

		return temp_max


	#converts kelvin to farenheit
	kelvin_to_farenheit = lambda self, kel_temp:  int(round((((kel_temp - 273.15) * 9)/5) + 32))


	#responsible for identifying clothing type based on weather api information
	def parse(self, response):
		#print(response.url)
		hTwo_selectors = response.xpath("//h2")
		p_selectors = response.xpath("//p")

		temp_max = self.kelvin_to_farenheit(self.find_weather())
		print(temp_max)
		#self.find_location()

		#obtain tag_info
		if(temp_max <= 70 and temp_max >= 55):
			#print(hTwo_selectors[6])
			success = execute_js('drag_info.js')

		elif(temp_max >= 70):
			#t-shirt entries
			success = execute_js('drag_info.js')
		#print(response.css('h1#firstHeading::text').extract())


