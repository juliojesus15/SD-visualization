from flask import Flask

from domain.repositories.node_repository import NodeRepository
from domain.repositories.link_repository import LinkRepository
from domain.repositories.student_repository import StudentRepository
from domain.repositories.pcloud_repository import PCloudRepository

from services.sankey_service import SankeyService
from services.pcloud_service import PCloudService
from services.student_service import StudentService

from controllers.sankey_controller import SankeyController
from controllers.pcloud_controller import PCloudController
from controllers.student_controller import StudentController

app = Flask(__name__)

node_repository = NodeRepository()
link_repository = LinkRepository()
pcloud_repository = PCloudRepository()

sankey_service = SankeyService(node_repository, link_repository)
sankey_controller = SankeyController(sankey_service)

pcloud_service = PCloudService(pcloud_repository, node_repository)
pcloud_controller = PCloudController(pcloud_service)

student_repository = StudentRepository()
student_service = StudentService(student_repository)
student_controller = StudentController(student_service)

# Registers
app.register_blueprint(sankey_controller.blueprint)
app.register_blueprint(pcloud_controller.blueprint)
app.register_blueprint(student_controller.blueprint)

if __name__ == '__main__':
	app.run(debug=True)