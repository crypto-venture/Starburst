from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import MyTokenObtainPairView, CustomUserCreate, ReturnedUser, BTCPredictions, ETHPredictions

urlpatterns = [
    path('user/create', CustomUserCreate.as_view(), name="create_user"),
    path('token/obtain', MyTokenObtainPairView.as_view(), name='token_create'),  # override sjwt stock token
    path('token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('user/current', ReturnedUser.as_view(), name="get_current_user"),
    path('btc', BTCPredictions.as_view(), name="btc_predictions"),
    path('eth', ETHPredictions.as_view(), name="eth_predictions")
]
