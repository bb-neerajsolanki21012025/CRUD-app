# CRUD-app

f<div> for getting all products detail end point is http:://localhost:8080 method : 'GET'
response will be array of json strings like [{id: ,name: ,price: ,quantity: ,description: ,},{....},{....}] with statusCode 200 and statusMessage OK
in case of error it will be with statusCode 500 statusMessage database error</div>

for creating/putting product end point is http:://localhost:8080 method : 'POST'
response will be statusCode 200 and statusMessage OK
in case of error it will be with statusCode 500 statusMessage database error

for updating product end point is http:://localhost:8080 method : 'PUT'
response will be statusCode 200 and statusMessage OK
in case of error it will be with statusCode 500 statusMessage database error

for deleting product end point is http:://localhost:8080?id=....... method : 'DELETE'
response will be statusCode 200 and statusMessage OK
in case of error it will be with statusCode 500 statusMessage database error

for searching product end point is http:://localhost:8080/product?name=..... method:'GET'
response will be statusCode 200 and statusMessage OK
in case of error it will be with statusCode 500 statusMessage database error


