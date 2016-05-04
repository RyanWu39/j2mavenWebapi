package com.inx.api;

import java.sql.SQLException;
import java.util.List;

import javax.naming.NamingException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.apache.commons.dbutils.QueryRunner;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import com.inx.api.entity.MyEntity;
import com.inx.api.entity.ParamEntity;
import com.inx.api.entity.Person;
import com.inx.utility.DbProvider;

@Path("/apidata")
public class ApiResource {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
    public Object sayHelloWorld(@QueryParam("empno")@DefaultValue("") String empno) throws JSONException, NamingException, SQLException {
		if("".equals(empno))
			empno="13099";
		List<Person> persons = DbProvider.getEntities(Person.class, 
				" SELECT EMP.PERNR , EMP.NACHN||EMP.VORNA empName FROM EMP01 EMP WHERE EMP.PERNR LIKE ?||'%'"
				,empno);
        return persons;
    }
	
	/*
	 test 123
	 * */
	  @GET
    @Path("/{name}")
    public String sayHello(@PathParam("name") String name , @QueryParam("oo") String email) {
        return "Hello, " + name+email;
    }
	

	@POST 
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/Postxx")
	public MyEntity Postxx(ParamEntity p)
	{
		return new MyEntity(p.name, 30);
	}
}
