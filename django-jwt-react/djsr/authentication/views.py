from django.shortcuts import render
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.forms.models import model_to_dict

from .serializers import CustomUserSerializer
from .models import CustomUser

import pickle
import numpy as np
import pandas as pd
from pandas.tseries.offsets import DateOffset
import requests
import json
from sklearn.preprocessing import MinMaxScaler
import os
from django.conf import settings

# Create your views here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        # Add extra responses here
        data['username'] = self.user.username
        data['bio'] = self.user.bio
        data['email'] = self.user.email
       	data['id'] = self.user.id
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                json['id'] = user.id
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReturnedUser(APIView):
    # permission_classes = (permissions.AllowAny,)

    def get(self, request):
        user = request.user
        return Response({
            "username" : user.username,
            "email" : user.email,
            "bio" : user.bio,
            "id" : user.id
            })

class BTCPredictions(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        filename = 'finalized_model.sav'
        with open(os.path.join(settings.BASE_DIR, filename), 'rb') as pickle_file:
            model = pickle.load(pickle_file)

        endpoint = 'https://min-api.cryptocompare.com/data/histohour'
        res = requests.get(endpoint + '?fsym=BTC&tsym=USD&limit=100')

        df = pd.DataFrame(json.loads(res.content)['Data'])
        df = df.set_index('time')
        df.index = pd.to_datetime(df.index, unit='s', utc=True)

        train = df
        scaler = MinMaxScaler()
        scaler.fit(train)
        train = scaler.transform(train)

        n_input = 5
        n_features = 6

        pred_list = []
        batch = train[-n_input:].reshape((1, n_input, n_features))

        for i in range(n_input):   
            pred_list.append(model.predict(batch)[0]) 
            batch = np.append(batch[:,1:,:],[[pred_list[i]]],axis=1)

        add_dates = [df.index[-1] + DateOffset(hours=x) for x in range(0,n_input + 1) ]
        future_dates = pd.DataFrame(index=add_dates[1:],columns=df.columns)

        pred_list = scaler.inverse_transform(pred_list)
        pred_list = np.array([np.array(pred_list[x].item(1)) for x in range(len(pred_list))])

        df_predict = pd.DataFrame(pred_list,
                          index=future_dates[-n_input:].index, columns=['Prediction'])

        prediction = df_predict.to_dict()
        finalDict = {}
        for k in list(prediction['Prediction'].keys()):
            finalDict[str(k)] = prediction['Prediction'][k]
        return Response({
                "Data" : finalDict
            })



