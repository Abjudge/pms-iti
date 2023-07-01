
import requests
import json
import re

# Your GitHub username and access token
username = "abjudge"

# Set up request headers with access token
url = "https://api.github.com"



def validate_repo_name(name):
    if len(name) < 1 or len(name) > 100:
        return False
    if not re.match("^[a-zA-Z0-9_-]+$", name):
        return False
    if name[0] == "-" or name[-1] == ".":
        return False
    return True

def create_repo(repo_name,access_token):
    repo_name = repo_name.strip().replace(" ", "-").lower()
    if not validate_repo_name(repo_name):
        print("Invalid repository name.")
    else:
        print(f"Valid repository name: '{repo_name}'")

        payload = {
            "name": repo_name,
            "description": "My new repository",
            "auto_init": True,
            "gitignore_template": "Python",
            "license_template": "mit",
            "default_branch": "main"
        }
        headers = {
                    "Authorization": f"token {access_token}",
                    "Accept": "application/vnd.github.v3+json"
                    }       
        response = requests.post(f"{url}/user/repos", headers=headers, data=json.dumps(payload))
        print(f"Response: {response.status_code} {response.reason}")
        if response.status_code == 201:
            data = response.json()
            clone_url = data['clone_url']
            repo_name = data['name']
            return clone_url,repo_name
        else:
            print(f"Error creating repository: {response.status_code} {response.reason}")
        

