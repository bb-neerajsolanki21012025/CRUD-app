// import io.vertx.core.*;
package backend;

// import io.netty.handler.codec.http.HttpMethod;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.json.JsonObject;

import java.util.UUID;

import io.vertx.core.*;
import io.vertx.ext.jdbc.JDBCClient;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.CorsHandler;

public class App extends AbstractVerticle {

    private JDBCClient client;

    @Override
    public void start() {
        // ========  connection with database ======== //
            JsonObject config = new JsonObject()
            .put("url", "jdbc:mysql://localhost:3306/testdb")  // Database URL
            .put("driver_class", "com.mysql.cj.jdbc.Driver")          // MySQL driver
            .put("user", "test")                                      // Database username
            .put("password", "123")                                    // Database password
            .put("max_pool_size", 30);                                 // Max pool size (optional)

            // Create JDBC client
            client = JDBCClient.createShared(vertx, config);


        Router router = Router.router(vertx);

        router.route().handler(CorsHandler.create("*")  // Allow requests from any origin
        .allowedMethod(HttpMethod.GET)             // Allow specific HTTP methods
        .allowedMethod(HttpMethod.POST)
        .allowedMethod(HttpMethod.PUT)
        .allowedMethod(HttpMethod.DELETE)
        .allowedHeader("Access-Control-Allow-Headers")
        .allowedHeader("Content-Type")
        .allowedHeader("Authorization"));

        router.get("/").handler(this:: getDetails);
        router.post("/").handler(this::putDetails);
        router.delete("/").handler(this::dltDetails);
        router.put("/").handler(this::updDetails);
        

        router.get("/product").handler(this::getSearch);
        router.get("/*").handler(this::getOneElement);

        // Create an HTTP server
        vertx.createHttpServer()
            .requestHandler(router)
            .listen(8080,res->{
                if(res.succeeded()){
                    System.out.println("server started at http://localhost:8080");
                }else{
                    System.out.println(res);
                }
            });
    }

    private void getOneElement(RoutingContext context){
        HttpMethod method = context.request().method();
        System.out.println("HTTP method is "+ method);

        String path = context.request().path();
        System.out.println(path);
        path = path.replaceAll("/", "");


        String query = "Select * from products where id = " + '"' + path + '"';
        System.out.println(query);

        client.query(query, res->{
            if(res.succeeded()){
                context.response()
                .setStatusCode(200)
                .setStatusMessage("ok")
                .end(res.result().getRows().toString());
            }else{
                context.response()
                .setStatusCode(500)
                .end("Database Error");
            }
        });
    }

    private void getSearch(RoutingContext context){
        HttpMethod method = context.request().method();
        System.out.println("HTTP method is "+ method);

        String params = context.request().getParam("name");
        // System.out.println(params);
        params =  "%"+params+"%";

        String query = "Select * from products where name like " + '"' + params + '"';

        System.out.println(query);

        client.query(query, resp->{
            if(resp.succeeded()){
                context.response()
                .setStatusCode(200)
                .setStatusMessage("ok")
                .end(resp.result().getRows().toString());
            }else{
                context.response()
                .setStatusCode(500)
                .end("Database error");
            }
        });
    }


    
    private void updDetails(RoutingContext context){
        HttpMethod method = context.request().method();
        System.out.println("HTTP method is "+ method);
        

        context.request().bodyHandler(res->{
            String dtRcvd = res.toString();
            System.out.println(dtRcvd);

            JsonObject jsonObject = new JsonObject(dtRcvd);


            String query = "update products set name = "
                      + '"' + jsonObject.getString("name") + '"'
                      + "," + "quantity = " + jsonObject.getString("quantity")
                      + "," + "price = " + jsonObject.getString("price")
                      + "," + "description = " + '"' + jsonObject.getString("description") + '"'
                      + " where id = " + '"' + jsonObject.getString("id") + '"';
            
            // System.out.println(query);


            client.query(query, resp->{
                if(resp.succeeded()){
                    context.response()
                    .setStatusCode(200)
                    .setStatusMessage("ok")
                    .end("updation has been done");
                }else{
                    context.response()
                    .setStatusCode(500)
                    .end("Database error");
                }
            });
        });
    }

    private void getDetails(RoutingContext context){
        HttpMethod method = context.request().method();
        System.out.println("HTTP method is "+ method);
        String query = "Select * from products";

        // context.response().end("success");
        client.query(query, res->{
            if(res.succeeded()){
                context.response()
                .setStatusCode(200)
                .setStatusMessage("ok")
                .end(res.result().getRows().toString());
            }else{
                context.response().setStatusCode(500)
                .setStatusMessage("Database error")
                .end("data not found");
            }
        });
    }
    
    private void putDetails(RoutingContext context){
        HttpMethod method = context.request().method();
        System.out.println("HTTP method is "+method);

        context.request().bodyHandler(res->{
            String cntRcvd = res.toString();
            System.out.println(cntRcvd);
            
            JsonObject jsonObject = new JsonObject(cntRcvd);

            String uniqueId = UUID.randomUUID().toString();

            String query = "insert into products (id,name,quantity,price,description) values ("
                           + '"' + uniqueId + '"' 
                           + "," + '"'+ jsonObject.getString("name")+'"' 
                           +"," + jsonObject.getString("quantity")
                           +","+ jsonObject.getString("price") 
                           +"," + '"' + jsonObject.getString("description") +'"' +")";

            System.out.println(query);       
            // context.response().end("succeess");        

            client.query(query, resp->{
                if(resp.succeeded()){
                    context.response().setStatusCode(200).setStatusMessage("ok").end("successfully added");
                }else{
                    context.response().setStatusCode(500).end("Database error");
                }
            });
        });
    }
    
    private void dltDetails(RoutingContext context){
        HttpMethod method = context.request().method();
        System.out.println("HTTP method is "+ method);

        String params  = context.request().getParam("id");
        System.out.println(params);

        if(params == null){
            context.response().end("no parameter passed");
        }else{
            String query = "delete from products where id = " + '"' + params + '"' ;
            System.out.println(query);

            client.query(query,resp->{
                if(resp.succeeded()){
                    context.response()
                    .setStatusCode(200)
                    .setStatusMessage("ok")
                    .end("delete data with id = " + params);
                }else{
                    context.response()
                    .setStatusCode(500)
                    .end("Database error");
                }
            });
        }
    }

    public static void main(String[] args) {
        // Create a Vert.x instance and deploy the verticle
        Vertx vertx = Vertx.vertx();
        vertx.deployVerticle(new App());
    }
}
