package com.inx.utility;

import java.sql.SQLException;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.ResultSetHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;

public class DbProvider {
	
	private static DataSource _datasource;
	
	public static DataSource getDataSource(String jdbcName) throws NamingException{
		if (_datasource == null){
            synchronized(DataSource.class){
                if(_datasource == null) {
            		Context context = new InitialContext();
            		context = (Context)context.lookup("java:/comp/env");
            		_datasource = (DataSource)context.lookup(jdbcName);
                }
            }
        }
        return _datasource;
	}
	
	public static QueryRunner  getRunner(DataSource dataSource)
	{
		QueryRunner run = new  QueryRunner(dataSource);
		return run;
	}
	
	public static <T> List<T> getEntities(Class<T> cls,String sqlString ,Object... params) throws SQLException, NamingException
	{
		ResultSetHandler<List<T>> h = new BeanListHandler<T>(cls);
		QueryRunner run= DbProvider.getRunner(DbProvider.getDataSource("jdbc/OOXX"));
		return run.query(sqlString, h ,params);
	}
	

}
