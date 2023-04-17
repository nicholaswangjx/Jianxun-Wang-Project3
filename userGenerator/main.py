import json
import random
import requests
import time
from faker import Faker

# generate 20 users with fake data
fake = Faker()
users = []
for _ in range(20):
    user = {
        "username": fake.user_name(),
        "password": fake.password(),
        "email": fake.email(),
        "description": fake.text(max_nb_chars=50)
    }
    users.append(user)

# sign up each user and save the user ID, access token, and posts
base_url = "http://localhost:9000/api"
for user in users:
    curSleep = random.randint(5, 30)

    signup_data = {
        "username": user["username"],
        "password": user["password"],
        "email": user["email"],
        "description": user["description"]
    }
    response = requests.post(f"{base_url}/auth/signup", json=signup_data)
    if response.ok:
        user["_id"] = response.json()["_id"]

# sign in users, create posts, and follow other users
for user in users:
    print("Creating post for", user["username"])
    curSleep = random.randint(5, 30)

    signin_data = {
        "username": user["username"],
        "password": user["password"]
    }
    response = requests.post(f"{base_url}/auth/signin", json=signin_data)
    if response.ok:
        user["access_token"] = response.cookies["access_token"]
        user["posts"] = []
        headers = {"cookie": f"access_token={user['access_token']}"}
        for _ in range(2):
            post_data = {
                "userId": user["_id"],
                "content": fake.text(max_nb_chars=200)
            }
            response = requests.post(f"{base_url}/twitterPost", headers=headers, json=post_data)
            if response.ok:
                user["posts"].append(response.json()["_id"])
            else:
                print(f"Failed to publish post for user {user['username']}")
            # send the next post after a random interval between 5 and 30 seconds
            print("SLEEP for", curSleep)
            time.sleep(curSleep)

        # Randomly follow other users
        num_users_to_follow = random.randint(1, 5)
        for _ in range(num_users_to_follow):
            follow_user_id = random.choice([u["_id"] for u in users if u["_id"] != user["_id"]])
            follow_data = {"id": user["_id"]}
            response = requests.put(f"{base_url}/users/follow/{follow_user_id}", headers=headers, json=follow_data)
            if not response.ok:
                print(response)
                print(f"Failed to follow user {follow_user_id} for user {user['username']}")

# save user data and posts to a JSON file
with open("data.json", "w") as f:
    json.dump(users, f, indent=4)