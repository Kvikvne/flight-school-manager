from django.apps import AppConfig


class AppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app'

class RestAuthTokenConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'rest_framework.authtoken'