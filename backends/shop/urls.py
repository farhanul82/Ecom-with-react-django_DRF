
from django.urls import path, include, re_path
from .views import Get_Comment_View,ProductViewSet, DelateComment, CategoryViewSet, AddToCartView, MyCart,Delatecartproduct,CommentViewSet,OrderViewSet,GetCSRFToken
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register("product", ProductViewSet, basename='product')
router.register("category", CategoryViewSet, basename='category')
router.register("cart", MyCart, basename='MyCart')
router.register("addtocart", AddToCartView, basename='addtocart')
router.register("order", OrderViewSet, basename='order')
router.register("comment", CommentViewSet, basename='comment')

urlpatterns = [
    path('shop/', include(router.urls)),
    path("delatecartproduct/",Delatecartproduct.as_view(),name="delatecartproduct"),
    path("delateComment/",DelateComment.as_view(),name="delatecartproduct"),
    path('renderComment/', Get_Comment_View.as_view(),name='renderComment'),
    path('csrf_cookie', GetCSRFToken.as_view()),

]
