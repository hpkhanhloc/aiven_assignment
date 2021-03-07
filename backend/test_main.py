import json
import unittest
from fastapi.testclient import TestClient
from unittest.mock import patch
from main import app


class TestMain(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    @patch("get_and_modify_cloud_data.make_request")
    def test_get_and_modify_cloud_data(self, mock_make_request):
        mock_make_request.return_value = {"clouds": [
            {
                "cloud_description": "Africa, South Africa - Amazon Web Services: Cape Town",
                "cloud_name": "aws-af-south-1",
                "geo_latitude": -33.92,
                "geo_longitude": 18.42,
                "geo_region": "africa"},
            {
                "cloud_description": "Africa, South Africa - Azure: South Africa North",
                "cloud_name": "azure-south-africa-north",
                "geo_latitude": -26.198,
                "geo_longitude": 28.03,
                "geo_region": "africa"
            },
            {
                "cloud_description": "Asia, Hong Kong - Google Cloud: Hong Kong",
                "cloud_name": "google-asia-east2",
                "geo_latitude": 22.5,
                "geo_longitude": 114,
                "geo_region": "east asia"
            }
        ]}

        response = self.client.get("/api/clouds")

        expected = [
            {
                "cloud_description": "Africa, South Africa - Amazon Web Services: Cape Town",
                "cloud_name": "aws-af-south-1",
                "geo_latitude": -33.92,
                "geo_longitude": 18.42,
                "geo_region": "africa",
                "cloud_provider": "Amazon",
            },
            {
                "cloud_description": "Africa, South Africa - Azure: South Africa North",
                "cloud_name": "azure-south-africa-north",
                "geo_latitude": -26.198,
                "geo_longitude": 28.03,
                "geo_region": "africa",
                "cloud_provider": "Azure"
            },
            {
                "cloud_description": "Asia, Hong Kong - Google Cloud: Hong Kong",
                "cloud_name": "google-asia-east2",
                "geo_latitude": 22.5,
                "geo_longitude": 114,
                "geo_region": "east asia",
                "cloud_provider": "Google"
            }]

        self.assertEqual(200, response.status_code)
        self.assertEqual(expected, response.json())
        mock_make_request.assert_called_once_with(
            method="GET", url="/v1/clouds"
        )
