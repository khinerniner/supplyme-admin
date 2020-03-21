# server/utils/google/gmail/objects/guest.py

import logging
import time

logger = logging.getLogger('tabs.utils.google.gmail.objects.guest.py')

from server.utils.google.gmail.client import TabsGoogleClient

BASE_DOMAIN = 'https://app.localhost'
# BASE_DOMAIN = 'https://app.virtualtabs.org'

class TabsGuestEmails(object):
    def __init__(self, user_email=None):
        self.user_email = user_email
        self.email_server = TabsGoogleClient(self.user_email)

    # Guest Requested Email
    # TODO: None
    # [START Guest Requested Email]
    def send_guest_requested_email(self, to_name=None, from_name=None, userID=None):
        try:
            to = self.user_email
            subject = 'Welcome to Tabs..'
            header = 'Dear %s,' % to_name
            body = 'Thank you for requesting access to Tabs.'
            bodya = 'We will review your request and reach out to you shortly.'
            footer = 'Cheers,'
            footer_sign = from_name
            email = self.email_server.email_template_single_body(
                campaign_id='request',
                subject=subject,
                header=header,
                body=body,
                # bodya=bodya,
                footer=footer,
                footer_sign=footer_sign,
            )
            message_text_html = r'%s' % email
            message_without_attachment = self.email_server.create_message_without_attachment(self.email_server.sender, to, subject, message_text_html)
            self.email_server.send_message_without_attachement(self.email_server.service, "me", message_without_attachment)
            logger.info('Guest Request Email Sent!')
        except Exception as e:
            logger.error('Error Sending Guest Request Email; Error: %s', e)
    # [END Guest Requested Email]

    # Guest Requested Support Email
    # TODO: None
    # [START Guest Requested Support Email]
    def send_guest_requested_support_email(self, to_name=None, from_name=None, userID=None):
        try:
            to = self.email_server.sender
            subject = 'New User Access..'
            header = 'Dear %s,' % to_name
            body = 'A new user has requested access to Tabs.'
            bodya = 'Please review their request ASAP.'
            footer = 'Cheers,'
            footer_sign = from_name
            email = self.email_server.email_template_single_body(
                campaign_id='requestsupport',
                subject=subject,
                header=header,
                body=body,
                # bodya=bodya,
                footer=footer,
                footer_sign=footer_sign,
            )
            message_text_html = r'%s' % email
            message_without_attachment = self.email_server.create_message_without_attachment(self.email_server.sender, to, subject, message_text_html)
            self.email_server.send_message_without_attachement(self.email_server.service, "me", message_without_attachment)
            logger.info('Guest Request Support Email Sent!')
        except Exception as e:
            logger.error('Error Sending Guest Request Support Email; Error: %s', e)
    # [END Guest Requested Support Email]

    # Activation Code Email
    # TODO: None
    # [START Activation Code Email]
    def send_activation_code_email(self, to_name=None, from_name=None, activation_code=None):
        to = self.user_email
        campaign_id = activation_code
        subject = 'Welcome to Tabs'
        header = 'Congratulations {},'.format(to_name)
        body = 'You have been approved for Tabs. Please use the key below to register your account.'
        abody = '<a href="{base_domain}/register?type={isType}&code={code}">{code}</a>'.format(base_domain=BASE_DOMAIN, isType='guest', code=activation_code)
        footer = 'Cheers,'
        footer_sign = from_name
        email = self.email_server.email_template_single_body(
            campaign_id=campaign_id,
            subject=subject,
            header=header,
            body=body,
            abody=abody,
            footer=footer,
            footer_sign=footer_sign
        )
        message_text_html = r'{}'.format(email)
        message_without_attachment = self.email_server.create_message_without_attachment(self.email_server.sender, to, subject, message_text_html)
        self.email_server.send_message_without_attachement(self.email_server.service, "me", message_without_attachment)
        logger.info('Activate Code Email Sent!')
    # [END Activation Code Email]
