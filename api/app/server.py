from flask import Flask

from controllers.roadmap_controller import RoadmapController
from controllers.test_controller import TestController

from domain.repositories.node_repository import NodeRepository
from domain.repositories.link_repository import LinkRepository

from services.node_service import NodeService
from services.link_service import LinkService

from controllers.node_controller import NodeController
from controllers.link_controller import LinkController


app = Flask(__name__)

node_repository = NodeRepository()
node_service = NodeService(node_repository)
node_controller = NodeController(node_service)

link_repository = LinkRepository()
link_service = LinkService(link_repository)
link_controller = LinkController(link_service)


# Registers
app.register_blueprint(node_controller.blueprint)
app.register_blueprint(link_controller.blueprint)

roadmap_controller = RoadmapController()
test_controller = TestController()

app.register_blueprint(roadmap_controller.blueprint)
app.register_blueprint(test_controller.blueprint)

if __name__ == '__main__':
	app.run(debug=True)