import { http } from "@/helper";

const responseParser = ({ data }) => {
  if (data) return data;
};

const client = http.main("rest/v2", responseParser);

export default {
  getAllCountries(data) {
    return client.http({
      method: "get",
      resource: "/all",
      data: data,
    });
  },
};
