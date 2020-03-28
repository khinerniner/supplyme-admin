
import logging

# Create Logger
logger = logging.getLogger('supplyme.test.dispensary.test_dispensary_activation_send')

from testing_config import BaseTestConfig
import json
import pytest

from server.dispensary.model import CattailsAccountCode

class TestAccountTextActivationSend(BaseTestConfig):

    emailAccountCode = CattailsAccountCode(
        activationCode='O4LBaoJ7edRvBL3GxOHH',
        dispensaryID=None,
        valid=True,
        ownerName='John Doe',
        dispensaryName='Test Account',
        email='denisangell@harpangell.com',
        phoneNumber=None,
        creationDate=None,
        updateDate=None
    )

    @pytest.mark.skip(reason="Using Prod Cert")
    def test_dispensary_email_activation_send(self):

        data = {
            'activationCode': self.emailAccountCode.to_any_object(),
        }

        res = self.app.post(
                "/api/twilio/v1/dispensary/activationCode/send",
                json=data,
                content_type='application/json',
                headers=self.headers
        )
        self.assertEqual(res.status_code, 200)
