from django.contrib import admin
from django.urls import path, include 
from django.conf.urls import url

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('users-api/', include('users.api.urls')),  #
    path('foodtable-api/', include('foodtable.api.urls')),
    path('dietplan-api/', include('dietplan.api.urls')),  
    path('restaurant-api/', include('restaurant.api.urls')),
]
