const express = require('express')
const request = require('request-promise')

const app = express()
const PORT = process.env.PORT || 5000
// const apiKey = 'fa8f7a097070decd2316b453ec757601'
// const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

const generateScraperURL = (apiKey) =>
	`http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`
app.use(express.json())

app.get('/', async (req, res) => {
	res.write(
		'Welcome to Amazon Scraper API by Aryan Verma! \nA react web app that works as a web Scraping API that can fetch product details, reviews and offers on a product. It also has functionality to search from amazon and then fetch all the searched products from amazon page. \nTry: \n1- to fetch search results -- https://av-amazon-scraper.herokuapp.com/search/YOUR_SEARCH_QUERY?api_key=YOUR_SCRAPER_API_KEY  \n2- to fetch a specific product -- https://av-amazon-scraper.herokuapp.com/products/:productId?api_key=YOUR_SCRAPER_API_KEY  \n3- to fetch reviews of a specific product --  https://av-amazon-scraper.herokuapp.com//products/:productId/reviews?api_key=YOUR_SCRAPER_API_KEY  \n4- to fetch offers on a specific product -- https://av-amazon-scraper.herokuapp.com/products/:productId/offers?api_key=YOUR_SCRAPER_API_KEY '
	)
	res.end()
	console.log('?api_key=fa8f7a097070decd2316b453ec757601')
})

//fetching product details
app.get('/products/:productId', async (req, res) => {
	const { productId } = req.params
	const { api_key } = req.query
	try {
		const response = await request(
			`${generateScraperURL(api_key)}&url=https://www.amazon.in/dp/${productId}`
		)

		res.json(JSON.parse(response))
	} catch (error) {
		console.log('no response')
		res.json(error)
	}
})

//fetching product reviews
app.get('/products/:productId/reviews', async (req, res) => {
	const { productId } = req.params
	const { api_key } = req.query
	try {
		const response = await request(
			`${generateScraperURL(
				api_key
			)}&url=https://www.amazon.in/product-reviews/${productId}`
		)

		res.json(JSON.parse(response))
	} catch (error) {
		console.log('no response')
		res.json(error)
	}
})

//fetching product offers
app.get('/products/:productId/offers', async (req, res) => {
	const { productId } = req.params
	const { api_key } = req.query
	try {
		const response = await request(
			`${generateScraperURL(
				api_key
			)}&url=https://www.amazon.in/gp/offer-listing/${productId}`
		)

		res.json(JSON.parse(response))
	} catch (error) {
		console.log('no response')
		res.json(error)
	}
})

//fetching search results
app.get('/search/:searchQuery', async (req, res) => {
	const { searchQuery } = req.params
	const { api_key } = req.query
	try {
		const response = await request(
			`${generateScraperURL(
				api_key
			)}&url=https://www.amazon.in/s?k=${searchQuery}`
		)

		res.json(JSON.parse(response))
	} catch (error) {
		console.log('no response')
		res.json(error)
	}
})

app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`))
