from selenium import webdriver
import unittest
import requests
from selenium.webdriver.common.keys import Keys
import time
from selenium.common.exceptions import NoSuchElementException


class UITests(unittest.TestCase):
	@classmethod
	def setUpClass(cls):
		cls.driver = webdriver.Chrome(executable_path="/Users/bhavdeep/Downloads/chromedriver")
		cls.USERNAME = "SeleniumTester"
		cls.PASSWORD = "pythonisgreat"
		cls.BIO = "I am yet another bot"

	def test_01_registration_email_validation(self):
		try:
			driver = self.driver
			driver.get("http://localhost:3000")
			reg_button = driver.find_element_by_xpath('/html/body/div/div/div/div[1]/nav/div/ul/li/a')
			self.assertTrue(reg_button != None)
			reg_button.click()

			#Find email field
			email_inpt = driver.find_element_by_xpath('/html/body/div/div/div/div[2]/div/div/div/div/form/div[1]/input')
			self.assertTrue(email_inpt != None)
			email_inpt.send_keys("seleniumTester")
			email_inpt.send_keys(Keys.TAB)
			#This should give us an error for input validation, check for that 
			err_message = driver.find_element_by_xpath('/html/body/div/div/div/div[2]/div/div/div/div/form/div[1]/div')
			self.assertTrue(err_message != None)
			self.assertTrue(err_message.text.lower() == "provided email is not valid.")

			email_inpt.send_keys("@sjsu.edu")
			self.assertTrue(err_message.text.lower() == '')
		except NoSuchElementException as e:
			self.fail()
		
	def test_02_registration_username_validation(self):
		#This should also display an error message
		try:
			driver = self.driver
			username_inpt = driver.find_element_by_xpath('/html/body/div[1]/div/div/div[2]/div/div/div/div/form/div[2]/input')
			self.assertTrue(username_inpt != None)
			username_inpt.send_keys(Keys.TAB)

			err_message = driver.find_element_by_xpath('/html/body/div[1]/div/div/div[2]/div/div/div/div/form/div[2]/div')
			self.assertTrue(err_message != None)
			self.assertTrue(err_message.text.lower() == "please provide a username.")

			username_inpt.send_keys(self.USERNAME)
			self.assertTrue(err_message.text.lower() == '')
		except NoSuchElementException as e:
			self.fail()

	def test_03_registration_password_validation(self):
		try:
			driver = self.driver
			pass_inpt = driver.find_element_by_xpath('/html/body/div/div/div/div[2]/div/div/div/div/form/div[3]/input')
			self.assertTrue(pass_inpt != None)
			pass_inpt.send_keys(Keys.TAB)

			err_message = driver.find_element_by_xpath('/html/body/div/div/div/div[2]/div/div/div/div/form/div[3]/div')
			self.assertTrue(err_message != None)
			self.assertTrue(err_message.text.lower() == "please provide a password.")

			pass_inpt.send_keys(self.PASSWORD)
			self.assertTrue(err_message.text.lower() == "passwords don't match.")

			re_pass_inpt = driver.find_element_by_xpath('/html/body/div/div/div/div[2]/div/div/div/div/form/div[4]/input')
			self.assertTrue(re_pass_inpt != None)
			re_pass_inpt.send_keys(Keys.TAB)

			err_message_2 = driver.find_element_by_xpath('/html/body/div/div/div/div[2]/div/div/div/div/form/div[4]/div')
			self.assertTrue(err_message_2 != None)
			self.assertTrue(err_message_2.text.lower() == "please re-enter above password.")

			re_pass_inpt.send_keys(self.PASSWORD)
			self.assertTrue(err_message.text.lower() == '')
			self.assertTrue(err_message_2.text.lower() == '')
		except NoSuchElementException as e:
			self.fail()

	def test_04_registration_submit_redirect(self):
		try:
			driver = self.driver
			bio_inpt = driver.find_element_by_xpath('/html/body/div[1]/div/div/div[2]/div/div/div/div/form/div[6]/div/div/textarea')
			self.assertTrue(bio_inpt != None)
			bio_inpt.send_keys(self.BIO)

			finish_btn = driver.find_element_by_xpath('/html/body/div[1]/div/div/div[2]/div/div/div/div/form/button')
			finish_btn.click()

			time.sleep(2)
			sign_in_text = driver.find_element_by_xpath('/html/body/div[1]/div/div/div[2]/div/div/div/div/div/span')
			self.assertTrue(sign_in_text.text.lower() == "sign in")
		except NoSuchElementException as e:
			self.fail()

	def test_05_login_username_validation(self):
		try:
			driver = self.driver
			username_inpt = driver.find_element_by_xpath('/html/body/div[1]/div/div/div[2]/div/div/div/div/div/form/div[1]/input')
			self.assertTrue(username_inpt != None)
			username_inpt.send_keys(Keys.TAB)

			err_msg = driver.find_element_by_xpath('/html/body/div[1]/div/div/div[2]/div/div/div/div/div/form/div[1]/div')
			self.assertTrue(err_msg != None)
			self.assertTrue(err_msg.text.lower() == "please provide a username.")

			username_inpt.send_keys(self.USERNAME)
			self.assertTrue(err_msg.text == "")
		except NoSuchElementException as e:
			self.fail()

	def test_06_login_password_validation(self):
		try:
			driver = self.driver
			pass_inpt = driver.find_element_by_xpath('/html/body/div/div/div/div[2]/div/div/div/div/div/form/div[2]/input')
			self.assertTrue(pass_inpt != None)
			pass_inpt.send_keys(Keys.TAB)

			err_msg = driver.find_element_by_xpath('/html/body/div[1]/div/div/div[2]/div/div/div/div/div/form/div[2]/div')
			self.assertTrue(err_msg != None)
			self.assertTrue(err_msg.text.lower() == 'please provide a password.')

			pass_inpt.send_keys(self.PASSWORD)
			self.assertTrue(err_msg.text == '')
		except NoSuchElementException as e:
			self.fail()

	def test_07_login_submit_redirect(self):
		try:
			driver = self.driver
			cont_btn = driver.find_element_by_xpath('/html/body/div[1]/div/div/div[2]/div/div/div/div/div/form/button')
			self.assertTrue(cont_btn != None)

			cont_btn.click()

			time.sleep(2)

			BitcoinLink = driver.find_element_by_xpath('/html/body/div[1]/div/div/div[1]/nav/div/ul/li[1]/a')
			profileLink = driver.find_element_by_xpath('/html/body/div[1]/div/div/div[1]/nav/div/ul/li[2]/a')
			logout_btn = driver.find_element_by_xpath('/html/body/div[1]/div/div/div[1]/nav/div/ul/li[3]/a')

			self.assertTrue(BitcoinLink != None)
			self.assertTrue(profileLink != None)
			self.assertTrue(logout_btn != None)

			self.assertTrue(logout_btn.text.lower() == 'log out')
		except NoSuchElementException as e:
			self.fail()
		

	@classmethod
	def tearDownClass(cls):
		cls.driver.quit()

suite = unittest.TestLoader().loadTestsFromTestCase(UITests)
unittest.TextTestRunner(verbosity=2).run(suite)