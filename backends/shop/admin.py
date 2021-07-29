from django.contrib import admin
from .models import Product, Category, Cart, CartProduct, Order, Comment

# Register your models here.

admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Cart)
admin.site.register(CartProduct)
admin.site.register(Order)
admin.site.register(Comment)