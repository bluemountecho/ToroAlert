using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Configuration;
using static ToroAdmin.ToroMarketPlace;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ToroAdmin.Models
{
    class ToroAdminDal
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;
        public ToroAdminDal(IConfiguration configuration)
        {
            this._configuration = configuration;
            this._connectionString = this._configuration.GetConnectionString("Default");
        }

        public void insertBackTestAlgorithms(string backTestAlgorithms)
        {
            try
            {               
                System.Data.SqlClient.SqlConnection con = new System.Data.SqlClient.SqlConnection(_connectionString);
                SqlCommand cmd = new SqlCommand("usp_AddNewAlgorithmsForBackTest", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@json", SqlDbType.NVarChar, int.MaxValue).Value = backTestAlgorithms;
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public string ReturnBackTestData()
        {
            try
            {
             
                System.Data.SqlClient.SqlConnection con = new System.Data.SqlClient.SqlConnection(_connectionString);
                SqlCommand cmd = new SqlCommand("usp_ReturnBackTestData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                //cmd.Parameters.Add("@id", SqlDbType.NVarChar, int.MaxValue).Value = id;
                con.Open();
                var jsonResult = new StringBuilder();
                var reader = cmd.ExecuteReader();
                if (!reader.HasRows)
                {
                    jsonResult.Append("[]");
                }
                else
                {
                    while (reader.Read())
                    {
                        jsonResult.Append(reader.GetValue(0).ToString());
                    }
                }
                var jobj = JArray.Parse(jsonResult.ToString());
                string c = jobj[0]["string"].ToString();
                return c;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
        public string ReturnPriceAlert()
        {
            try
            {
                
                System.Data.SqlClient.SqlConnection con = new System.Data.SqlClient.SqlConnection(_connectionString);
                SqlCommand cmd = new SqlCommand("usp_alerts", con);
                cmd.CommandType = CommandType.StoredProcedure;
                //cmd.Parameters.Add("@id", SqlDbType.NVarChar, int.MaxValue).Value = id;
                con.Open();
                var jsonResult = new StringBuilder();
                var reader = cmd.ExecuteReader();
                if (!reader.HasRows)
                {
                    jsonResult.Append("[]");
                }
                else
                {
                    while (reader.Read())
                    {
                        jsonResult.Append(reader.GetValue(0).ToString());
                    }
                }
                var jobj = JArray.Parse(jsonResult.ToString());
                string c = jobj[0]["alert"].ToString();

                return jobj[0]["alert"].ToString();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
    }
}
