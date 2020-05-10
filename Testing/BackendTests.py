import requests
import unittest
import json

URL = "http://127.0.0.1:8000"
ID = 0
ACCESS = ""
POST_ID = 0
LIKES = 0

class TestRoutes(unittest.TestCase):
	USERNAME = "AutomatedTestUser"
	PASSWORD = "TestPass"
	BIO = "I am a bot, my job is to test things"
	EMAIL = "randomemail@email.com"

	#Authentication Tests
	@unittest.skip("Don't need to keep registering")
	def test_01_register(self):
		data = {
		"username" : self.USERNAME,
		"password" : self.PASSWORD,
		"bio" : self.BIO,
		"email" : self.EMAIL
		}

		res = requests.post(URL + "/api/user/create", data=data)

		self.assertEqual(res.status_code, 201)

		newUser = json.loads(res.content)

		self.assertEqual(newUser['username'], self.USERNAME)
		self.assertEqual(newUser['bio'], self.BIO)
		self.assertEqual(newUser['email'], self.EMAIL)

		try:
			global ID
			ID = newUser['id']
		except KeyError as e:
			self.fail()
		pass

	def test_02_register_duplicate(self):
		data = {
		"username" : self.USERNAME,
		"password" : self.PASSWORD,
		"bio" : self.BIO,
		"email" : self.EMAIL
		}

		res = requests.post(URL + "/api/user/create", data=data)

		self.assertEqual(res.status_code, 500)

	def test_03_login(self):
		data = {
		"username" : self.USERNAME,
		"password" : self.PASSWORD
		}

		res = requests.post(URL + "/api/token/obtain", data=data)

		self.assertEqual(res.status_code, 200)


		login_content = json.loads(res.content)

		self.assertEqual(login_content['username'], self.USERNAME)
		self.assertEqual(login_content['bio'], self.BIO)
		self.assertEqual(login_content['email'], self.EMAIL)

		try:
			global ACCESS
			global ID
			ACCESS = login_content['access']
			ID = login_content['id']
		except KeyError as e:
			self.fail()
		pass

	def test_04_login_negative(self):
		data = {
		"username" : "abcdefghijklm", #random letters here to make sure that this account isn't registered
		"password" : "overwatch"
		}

		res = requests.post(URL + "/api/token/obtain", data=data)

		self.assertEqual(res.status_code, 401)

	# Discussion Post Tests

	def test_05_post_list(self):
		global ACCESS
		header = {"Authorization" : "Bearer {}".format(ACCESS)}
		res = requests.get(URL + "/posts/all", headers=header)

		self.assertEqual(res.status_code, 200)

		content = json.loads(res.content)

		global POST_ID
		POST_ID = content[2]['id'] #Not taking the first result, since it might errenously be the only output

	def test_06_post_detail(self):
		
		global ACCESS
		global POST_ID
		global LIKES 

		header = {"Authorization" : "Bearer {}".format(ACCESS)}
		data = {
		"id" : POST_ID
		}
		res = requests.post(URL + "/posts/detail", data=data, headers=header)

		self.assertEqual(res.status_code, 200)

		content = json.loads(res.content)

		self.assertEqual(content[0]['pk'], POST_ID)
		LIKES = content[0]['fields']['likes']

	def test_07_post_like(self):
		global ACCESS
		global ID
		global POST_ID
		global LIKES

		header = {"Authorization" : "Bearer {}".format(ACCESS)}
		data = {
		"id" : POST_ID,
		"like" : 1
		}

		res = requests.post(URL + "/posts/like", data=data, headers=header)

		self.assertEqual(res.status_code, 200)
		content = json.loads(res.content)[0]['fields']

		self.assertEqual(content['likes'], LIKES + 1)
		LIKES = content['likes']
		self.assertTrue(ID in content['users_reaction'])

	def test_08_post_unlike(self):
		global ACCESS
		global ID
		global POST_ID
		global LIKES

		header = {"Authorization" : "Bearer {}".format(ACCESS)}
		data = {
		"id" : POST_ID,
		"like" : 0
		}

		res = requests.post(URL + "/posts/like", data=data, headers=header)

		self.assertEqual(res.status_code, 200)
		content = json.loads(res.content)[0]['fields']

		self.assertEqual(content['likes'], LIKES - 1)
		LIKES = content['likes']
		self.assertFalse(ID in content['users_reaction'])

	@unittest.skip("Duplication may cause this to fail")
	def test_09_post_create(self):
		global ACCESS

		header = {"Authorization" : "Bearer {}".format(ACCESS)}
		data = {
		"title" : "Yoinked BOI",
		"content" : "I'm a McCree Main"
		}

		res = requests.post(URL + "/posts/create", data=data, headers=header)
		self.assertEqual(res.status_code, 201)

		content = json.loads(res.content)[0]['fields']

		self.assertEqual(content['author'], self.USERNAME)

	def test_10_post_create_negative(self):
		global ACCESS

		header = {"Authorization" : "Bearer {}".format(ACCESS)}
		data = {
		"title" : "Yoinked BOI",
		"content" : "I'm a McCree Main"
		}

		res = requests.post(URL + "/posts/create", data=data, headers=header)
		self.assertEqual(res.status_code, 500)
		pass

if __name__ == '__main__':
	unittest.main()
