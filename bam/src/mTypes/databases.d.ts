

type _database = 'RosaSinensis'
type _collection = 'ProductType' | 'Brand' | 'Product' | 'Customer' | 'Record' | 'Payment' | 'OTPs' | 'User'


interface complexPayment extends payment {
  customerId : string
};


import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
