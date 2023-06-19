import requests


access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg3MTA0MjcwLCJpYXQiOjE2ODcxMDA2NzAsImp0aSI6ImVlMTgxNzNkNDAxYTQ1YTBhMDc4YWU1ZThmNjkyNGZhIiwidXNlcl9pZCI6NH0.P4VMw2TKQ1KmXsqwb7TjLWp52LvamVHP8vagxvTQkig"
headers = {'Authorization': 'JWT ' + access_token}

# Make a request to a protected API endpoint using the JWT token
api_url = 'http://localhost:8000/welcome'
response = requests.get(api_url, headers=headers)

print("***********************************************")
print(response)