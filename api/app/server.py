from flask import Flask

from controllers.roadmap_controller import RoadmapController
from controllers.test_controller import TestController

from domain.repositories.node_repository import NodeRepository
from domain.repositories.link_repository import LinkRepository

from services.sankey_service import SankeyService

from controllers.sankey_controller import SankeyController


app = Flask(__name__)

node_repository = NodeRepository()
link_repository = LinkRepository()
sankey_service = SankeyService(node_repository, link_repository)
sankey_controller = SankeyController(sankey_service)

# Registers
app.register_blueprint(sankey_controller.blueprint)

roadmap_controller = RoadmapController()
test_controller = TestController()

app.register_blueprint(roadmap_controller.blueprint)
app.register_blueprint(test_controller.blueprint)

if __name__ == '__main__':
	app.run(debug=True)