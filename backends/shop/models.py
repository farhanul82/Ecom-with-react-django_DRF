from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL


# Create your models here.

class Category(models.Model):
    title = models.CharField(max_length=199)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title


class Product(models.Model):
    product_id = models.AutoField
    product_name = models.CharField(max_length=50)
    gender = models.CharField(max_length=50, default="")
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, blank=True, null=True)
    price = models.IntegerField(default=0)
    description = models.CharField(max_length=300)
    pub_date = models.DateField()
    image = models.ImageField(upload_to='shop/images', default="")

    def __str__(self):
        return self.product_name


class Comment(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comments = models.CharField(max_length=500, default="",null=True)
    rating = models.IntegerField(default=0,null=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.user.email



class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    total = models.PositiveIntegerField(default=0)
    complit = models.BooleanField(default=False)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.user.email


class CartProduct(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ManyToManyField(Product)
    price = models.PositiveIntegerField(default=0)
    quantity = models.PositiveIntegerField(default=0)
    subtotal = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Cart=={self.cart.user.email} & {self.cart.complit}"



ORDER_STATUS = (
    ("Order Received", "Order Received"),
    ("Order Processing", "Order Processing"),
    ("On the way", "On the way"),
    ("Order Completed", "Order Completed"),
    ("Order Canceled", "Order Canceled"),
)




class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, default="")
    email = models.EmailField(max_length=25, default='')
    phone = models.CharField(max_length=20, default="")
    address = models.CharField(max_length=100, default="")
    date = models.DateField(auto_now_add=True)
    order_status = models.CharField(max_length=100,choices=ORDER_STATUS,default="Order Received")


    def __str__(self):
        return self.user.email

