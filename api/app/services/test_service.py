from domain.repositories.test_repository import TestRepository

test_repository = TestRepository()

class TestService:
	def get_test(self):
		return test_repository.get_test()

