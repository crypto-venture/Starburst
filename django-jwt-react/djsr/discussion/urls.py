from django.urls import path
from .views import PostList, PostDetail, CreatePost, UserReactionView

urlpatterns = [
    path('create', CreatePost.as_view(), name="create_post"),
    path('all', PostList.as_view(), name="all_posts"),
    path('detail', PostDetail.as_view(), name="post_detail"),
    path('like', UserReactionView.as_view(), name="post_like")
]
