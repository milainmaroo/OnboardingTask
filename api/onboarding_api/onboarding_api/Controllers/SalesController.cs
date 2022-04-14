using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Onboarding.Core;
using Onboarding.DB;
//using onboarding_api.Models;

/*
namespace onboarding_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class SalesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public SalesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        // API Method to GET Data from Product Table
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select SalesId, Product, Customer, Store, convert(varchar(10), DateSold, 120) as DateSold from dbo.Sales";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Onboarding");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);

        }

        // POST Method to insert new record
        [HttpPost]
        public JsonResult Post(Sales sale)
        {
            string query = @"insert into dbo.Sales (DateSold, Customer, Product, Store) 
                         values (@DateSold, @Customer, @Product, @Store)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Onboarding");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@DateSold", sale.DateSold);
                    myCommand.Parameters.AddWithValue("@Customer", sale.Customer != null ? sale.Customer : "");
                    myCommand.Parameters.AddWithValue("@Product", sale.Product != null ? sale.Product : "") ;
                    myCommand.Parameters.AddWithValue("@Store", sale.Store !=null ? sale.Store : "");
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }

        // PUT Method to update record
        [HttpPut]
        public JsonResult Put(Sales sale)
        {
            string query = @"update dbo.Sales 
                           set DateSold=@DateSold, Customer=@Customer, Product=@Product, Store=@Store
                           where SalesId=@SalesId";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Onboarding");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@SalesId", sale.SalesId);
                    myCommand.Parameters.AddWithValue("@DateSold", sale.DateSold);
                    myCommand.Parameters.AddWithValue("@Customer", sale.Customer != null ? sale.Customer : "");
                    myCommand.Parameters.AddWithValue("@Product", sale.Product != null ? sale.Product : ""); 
                    myCommand.Parameters.AddWithValue("@Store", sale.Store != null ? sale.Store : "") ;
                    
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Updated Successfully");
        }

        // DELETE Method
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"delete from dbo.Sales where SalesId=@SalesId";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Onboarding");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("SalesId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Deleted Successfully");
        }
    }
}
*/

namespace onboarding_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SalesController : ControllerBase
    {
        private IOnboardingServices _onboardingServices;
        public SalesController(IOnboardingServices onboardingServices)
        {
            _onboardingServices = onboardingServices;
        }

        [HttpGet]
        public IActionResult GetSales()
        {
            return Ok(_onboardingServices.GetSales());
        }

        [HttpPost]
        public IActionResult CreateSale(Sales sale)
        {
            var newSale = _onboardingServices.CreateSale(sale);
            return CreatedAtAction("GetSale", new { newSale.SalesId }, newSale);
        }

        [HttpDelete]
        public IActionResult DeleteSale(Sales sale)
        {
            _onboardingServices.DeleteSale(sale);
            return Ok();
        }

        [HttpPut]
        public IActionResult EditSale(Sales sale)
        {
            return Ok(_onboardingServices.EditSale(sale));
        }
    }
}


