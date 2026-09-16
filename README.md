# Expenses

Example of an elysia app with e2e type safety from the drizzle schema to the route validation

# todo

- show data validation on routes, current behavior shows an error 500
- normalize route responses map. e.g:

```json
{
	"data": [],
	"meta": {
		"page": 1,
		"limit": 15,
		"total_items": 50,
		"total_pages": 4,
		"has_next_page": true,
		"has_previous_page": false
	}
}
```
