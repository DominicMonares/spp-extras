"""
Django settings for spp_extras project.

Generated by 'django-admin startproject' using Django 4.1.2.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

from pathlib import Path


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# Used in both dev and production since app is confined to localhost
# Generate, hide, and use your own key if exposing the app to external connections
SECRET_KEY = 'django-insecure-^-%ms(a*y%vjv(wrb^tpt)d#(oj^5q#g)@)p19#qe_thx)ctlg'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'spp_extras_api',
    'channels',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

CORS_ALLOW_ALL_ORIGINS = True # If this is used then `CORS_ALLOWED_ORIGINS` will not have any effect
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGIN_REGEXES = [
    'http://localhost:8080',
    'ws://127.0.0.1:8080',
]

ROOT_URLCONF = 'spp_extras.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI_APPLICATION = 'spp_extras.wsgi.application'

ASGI_APPLICATION = 'spp_extras.asgi.application'

CHANNEL_LAYERS = {
    'default': {
        "BACKEND": "channels.layers.InMemoryChannelLayer"
    },
}

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

# Default SPP credentials used, do not commit sensitive info if you change it!
credentials = {
    'ENGINE': 'django.db.backends.mysql',
    'USER': 'root',
    'PASSWORD': '123456',
    'HOST': '127.0.0.1',
    'PORT': '3310',
}

DATABASES = {
    'default': {},

    'classicrealmd': { 'NAME': 'classicrealmd' }  | credentials,
    'classiccharacters': { 'NAME': 'classiccharacters' } | credentials,
    'classicmangos': { 'NAME': 'classicmangos' } | credentials,

    'tbcrealmd': { 'NAME': 'tbcrealmd' } | credentials,
    'tbccharacters': { 'NAME': 'tbccharacters' } | credentials,
    'tbcmangos': { 'NAME': 'tbcmangos' } | credentials,

    'wotlkrealmd': { 'NAME': 'wotlkrealmd' } | credentials,
    'wotlkcharacters': { 'NAME': 'wotlkcharacters' } | credentials,
    'wotlkmangos': { 'NAME': 'wotlkmangos' } | credentials
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
