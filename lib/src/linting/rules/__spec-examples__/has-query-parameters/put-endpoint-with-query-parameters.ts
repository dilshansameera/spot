import {
  api,
  body,
  endpoint,
  Float,
  queryParams,
  request,
  response,
  String
} from "@airtasker/spot";

@api({ name: "contract" })
class Contract {}

@endpoint({
  method: "PUT",
  path: "/users"
})
class PutEndpoint {
  @request
  request(
    @queryParams
    queryParams: {
      query: String | Float;
    },
    @body
    body: Body
  ) {}

  @response({ status: 200 })
  successResponse(@body body: Body) {}
}

interface Body {
  body: String;
}
