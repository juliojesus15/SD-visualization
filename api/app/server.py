from flask import Flask, jsonify
from controllers.student_controller import StudentController
from controllers.test_controller import TestController

app = Flask(__name__)

student_controller = StudentController()
test_controller = TestController()

app.register_blueprint(student_controller.blueprint)
app.register_blueprint(test_controller.blueprint)

if __name__ == '__main__':
	app.run(debug=True)

