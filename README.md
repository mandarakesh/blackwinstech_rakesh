﻿# blackwinstech_rakesh


**GET /contacts:**
response:
[
  {
    "Name": "1234",
    "Phone_Number": "5000000000",
    "Address": "Address is required",
    "email": "email",
    "Created_At": "10/2/2025, 10:40:40 pm",
    "Contact_ID": "67aa33100f630a0f49dd0c99"
  }
]


**POST /contacts:**

request-body:
{
 "Name": "rani",
  "Phone_Number": "9876543210",
  "Address": "Bogada Boopathipur, medak, Telangana, 502113",
  "email": "rakesh@gmail.com"
}

response:
{
  "Contact_ID": "67aad779c3c2cbbee7e1535f",
  "Name": "rani",
  "Phone_Number": "9876543210",
  "Address": "Bogada Boopathipur, medak, Telangana, 502113",
  "email": "rakesh@gmail.com",
  "Created_At": "2/11/2025, 4:52:08 AM"
}



**PUT /contacts/:id :**
request:
{
  "Name": "ra",
  "Phone_Number": "9876543210",
  "Address": "Bogada Boopathipur, medak, Telangana, 502113",
  "email": "rakesh@gmail.com"
}

response:
{
  "Name": "ra",
  "Phone_Number": "9876543210",
  "Address": "Bogada Boopathipur, medak, Telangana, 502113",
  "email": "rakesh@gmail.com",
  "Contact_ID": "67aa3e31458445954fbdf19d",
  "Created_At": "10/2/2025, 11:28:09 pm"
}


**DELETE /contacts/:id :**

response:
Item Deleted Successfully


**GET /contacts/:id :**

response:
{
  "Name": "ra",
  "Phone_Number": "9876543210",
  "Address": "Bogada Boopathipur, medak, Telangana, 502113",
  "email": "rakesh@gmail.com",
  "Created_At": "10/2/2025, 11:28:09 pm",
  "Contact_ID": "67aa3e31458445954fbdf19d"
}


**GET /contacts?name="":**

request:
/contacts?name=rani

response:
[
  {
    "Name": "rani",
    "Phone_Number": "5000000000",
    "Address": "Address is required",
    "email": "email",
    "Created_At": "10/2/2025, 11:28:15 pm",
    "Contact_ID": "67aa3e37458445954fbdf19e"
  },
  {
    "Name": "rani",
    "Phone_Number": "5000000000",
    "Address": "Address is required",
    "email": "email",
    "Created_At": "2/11/2025, 4:52:08 AM",
    "Contact_ID": "67aad779c3c2cbbee7e1535f"
  }
]

