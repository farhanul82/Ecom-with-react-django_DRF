from django.shortcuts import render
from rest_framework import serializers
from rest_framework.parsers import MultiPartParser, FormParser,JSONParser
from rest_framework import permissions
from rest_framework.serializers import Serializer
from .serializers import CommentSerializer, ProductSerializers, CatagorySerializer, CartProductSerializer, CartSerializer,OrderSerializer
from .models import Comment, Order, Product, Category, CartProduct, Cart, Order
from rest_framework import viewsets, views
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect

# Create your views here.


class ProductViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    queryset = Product.objects.all()
    serializer_class = ProductSerializers

    def create(self, request):
        serializer = ProductSerializers(data=request.data, many=True)
        serializer.save()
        return Response(serializer.data)

    # def list(self):
    #     queryset = Product.objects.values('categories', 'id')
    #     catProd = {item['categories'] for item in queryset}
    #     product = Product.objects.filter(categories=catProd)
    #     erializer = ProductSerializers(product, many=True)
    #     return Response(serializer.data)


class CategoryViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    queryset = Category.objects.all()
    serializer_class = CatagorySerializer

    def retrieve(self, request, pk=None):
        query = Category.objects.get(id=pk)
        serializer = CatagorySerializer(query)
        serializer_data = serializer.data
        all_data = []
        category_product = Product.objects.filter(
            category_id=serializer_data['id'])
        category_product_serializer = ProductSerializers(
            category_product, many=True)
        serializer_data['category_product'] = category_product_serializer.data
        all_data.append(serializer_data)
        return Response(all_data)


class MyCart(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    def list(self,request):
        query = Cart.objects.filter(user=request.user).filter(complit=False)
        print(query)
        serializers = CartSerializer(query,many=True)
        all_data=[]
        for cart in serializers.data:
            cart_product = CartProduct.objects.filter(cart=cart["id"])
            cart_product_serializer = CartProductSerializer(cart_product,many=True)
            cart["cartproduct"] = cart_product_serializer.data
            all_data.append(cart)
        return Response(all_data)



            
        



class Delatecartproduct(views.APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    def post(self,request):
        print(request.data['id'])
        cp_obj = CartProduct.objects.get(id=request.data['id'])
        cart=Cart.objects.filter(
            user=request.user).filter(complit=False).first()
        cart.total = cart.total - cp_obj.subtotal
        cart.save()
        cp_obj.delete()
        response_mesage = {
                'error': False, 'message': "Product is deleted successfully", "productid": request.data['id']}
        return Response(response_mesage)



class AddToCartView(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
   
    def create(self, request):
     
        product_id = request.data['id']
        
        product_obj = Product.objects.get(id=product_id)
        
        cart_cart = Cart.objects.filter(
            user=request.user).filter(complit=False).first()
       
        # cart_Product_obj = CartProduct.objects.filter(
        #     product__id=product_id).first()
        try:
            if cart_cart:
                this_product_in_cart = cart_cart.cartproduct_set.filter(
                    product=product_obj)
                
               
                if this_product_in_cart.exists():
                    userCartProd = CartProduct.objects.get(
                        product=product_obj)
               
                    userCartProd.quantity += 1
              
                    userCartProd.subtotal += product_obj.price
                    userCartProd.save()
                    cart_cart.total += product_obj.price
                    cart_cart.save()
                else:
                    userCartProd_New = CartProduct.objects.create(
                        cart=cart_cart,
                        price=product_obj.price,
                        quantity=1,
                        subtotal=product_obj.price,
                    )
                    userCartProd_New.product.add(product_obj) 
                    cart_cart.total += product_obj.price
                    cart_cart.save()

            else:
         

                user_New_Cart = Cart.objects.create(user=request.user, total=0, complit=False)

                cart_product_new = CartProduct.objects.create(
                    cart=user_New_Cart,
                    product=product_obj, 
                    price=product_obj.price,
                    quantity=1,
                    subtotal=product_obj.price,
                )
                
                cart_product_new.save()
                print(cart_product_new)
                
                user_New_Cart.total += product_obj.price,
                user_New_Cart.save()
            response_mesage = {
                'error': False, 'message': "Product add to card successfully", "productid": product_id}

        except:
            response_mesage = {'error': True,
                               'message': "Product Not add!Somthing is Wromg"}

        return Response(response_mesage)


@method_decorator(ensure_csrf_cookie, name='dispatch')
class OrderViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [JSONParser]

    def list(self,request):
        order = Order.objects.get(user=request.user)

        serializer = OrderSerializer(order)

        return Response(serializer.data)




    def create(slef,request):
        print(request.data)
        user = request.user
        cart = Cart.objects.get(id = request.data['cart_id'])
        print(cart)
        order_obj = Order.objects.create(
            user=user,
            cart=cart,
            name= request.data['Name'],
            email = request.data['Email'],
            phone = request.data['Phone'],
            address= request.data['Address'],
        )
        cart.complit = True
        cart.save()
        order_obj.save()

        response_mesage = {'message': "Your order is received",}
        return Response(response_mesage)

 




class CommentViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [JSONParser]

    def create(Self,request):
        user =request.user
        product_id = request.data['id']
        product = Product.objects.get(id = product_id)
        user_comments = request.data['comment']
        comments = Comment.objects.create(user = user, product = product, comments=user_comments)
        comments.save()
        response_mesage = {'message': "Your comment is done",}
        return Response(response_mesage)

 

class Get_Comment_View(views.APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [JSONParser]

    def post(self,request):
        product =Product.objects.get(id = request.data['id'] )
        
        comment = Comment.objects.filter(product = product)
        serializer = CommentSerializer(comment,many=True)
        return Response(serializer.data)

        

class DelateComment(views.APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    def post(self,request):
        comments = Comment.objects.filter(id=request.data['id'])
        comments.delete()
        response_mesage = {
                'message': "Comment is deleted successfully", "commentid": request.data['id']}
        return Response(response_mesage)





@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(views.APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({'success': 'CSRF cookie set'})