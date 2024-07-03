from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from users.models import User
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from django.contrib.auth import authenticate


class LoginView(APIView):


    def post(self, request):

        userN = 'administrador'
        contrasenia = '123'
        firtsName = 'Roberto Manuel'
        lastName = 'Perez Cruz'
        isActive = True
        refresh_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxOTAyNTc1MSwiaWF0IjoxNzE4OTM5MzUxLCJqdGkiOiIzOGEyZjBkYzc5ZTU0ODNhYWJkYzg5NDA5YzRhMmQ4OSIsInVzZXJfaWQiOjF9.HDhssQsdKm6nPVFd7q8whyDFGh3zZAyOYX4wsnBFgA8'
        access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4OTM5NjUxLCJpYXQiOjE3MTg5MzkzNTEsImp0aSI6IjQyMzk4YmU2NDExMzRjYzJhYmM5MGM3MWVjYzhiNmE4IiwidXNlcl9pZCI6MX0.sMQ6paNkg_mFQRgd9vUynTYkKetryHgnSyVtWeHtiVk'

        username = request.data.get('username')
        password = request.data.get('password')
        ldap = request.data.get('ldap')
        ldap = int(ldap)

        def local_authenticate(username,password):
            #user = authenticate(request, username=username, password=password)

            if username != userN or password != contrasenia:
                return Response({'error': 'Autenticación fallida'}, status=status.HTTP_200_OK)


            if userN is not None:

                #access_token = AccessToken.for_user(user)
                #refresh_token = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh_token),
                    'access': str(access_token),
                    'user': userN,
                    'firtsName': firtsName,
                    'lastName': lastName,
                    'is_Active': isActive,
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Autenticación fallida'}, status=status.HTTP_200_OK)


        if ldap == 1:

            def ldap_authenticate(username, password):
               pass

            if ldap_authenticate(username, password):
                pass
            else:
                return Response({'error': 'Autenticación LDAP fallida'}, status=status.HTTP_200_OK)

        else:
             return local_authenticate(username,password)