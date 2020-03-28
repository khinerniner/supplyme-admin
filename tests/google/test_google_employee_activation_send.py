
import logging

# Create Logger
logger = logging.getLogger('supplyme.test.employee.test_employee_activation_send')

from testing_config import BaseTestConfig
import json
import pytest

from server.employee.model import SupplyMeEmployeeCode

@pytest.mark.skip(reason="Using Prod Cert")
class TestGoogleEmployeeActivationSend(BaseTestConfig):

    emailEmployeeCode = SupplyMeEmployeeCode(
        activationCode='O4LBaoJ7edRvBL3GxOHH',
        accountID=None,
        ownerName='John Doe',
        accountName='Test Account',
        email='denis@harpangell.com',
        permissionLevel='hcp',
        updatedDate=None,
        createdDate=None
    )

    def test_employee_text_activation_send(self):

        data = {
            'activationCode': self.emailEmployeeCode.to_any_object(),
        }

        res = self.app.post(
                "/api/google/v1/employee/activationCode/send",
                json=data,
                content_type='application/json',
                headers=self.headers
        )
        self.assertEqual(res.status_code, 200)
